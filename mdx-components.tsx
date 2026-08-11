import type { MDXComponents } from "mdx/types";

// Global MDX component overrides. Case studies pass their own component map
// locally (see app/work/case-studies/[slug]/caseStudyMdx.tsx), so this stays
// empty — but the file itself is required by @next/mdx in the App Router.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
