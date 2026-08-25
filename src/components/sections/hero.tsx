import { ArrowDown, Download } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { externalLinkProps, LinkButton } from "@/components/link-button";
import { siteConfig } from "@/data/siteConfig";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      {/* A single soft wash behind the headline — enough to give the page a
          focal point without turning the hero into a graphic. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[28rem] bg-[radial-gradient(60%_60%_at_50%_50%,var(--color-foreground)_0%,transparent_70%)] opacity-[0.06]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-32 lg:py-36">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            {siteConfig.role}
          </p>

          <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Hi, I&rsquo;m {siteConfig.name}.
          </h1>

          {/* The pitch, not a caption — near-full foreground so it reads as
              body copy rather than something the page is de-emphasising. */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-foreground/90 sm:text-lg">
            {siteConfig.intro}
          </p>

          {/* Stacks to full-width buttons on a phone, where thumb targets
              matter more than a tidy row. */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <LinkButton href="/#featured" size="lg">
              <ArrowDown data-icon="inline-start" />
              See my work
            </LinkButton>

            {siteConfig.cvPath && (
              <LinkButton href={siteConfig.cvPath} download size="lg" variant="outline">
                <Download data-icon="inline-start" />
                Download CV
              </LinkButton>
            )}
          </div>

          {/* Spelled out rather than hidden behind icons: this is the only
              place on the site that carries contact details, so a visitor has
              to be able to read the address without clicking anything. */}
          <div className="mt-10 flex flex-col gap-x-8 gap-y-3 border-t border-border/60 pt-8 text-sm sm:flex-row sm:flex-wrap sm:items-center">
            {siteConfig.email && (
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-foreground underline-offset-4 transition-colors hover:text-foreground/70 hover:underline"
              >
                {siteConfig.email}
              </a>
            )}
            {siteConfig.github && (
              <a
                href={siteConfig.github}
                {...externalLinkProps}
                className="inline-flex items-center gap-2 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            )}
            {siteConfig.linkedin && (
              <a
                href={siteConfig.linkedin}
                {...externalLinkProps}
                className="inline-flex items-center gap-2 text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
