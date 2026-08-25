alon-shorer-cv.pdf is what the "Download CV" buttons link to.

The filename must match `cvPath` in src/data/siteConfig.ts. To hide the
buttons instead, set `cvPath` to an empty string.

To change the portfolio URL printed on the CV's contact line, run:

    python scripts/add-site-to-cv.py your-site.example

That rewrites the whole contact line from the list at the top of the
script, so it is safe to run repeatedly.
