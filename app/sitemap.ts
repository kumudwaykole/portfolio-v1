import { getProjectCards } from "@/content/case-studies";
import { SITE_LAST_MODIFIED, SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyEntries: MetadataRoute.Sitemap = getProjectCards()
    .filter((project) => !project.draft)
    .map((project) => ({
      url: `${SITE_URL}/work/case-studies/${project.slug}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...caseStudyEntries,
  ];
}
