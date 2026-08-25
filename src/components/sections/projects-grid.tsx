import { ProjectCard } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";
import type { Project } from "@/data/projectsData";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="scroll-mt-16 border-b border-border/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <SectionLabel>More projects</SectionLabel>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          A machine-learning pipeline and an object-oriented design exercise. Open
          either one for the results, the screens, and how it was put together.
        </p>

        {/* One column on a phone, two on a tablet, three on a laptop. */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
