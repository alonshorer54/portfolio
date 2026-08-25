import Link from "next/link";

import { navItems, siteConfig } from "@/data/siteConfig";

/**
 * Name on the left, section links on the right. No GitHub button and no theme
 * toggle: the hero already carries every contact link, and repeating them in
 * the header just gives the same destination two entry points.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          {siteConfig.name}
        </Link>

        {/* The anchor nav is noise on a phone, where the whole page is one scroll. */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
