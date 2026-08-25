/**
 * Everything personal about the site lives here.
 *
 * Any value left as an empty string is treated as "not set" and the UI hides
 * the control that would have used it, so the site never renders a dead link.
 */

export interface SiteConfig {
  name: string;
  /** Shown under the name in the hero. */
  role: string;
  /** Two or three sentences. This is the elevator pitch. */
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
  role: "Software Developer",
  intro:
    "Software engineering student at Afeka Tel Aviv, two years in. I build things that solve a problem I actually have — the team-balancing app below is what my football group uses every week. Everything here is running, not described.",
  location: "Israel",
  email: "alonshorer54@gmail.com",
  github: "https://github.com/alonshorer54",
  linkedin: "https://www.linkedin.com/in/alon-shorer-6b59a5253/",
  cvPath: "/cv/alon-shorer-cv.pdf",
};

/** Anchor targets used by the header nav, kept in one place. */
export const navItems = [
  { href: "/#featured", label: "Featured" },
  { href: "/#projects", label: "Projects" },
] as const;
