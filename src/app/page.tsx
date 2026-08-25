import { FeaturedProject } from "@/components/sections/featured-project";
import { Hero } from "@/components/sections/hero";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { featuredProject, otherProjects } from "@/data/projectsData";

export default function Home() {
  return (
    <>
      <Hero />
      {featuredProject && <FeaturedProject project={featuredProject} />}
      <ProjectsGrid projects={otherProjects} />
    </>
  );
}
