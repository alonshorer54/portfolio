/**
 * Everything personal about the site lives here.
 *
 * Any value left as an empty string is treated as "not set" and the UI hides
 * the control that would have used it, so the site never renders a dead link.
 */

export interface SiteConfig {
  name: string;
  /**
   * The canonical address, no trailing slash. The sitemap and the Open Graph
   * tags need an absolute URL, and a relative one would silently resolve
   * against whichever `.vercel.app` alias the visitor happened to arrive on.
   */
  url: string;
  /** Shown under the name in the hero. */
  role: string;
  /** A sentence or two. This is the elevator pitch, not a biography. */
  intro: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  /**
   * Path to the CV inside `public/`. Drop the PDF at `public/cv/` using this
   * exact filename and the hero button starts working. Set to "" to hide it.
   */
  cvPath: string;
}

export const siteConfig: SiteConfig = {
  name: "Alon Shorer",
  url: "https://alon-shorer.vercel.app",
  role: "Software Engineering Student",
  intro:
    "Second-year student at Afeka Tel Aviv. Passionate about building things that work.",
  location: "Israel",
  email: "alonshorer54@gmail.com",
  github: "https://github.com/alonshorer54",
  linkedin: "https://www.linkedin.com/in/alon-shorer",
  cvPath: "/cv/alon-shorer-cv.pdf",
};

/** Anchor targets used by the header nav, kept in one place. */
export const navItems = [
  { href: "/#projects", label: "Projects" },
] as const;
