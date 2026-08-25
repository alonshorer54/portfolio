/**
 * Portfolio project data.
 *
 * Single source of truth for everything rendered on the site. Adding a project
 * means appending one entry here — no CMS, no database, no fetching.
 *
 * Media files live under `public/media/<slug>/` and are referenced by an
 * absolute path from the site root.
 */

export type MediaKind = "screenshot" | "video" | "icon" | "chart";

export interface ProjectMedia {
  /** Path from the site root, e.g. "/media/teams-fc/icon-512.png". */
  src: string;
  /** Alt text. Required — every image on the site must be described. */
  alt: string;
  kind: MediaKind;
  /** Intrinsic size, so next/image can reserve space and avoid layout shift. */
  width: number;
  height: number;
}

export interface ProjectLink {
  live?: string;
  repo?: string;
  /** A downloadable build, when the project ships one (e.g. an APK). */
  download?: string;
  /** Button text for the download. Say what the file is, not just "download". */
  downloadLabel?: string;
}

/**
 * A running copy of the app, embedded in an iframe on the project page.
 *
 * Only set this for a site you control and have checked: a host that sends
 * `X-Frame-Options` or a `frame-ancestors` CSP will render a blank box instead,
 * and the browser gives the page no way to detect that it happened.
 */
export interface ProjectEmbed {
  url: string;
  /** Described to screen readers, which cannot see into the frame. */
  title: string;
  /** Phone-shaped frame for a mobile-first app, laptop-shaped otherwise. */
  frame: "phone" | "browser";
}

export interface Project {
  /** URL-safe id, also the folder name under `public/media/`. */
  slug: string;
  title: string;
  /** One line, shown on the card. */
  tagline: string;
  /** A short paragraph, shown on the project page. */
  description: string;
  /** Concrete, verifiable points — prefer numbers over adjectives. */
  highlights: string[];
  /** Technologies, ordered from most to least defining. */
  stack: string[];
  /** Where the work came from — helps a reader calibrate scope. */
  context: "personal" | "academic";
  year: number;
  links: ProjectLink;
  media: ProjectMedia[];
  /** A live, interactive copy on the project page. Omit when there isn't one. */
  embed?: ProjectEmbed;
  /** Exactly one project is the flagship; it gets the hero slot. */
  isFeatured: boolean;
  /** Local source path this entry was extracted from. Not rendered. */
  sourcePath: string;
}

