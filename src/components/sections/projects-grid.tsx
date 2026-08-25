import { ProjectCard } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";
import type { Project } from "@/data/projectsData";

/**
 * Every project in one gallery.
 *
 * The flagship used to sit in its own band above this, repeating the tagline,
 * the highlights, the stack and the live app that the project page already
 * showed — so "View project" led somewhere with nothing new. Now it is simply
 * the first and largest card here, and everything it used to spell out waits
 * behind the click.
 */
export function ProjectsGrid({
  featured,
  rest,
}: {
  featured?: Project;
  rest: Project[];
}) {
  return (
    <section id="projects" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <SectionLabel>Projects</SectionLabel>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {featured && <ProjectCard project={featured} featured />}
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
