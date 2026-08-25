import { Hero } from "@/components/sections/hero";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { featuredProject, otherProjects } from "@/data/projectsData";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid featured={featuredProject} rest={otherProjects} />
    </>
  );
}
