declare module "*.mdx" {
  import type { CaseStudyMetadata } from "@/app/work/types";
  import type { MDXComponents } from "mdx/types";
  import type { ComponentType } from "react";

  const MDXContent: ComponentType<{
    components?: MDXComponents;
  }>;

  export const metadata: CaseStudyMetadata;
  export default MDXContent;
}
