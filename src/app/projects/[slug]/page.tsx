import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { externalLinkProps, LinkButton } from "@/components/link-button";
import { Lightbox } from "@/components/lightbox";
import { MediaGallery } from "@/components/media-gallery";
import { ProjectMedia } from "@/components/project-media";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug, getShowcaseMedia, projects } from "@/data/projectsData";

/** Every project page is known at build time, so all of them ship as static HTML. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Alon Shorer`,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const hasGalleryMedia = project.media.some((item) => item.kind !== "icon");
  const lead = getShowcaseMedia(project);
  const leadIsImage = Boolean(lead && lead.kind !== "icon" && lead.kind !== "video");

  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-24">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All projects
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase">
          <span>{project.context === "academic" ? "Academic" : "Personal"}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {project.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-pretty text-foreground/90">
          {project.tagline}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {project.links.live && (
            <LinkButton href={project.links.live} size="lg" {...externalLinkProps}>
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
          {project.links.download && (
            <LinkButton href={project.links.download} size="lg" variant="outline" download>
              <Download data-icon="inline-start" />
              {project.links.downloadLabel ?? "Download"}
            </LinkButton>
          )}
        </div>
      </header>

      {/* The lead image, at the picture's own proportions. Everything else is
          in the gallery further down. */}
      <div className="mt-12">
        {leadIsImage && lead ? (
          <Lightbox media={lead}>
            <ProjectMedia project={project} naturalRatio priority />
          </Lightbox>
        ) : (
          <ProjectMedia project={project} naturalRatio priority />
        )}
      </div>

      <Separator className="my-14" />

      <section>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          What it is
        </h2>
        <p className="mt-4 text-base leading-relaxed text-pretty text-foreground/85">
          {project.description}
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          How it works
        </h2>
        <ul className="mt-6 flex flex-col gap-4">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3.5 text-base leading-relaxed">
              <span
                aria-hidden
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground/40"
              />
              <span className="text-pretty text-foreground/85">{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Skipped when the only media is the fallback icon. */}
      {hasGalleryMedia && (
        <div className="mt-14">
          <MediaGallery media={project.media} />
        </div>
      )}

      <section className="mt-14">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Built with</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

    </article>
  );
}
