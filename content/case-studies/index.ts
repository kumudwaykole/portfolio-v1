import type { CaseStudyEntry, CaseStudyMetadata } from "@/app/work/types";
import BmsPlatform, {
  metadata as bmsPlatformMetadata,
} from "@/content/case-studies/bms-platform.mdx";
import Erp, { metadata as erpMetadata } from "@/content/case-studies/erp.mdx";
import Vos, { metadata as vosMetadata } from "@/content/case-studies/vos.mdx";

const caseStudies: CaseStudyEntry[] = [
  { metadata: bmsPlatformMetadata, Content: BmsPlatform },
  { metadata: erpMetadata, Content: Erp },
  { metadata: vosMetadata, Content: Vos },
].sort((left, right) => left.metadata.order - right.metadata.order);

export function getAllCaseStudies(): CaseStudyEntry[] {
  return caseStudies;
}

export function getProjectCards(): CaseStudyMetadata[] {
  return caseStudies.map((study) => study.metadata);
}

export function getCaseStudyBySlug(slug: string): CaseStudyEntry | undefined {
  return caseStudies.find((study) => study.metadata.slug === slug);
}
