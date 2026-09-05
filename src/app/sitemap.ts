import type { MetadataRoute } from "next";

import { projects } from "@/data/projectsData";
import { siteConfig } from "@/data/siteConfig";

/** The home page plus one entry per project, generated at build time. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
