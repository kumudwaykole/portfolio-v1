import { getProjectCards } from "@/content/case-studies";
import type { MetadataRoute } from "next";

const SITE_URL = "https://ikumud.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyEntries: MetadataRoute.Sitemap = getProjectCards()
    .filter((project) => !project.draft)
    .map((project) => ({
      url: `${SITE_URL}/work/case-studies/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...caseStudyEntries,
  ];
}
