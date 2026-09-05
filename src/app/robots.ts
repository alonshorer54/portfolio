import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/siteConfig";

/**
 * Without this the site has no `/robots.txt` at all, which is not fatal — a
 * missing file means "crawl everything" — but it is also where the sitemap is
 * advertised, and that is the only way a crawler learns the project pages
 * exist without following links.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
