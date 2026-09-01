"""Put the portfolio URL into the CV's contact line.

    python scripts/add-site-to-cv.py alon-shorer.vercel.app

The contact line is rebuilt from the ITEMS list below rather than appended to,
so running this twice produces the same file as running it once. Change a phone
number or a handle here and re-run; the line redraws.

The five items do not fit on one line at the original 9.5pt, so the font is
stepped down until they do — 9.5 to 8.0, whichever fits first. On a contact
line that difference is invisible; a second line would push every heading below
it out of place.

Writes a PNG next to the PDF so the result can be eyeballed before it ships.
"""

import re
import sys
from pathlib import Path

import fitz  # PyMuPDF

CV = Path("public/cv/alon-shorer-cv.pdf")
FONT_FILE = r"C:\Windows\Fonts\calibri.ttf"
PREVIEW = Path("scripts/cv-preview.png")

# The anchor: the line containing this text is the one that gets replaced.
ANCHOR = "alonshorer54@gmail.com"

SEPARATOR = "   |   "
LEFT_MARGIN = 50.4
RIGHT_MARGIN = 50.4
SIZES = (9.5, 9.0, 8.5, 8.0)
# 0x1a1a1a — the soft near-black the rest of the CV uses, not pure black.
TEXT_COLOR = (26 / 255, 26 / 255, 26 / 255)


def build_items(site_url: str, site_label: str):
    """(visible text, link target or None) for every item on the contact line."""
    return [
        ("050-739-4402", None),
        ("alonshorer54@gmail.com", "mailto:alonshorer54@gmail.com"),
        ("github.com/alonshorer54", "https://github.com/alonshorer54"),
        (
            "linkedin.com/in/alon-shorer",
            "https://www.linkedin.com/in/alon-shorer",
        ),
        (site_label, site_url),
    ]


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2

    raw = sys.argv[1].strip()
    site_url = raw if raw.startswith("http") else f"https://{raw}"
    # The CV shows bare domains, not schemes, so strip it back off for display.
    site_label = site_url.removeprefix("https://").removeprefix("http://").rstrip("/")

    if not CV.exists():
        print(f"error: {CV} not found")
        return 1

    doc = fitz.open(CV)
    page = doc[0]

    hits = page.search_for(ANCHOR)
    if not hits:
        print(f"error: could not find {ANCHOR!r} — is this the right CV?")
        return 1

    # The whole contact line, not just the anchor: take the line's own bbox.
    line_rect = None
    for block in page.get_text("dict")["blocks"]:
        if block["type"] != 0:
            continue
        for line in block["lines"]:
            if ANCHOR in "".join(span["text"] for span in line["spans"]):
                line_rect = fitz.Rect(line["bbox"])
                break
    if line_rect is None:
        print("error: found the text but not its line box")
        return 1

    items = build_items(site_url, site_label)
    text = SEPARATOR.join(label for label, _ in items)

    font = fitz.Font(fontfile=FONT_FILE)
    usable = page.rect.width - LEFT_MARGIN - RIGHT_MARGIN
    size = next((s for s in SIZES if font.text_length(text, s) <= usable), None)
    if size is None:
        print(f"error: {text!r} does not fit even at {SIZES[-1]}pt")
        return 1

    width = font.text_length(text, size)
    start_x = (page.rect.width - width) / 2
    baseline_y = line_rect.y1 - 2.2  # the original line sat this far above its box

    # Redaction is what actually deletes the old glyphs from the content stream;
    # drawing a white box over them would leave the text selectable underneath.
    page.add_redact_annot(line_rect + (-2, -2, 2, 2))
    page.apply_redactions()

    # Old link annotations for this line die with it — they are re-added below.
    for link in page.get_links():
        if fitz.Rect(link["from"]).intersects(line_rect + (-2, -2, 2, 2)):
            page.delete_link(link)

    page.insert_text(
        (start_x, baseline_y),
        text,
        fontsize=size,
        fontname="calibri",
        fontfile=FONT_FILE,
        color=TEXT_COLOR,
    )

    # Re-hang a clickable rectangle over each item that has a target.
    x = start_x
    for label, target in items:
        label_width = font.text_length(label, size)
        if target:
            rect = fitz.Rect(x, line_rect.y0, x + label_width, line_rect.y1)
            page.insert_link({"kind": fitz.LINK_URI, "from": rect, "uri": target})
        x += label_width + font.text_length(SEPARATOR, size)

    # PyMuPDF refuses a non-incremental save over the file it has open, so the
    # rewrite lands beside it and is moved into place once it succeeded.
    tmp = CV.with_suffix(".pdf.tmp")
    doc.save(tmp, deflate=True, garbage=3)
    doc.close()

    fix_text_layer(tmp, text, font)
    shrink(tmp)

    extracted = read_contact_line(tmp)
    if extracted != text:
        tmp.unlink(missing_ok=True)
        print("error: the text layer does not match what was drawn — not saving.")
        print(f"  drew:      {text!r}")
        print(f"  extracted: {extracted!r}")
        return 1

    tmp.replace(CV)

    # A picture of the result, so this is checkable rather than hopeful.
    with fitz.open(CV) as check:
        check[0].get_pixmap(dpi=140).save(PREVIEW)

    print(f"contact line rebuilt at {size}pt ({width:.1f}pt wide, fits {usable:.1f}pt)")
    print(f"site link: {site_label} -> {site_url}")
    print(f"text layer verified clean: {text!r}")
    print(f"preview:   {PREVIEW}")
    return 0