export const projects: Project[] = [
  {
    slug: "teams-fc",
    title: "Teams FC",
    tagline:
      "A weekly five-a-side app that splits whoever showed up into balanced teams and settles the argument.",
    description:
      "An installable, Hebrew right-to-left PWA for organising a recurring football game. It keeps a squad with ratings, friendships and preferences, then splits the players who turned up into two or three balanced teams, explains what any manual edit broke, and exports the result straight into a WhatsApp group as text or an image. History, attendance trends and weekly payments are tracked alongside.",
    highlights: [
      "Balancing is a variant of the partition problem, solved heuristically: greedy construction with random noise, then hill-climbing over every pair swap, repeated 60 times with the best result kept — reaching a 0.00 rating gap in well under a second.",
      "Five weighted criteria — rating, friendships, learned pair chemistry, prefers-with/without affinity, and tag spread — each normalised to 0..1, with the priority order set in the UI and each rank worth roughly 6x the one below it.",
      "Learned chemistry is derived rather than configured: pairs that win together more often than their individual records predict are treated as extra strength and deliberately spread apart.",
      "No backend of its own — static files talking to Supabase directly, with access enforced by Postgres row-level security instead of client-side checks.",
      "Cross-device sync in three parts: load on sign-in, debounced save 900 ms after the last change, and a realtime channel; saves carry a data fingerprint so the app ignores the echo of its own write.",
      "A single JSONB document per user, which is why tags, per-player preferences and the round format could all be added later without one schema migration.",
    ],
    stack: [
      "TypeScript",
      "React 19",
      "Tailwind CSS 4",
      "Vite",
      "Supabase (Postgres, RLS, Realtime)",
      "PWA / Service Worker",
      "Netlify",
    ],
    context: "personal",
    year: 2025,
    links: {
      live: "https://teams-fc.netlify.app",
      repo: "https://github.com/alonshorer54/teams-fc",
    },
    media: [
      {
        src: "/media/teams-fc/draw.png",
        alt: "Three balanced teams after a draw — each on 24.4 rating, with a 0.0 gap and 6 of 7 friendships kept together",
        kind: "screenshot",
        width: 2880,
        height: 1900,
      },
      {
        src: "/media/teams-fc/squad.png",
        alt: "The squad screen: 21 players with ratings, friendships, prefers-with/without notes and free-text tags",
        kind: "screenshot",
        width: 2880,
        height: 1900,
      },
      {
        src: "/media/teams-fc/trends.png",
        alt: "Attendance over eight weeks, players drifting away, and the pairs that beat their expected win rate together",
        kind: "screenshot",
        width: 2880,
        height: 1900,
      },
      {
        src: "/media/teams-fc/icon-512.png",
        alt: "The Teams FC app icon",
        kind: "icon",
        width: 512,
        height: 512,
      },
    ],
    // Checked: teams-fc.netlify.app sends no X-Frame-Options and no
    // frame-ancestors CSP, so it renders inside the frame.
    embed: {
      url: "https://teams-fc.netlify.app",
      title: "Teams FC running live",
      frame: "phone",
    },
    isFeatured: true,
    sourcePath: "D:/Projects/teams-fc",
  },
  {
    slug: "football-position-classifier",
    title: "Football Position Classifier",
    tagline:
      "A machine-learning pipeline that predicts a player's position group from their attribute ratings, at 89.0% test accuracy.",
    description:
      "A supervised learning project that classifies footballers into four position groups — attack, midfield, defence and goalkeeper — from their in-game attribute ratings, using multinomial logistic regression trained on the EA Sports FC 26 dataset. Built for the Introduction to Artificial Intelligence course at Afeka Tel Aviv Academic College of Engineering.",
    highlights: [
      "89.0% accuracy on a held-out test set, with goalkeepers separated almost perfectly and the residual error concentrated on the genuinely ambiguous attack/midfield boundary.",
      "A stratified 80/20 split preserves class proportions, because the four groups are heavily imbalanced.",
      "Scaling is fitted inside a scikit-learn Pipeline on the training fold only, which prevents test-set information leaking into training.",
      "Macro-averaged precision and recall are reported alongside accuracy, since raw accuracy alone would flatter the model on the majority classes.",
      "Split into four scripts run in order — exploration, training, evaluation, single-player prediction — with a fixed random_state making the whole run reproducible end to end.",
    ],
    stack: ["Python", "scikit-learn", "pandas", "NumPy", "Matplotlib", "joblib"],
    context: "academic",
    year: 2025,
    links: {
      repo: "https://github.com/alonshorer54/football-position-classifier",
    },
    media: [
      {
        src: "/media/football-position-classifier/confusion-matrix.png",
        alt: "Confusion matrix of the classifier on the held-out test set",
        kind: "chart",
        width: 1000,
        height: 800,
      },
      {
        src: "/media/football-position-classifier/class-distribution.png",
        alt: "Bar chart of how many players fall into each of the four position groups",
        kind: "chart",
        width: 1000,
        height: 800,
      },
    ],
    isFeatured: false,
    sourcePath: "D:/Projects/github-ready/football-position-classifier",
  },
  {
    slug: "college-management-system",
    title: "College Management System",
    tagline:
      "A Java domain model of a college's academic structure, refactored across three iterations around classic design patterns.",
    description:
      "A console application that models the organisational and academic structure of a college — lecturers, departments and committees — while enforcing real domain rules such as degree-based eligibility for committee chairmanship. Built as the capstone assignment for the Object-Oriented Design course at Afeka Tel Aviv Academic College of Engineering, and developed in three iterations, each refactoring the previous design.",
    highlights: [
      "Facade (CollegeFacade) collapses multi-step flows the UI used to orchestrate itself into one entry point per use case.",
      "Factory Method (LecturerFactory) removes the switch statement that coupled the UI to the whole Lecturer hierarchy, so a new degree type touches only the factory.",
      "Singleton (DataManager) makes persistence a single point of control, instead of several instances reading and writing the same file.",
      "An abstract Lecturer base specialised by RegularLecturer, Doctor and Professor, with the Publishable interface decoupling the right to publish from the class hierarchy.",
      "Refactored from List to HashSet with matching equals/hashCode on every entity, making duplicate entries structurally impossible.",
      "Swappable Comparator implementations let the caller choose the sort criterion at runtime rather than hard-coding it into the model.",
      "State is serialised to disk and saved from a shutdown hook, so data survives an unexpected exit.",
    ],
    stack: ["Java 17", "OOP design patterns", "Java Serialization", "Collections API"],
    context: "academic",
    year: 2025,
    links: {
      repo: "https://github.com/alonshorer54/college-management-system",
    },
    media: [],
    isFeatured: false,
    sourcePath: "D:/Projects/github-ready/college-management-system",
  },
];

/** The flagship project, for the hero section. */
export const featuredProject: Project | undefined = projects.find(
  (project) => project.isFeatured,
);

/** Everything else, newest first, for the project grid. */
export const otherProjects: Project[] = projects
  .filter((project) => !project.isFeatured)
  .sort((a, b) => b.year - a.year);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * The one piece of media that best represents a project, in the order a
 * recruiter would want to see it: a moving demo first, then a real screenshot,
 * then a result chart, and only as a last resort the app icon.
 */
const MEDIA_PRIORITY: MediaKind[] = ["video", "screenshot", "chart", "icon"];

export function getShowcaseMedia(project: Project): ProjectMedia | undefined {
  for (const kind of MEDIA_PRIORITY) {
    const match = project.media.find((item) => item.kind === kind);
    if (match) return match;
  }
  return project.media[0];
}
