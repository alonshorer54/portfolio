import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectMedia } from "@/components/project-media";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projectsData";

/** How many stack badges fit on a card before the rest become a "+n" pill. */
const MAX_VISIBLE_TECH = 4;

/**
 * The whole card is one link to the project page.
 *
 * The demo and repo buttons live on that page rather than here: an anchor
 * cannot legally contain another anchor, and a card with three competing click
 * targets makes the visitor choose before they know what the project is.
 */
export function ProjectCard({ project }: { project: Project }) {
  const visibleTech = project.stack.slice(0, MAX_VISIBLE_TECH);
  const hiddenCount = project.stack.length - visibleTech.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group/project flex h-full flex-col gap-4 rounded-xl bg-card p-4 text-card-foreground ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5 hover:ring-foreground/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {/* The zoom lives on an inner wrapper so the rounded corners stay put. */}
      <div className="overflow-hidden rounded-lg">
        <ProjectMedia
          project={project}
          ratio={16 / 9}
          className="ring-0 transition-transform duration-500 group-hover/project:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <h3 className="font-heading text-lg leading-snug font-medium">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {project.context === "academic" ? "Academic" : "Personal"} · {project.year}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
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
          View project
          <ArrowRight className="size-4 transition-transform group-hover/project:translate-x-0.5" />
        </p>
      </div>
    </Link>
  );
}
