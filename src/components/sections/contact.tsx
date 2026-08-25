import { Download, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { externalLinkProps, LinkButton } from "@/components/link-button";
import { siteConfig } from "@/data/siteConfig";

/**
 * A mailto link rather than a form. A form needs a backend, a spam guard and a
 * delivery service to do the same job an email client already does.
 *
 * The CV sits here too: most visitors arrive from a CV or a LinkedIn profile,
 * and the ones who arrive the other way round should be able to pick it up.
 */
export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-3xl px-6 py-24 text-center sm:py-32">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Let&rsquo;s talk
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
          I&rsquo;m looking for a junior software developer role. If something here
          caught your eye, or you just want to argue about team-balancing heuristics,
          my inbox is open.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          {siteConfig.email && (
            <LinkButton href={`mailto:${siteConfig.email}`} size="lg">
              <Mail data-icon="inline-start" />
              {siteConfig.email}
            </LinkButton>
          )}

          {siteConfig.cvPath && (
            <LinkButton href={siteConfig.cvPath} download size="lg" variant="outline">
              <Download data-icon="inline-start" />
              Download CV
            </LinkButton>
          )}

          <div className="flex items-center gap-2">
            {siteConfig.github && (
              <LinkButton
                href={siteConfig.github}
                size="icon-lg"
                variant="outline"
                aria-label="GitHub"
                {...externalLinkProps}
              >
                <GithubIcon />
              </LinkButton>
            )}
            {siteConfig.linkedin && (
              <LinkButton
                href={siteConfig.linkedin}
                size="icon-lg"
                variant="outline"
                aria-label="LinkedIn"
                {...externalLinkProps}
              >
                <LinkedinIcon />
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
