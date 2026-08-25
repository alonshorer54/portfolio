"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";

import type { ProjectMedia } from "@/data/projectsData";

/**
 * Click a screenshot to read it.
 *
 * A 2880px-wide screenshot rendered into a 480px card is decoration; the point
 * of showing it is that someone can actually look at what the app does. This
 * puts the full-resolution file on top of the page at whatever size the viewer
 * has room for.
 *
 * `<dialog>` does the hard parts natively: it takes focus, traps it while open,
 * closes on Escape, and renders in the top layer so nothing can sit above it.
 */
export function Lightbox({
  media,
  children,
}: {
  media: ProjectMedia;
  children: React.ReactNode;
}) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        // `zoom-in` is the honest cursor: this is not a link.
        className="block w-full cursor-zoom-in rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        onClick={() => {
          setOpen(true);
          dialogRef.current?.showModal();
        }}
        aria-label={`Enlarge: ${media.alt}`}
      >
        {children}
      </button>

      <dialog
        ref={dialogRef}
        // `close` also fires for Escape, so this is the one place that has to
        // put the open flag back.
        onClose={() => setOpen(false)}
        // Clicking the backdrop hits the <dialog> itself, since the panel
        // inside it swallows its own clicks.
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="max-h-none max-w-none bg-transparent backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-8">
          <div
            className="relative max-h-full w-full max-w-6xl overflow-auto rounded-xl bg-card ring-1 ring-foreground/15"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Mounted only while open, and served unoptimized.

                An <img> inside a closed <dialog> has no layout, so the browser
                resolves srcset against a zero-width box, picks the smallest
                candidate, and never re-picks once the dialog opens — a 2560px
                screenshot was rendering from a 768px file, which is exactly the
                blur this viewer exists to fix. Enlarging is also the one place
                where the full file is the right answer, and these are 17-310 KB
                PNGs fetched only on click. */}
            {open && (
              <Image
                src={media.src}
                alt={media.alt}
                width={media.width}
                height={media.height}
                unoptimized
                className="h-auto w-full"
              />
            )}
          </div>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full bg-background/80 p-2 text-foreground ring-1 ring-foreground/15 backdrop-blur transition-colors hover:bg-background sm:top-8 sm:right-8"
          >
            <X className="size-5" />
          </button>
        </div>
      </dialog>
    </>
  );
}
