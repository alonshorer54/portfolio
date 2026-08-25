import Link from "next/link";

import { GithubIcon } from "@/components/icons";
import { externalLinkProps, LinkButton } from "@/components/link-button";
import { ModeToggle } from "@/components/mode-toggle";
import { navItems, siteConfig } from "@/data/siteConfig";

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
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <LinkButton key={item.href} href={item.href} variant="ghost" size="sm">
              {item.label}
            </LinkButton>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {siteConfig.github && (
            <LinkButton
              href={siteConfig.github}
              variant="ghost"
              size="icon"
              aria-label="GitHub profile"
              {...externalLinkProps}
            >
              <GithubIcon />
            </LinkButton>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
