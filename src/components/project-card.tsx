import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectMedia } from "@/components/project-media";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projectsData";

/** How many stack badges fit on a card before the rest become a "+n" pill. */
const MAX_VISIBLE_TECH = 4;

/**
 * One project, one link.
 *
 * The card carries a picture, a title and a single line — enough to decide
 * whether to open it, and no more. Everything else (what it does, how it
 * works, the running app, the rest of the screens) lives on the project page,
 * which is the whole reason that page exists.
 *
 * `featured` makes the card span the grid and lay out side by side. It is a
 * size difference inside one gallery rather than a separate section, because
 * one big band above a row of small cards reads as two unrelated things.
 */
export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const visibleTech = project.stack.slice(0, featured ? 6 : MAX_VISIBLE_TECH);
  const hiddenCount = project.stack.length - visibleTech.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group/project flex h-full flex-col gap-4 rounded-xl bg-card p-4 text-card-foreground ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5 hover:ring-foreground/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        featured && "gap-6 sm:col-span-2 sm:flex-row sm:items-center sm:p-6",
      )}
    >
      {/* The zoom lives on an inner wrapper so the rounded corners stay put. */}
      <div className={cn("overflow-hidden rounded-lg", featured && "sm:w-3/5 sm:shrink-0")}>
        <ProjectMedia
          project={project}
          ratio={16 / 9}
          naturalRatio={featured}
          priority={featured}
          className="ring-0 transition-transform duration-500 group-hover/project:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h3
            className={cn(
              "font-heading text-lg leading-snug font-medium",
              featured && "text-2xl sm:text-3xl",
            )}
          >
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {project.context === "academic" ? "Academic" : "Personal"} · {project.year}
          </p>
        </div>

        <p
          className={cn(
            "text-sm leading-relaxed text-pretty text-foreground/80",
            featured && "text-base",
          )}
        >
          {project.tagline}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {visibleTech.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {hiddenCount > 0 && <Badge variant="ghost">+{hiddenCount}</Badge>}
        </div>

        <p className="flex items-center gap-1.5 pt-1 text-sm font-medium">
          {featured && project.embed ? "Open it and try it" : "View project"}
          <ArrowRight className="size-4 transition-transform group-hover/project:translate-x-0.5" />
        </p>
      </div>
    </Link>
  );
}
