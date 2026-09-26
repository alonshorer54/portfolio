import Link from "next/link";

import { siteConfig } from "@/data/siteConfig";

/**
 * Just the name. No section links, GitHub button or theme toggle: the hero
 * carries every contact link and a "See my work" jump to the projects, and each
 * project page links back — repeating them here only gives the same
 * destination two entry points.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-6">
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          {siteConfig.name}
        </Link>
      </div>
    </header>
  );
}
