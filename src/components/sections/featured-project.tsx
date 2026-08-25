import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { externalLinkProps, LinkButton } from "@/components/link-button";
import { LiveEmbed } from "@/components/live-embed";
import { ProjectMedia } from "@/components/project-media";
import { SectionLabel } from "@/components/section-label";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projectsData";

/**
 * The flagship slot. Deliberately not a card: it is wider, taller and louder
 * than everything in the grid below, so a visitor who reads nothing else still
 * leaves knowing what this project is.
 *
 * When the project has a live embed, the app itself goes here rather than a
 * picture of it — there is no faster way to show that something works.
 */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <section id="featured" className="scroll-mt-16 border-b border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <SectionLabel>Featured project</SectionLabel>

        {/* One column on mobile and tablet, two from lg up. The visual comes
            first in the DOM so it is also what appears first when stacked. */}
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24">
            {project.embed ? (
              <LiveEmbed embed={project.embed} />
            ) : (
              <ProjectMedia
                project={project}
                ratio={16 / 10}
                priority
                className="shadow-xl shadow-foreground/5"
              />
            )}
          </div>

          <div className="flex flex-col items-start">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {project.title}
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
              {project.tagline}
            </p>

            {/* Three points, not six. The full list is on the project page. */}
            <ul className="mt-7 flex flex-col gap-3.5">
              {project.highlights.slice(0, 3).map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40"
                  />
                  <span className="text-pretty text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Link
                href={`/projects/${project.slug}`}
                className="group/cta inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                View project
                <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
              </Link>

              {project.links.live && (
                <LinkButton
                  href={project.links.live}
                  size="lg"
                  variant="outline"
                  {...externalLinkProps}
                >
                  Live demo
                  <ArrowUpRight data-icon="inline-end" />
                </LinkButton>
              )}
              {project.links.repo && (
                <LinkButton
                  href={project.links.repo}
                  size="lg"
                  variant="outline"
                  {...externalLinkProps}
                >
                  <GithubIcon data-icon="inline-start" />
                  Source code
                </LinkButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