CMAP_TEMPLATE = """/CIDInit /ProcSet findresource begin
12 dict begin
begincmap
/CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def
/CMapName /Adobe-Identity-UCS def
/CMapType 2 def
1 begincodespacerange
<0000> <FFFF>
endcodespacerange
{count} beginbfchar
{entries}
endbfchar
endcmap
CMapName currentdict /CMap defineresource pop
end
end
"""


def fix_text_layer(path: Path, text: str, font: "fitz.Font") -> None:
    """Rebuild the new font's ToUnicode map so the text extracts as it was typed.

    Calibri maps space and U+00A0 onto one glyph, and hyphen-minus and U+2010
    onto another. Reversing that is ambiguous and PyMuPDF picks the exotic
    option both times, so the line looks right but extracts as "050‐739‐4402"
    with non-breaking spaces — invisible on screen, very visible to whatever
    parses the CV.

    The generated map covers the whole font, which makes a targeted edit fiddly
    (a glyph can sit inside a bfrange rather than being its own bfchar). Since
    this font is embedded solely for this one line, the map is simply replaced
    with the exact characters that line uses.
    """
    doc = fitz.open(path)
    page = doc[0]

    # Our font is the one just embedded whole; every font already in the file is
    # a subset, which PDF marks with an "ABCDEF+" name prefix.
    fonts = [f for f in page.get_fonts() if "+" not in f[3]]

    for xref, *_ in fonts:
        tounicode = doc.xref_get_key(xref, "ToUnicode")
        if tounicode[0] != "xref":
            continue

        pairs = []
        for char in sorted(set(text)):
            # has_glyph returns the glyph id, or 0 when the font lacks the char.
            gid = font.has_glyph(ord(char))
            if gid:
                pairs.append(f"<{gid:04x}> <{ord(char):04x}>")

        cmap = CMAP_TEMPLATE.format(count=len(pairs), entries="\n".join(pairs))
        doc.update_stream(int(tounicode[1].split()[0]), cmap.encode("latin-1"))

    doc.saveIncr()
    doc.close()


def shrink(path: Path) -> None:
    """Subset the embedded font down to the glyphs actually used.

    PyMuPDF embeds the whole of Calibri, which turns a 200 KB CV into a 1 MB
    one. A CV gets emailed; that matters.
    """
    doc = fitz.open(path)
    doc.subset_fonts(verbose=False)
    # An incremental save would only append, leaving the full font in the file.
    # A full rewrite with garbage collection is what actually drops it.
    rewritten = path.with_suffix(".pdf.small")
    doc.save(rewritten, deflate=True, garbage=4, clean=True)
    doc.close()
    rewritten.replace(path)


def read_contact_line(path: Path) -> str:
    """Pull the contact line straight back out of the PDF, the way a parser would."""
    with fitz.open(path) as doc:
        for block in doc[0].get_text("dict")["blocks"]:
            if block["type"] != 0:
                continue
            for line in block["lines"]:
                joined = "".join(span["text"] for span in line["spans"])
                if ANCHOR in joined:
                    return joined
    return ""


if __name__ == "__main__":
    raise SystemExit(main())
