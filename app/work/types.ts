import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";

export interface ProjectReview {
  initials: string;
  name: string;
  role: string;
  text: string;
}

export interface CaseStudyStat {
  label: string;
  value: string;
}

/** Shape of the `export const metadata` block at the top of every case study MDX file. */
export interface CaseStudyMetadata {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  client: string;
  year: string;
  role: string;
  tags: string[];
  heroImage: string;
  coverImage: string;
  stats: CaseStudyStat[];
  review: ProjectReview;
  /** When true, the full write-up isn't ready yet — show the "still writing" notice. */
  draft?: boolean;
}

export interface CaseStudyEntry {
  metadata: CaseStudyMetadata;
  Content: ComponentType<{
    components?: MDXComponents;
  }>;
}

export type ProjectMeta = CaseStudyMetadata;
