import { Footer } from "@/app/components/footer";
import { caseStudyMDXComponents } from "@/app/work/case-studies/[slug]/caseStudyMdx";
import { CaseStudyPageClient } from "@/app/work/case-studies/[slug]/CaseStudyPageClient";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseStudies().map(({ metadata }) => ({
    slug: metadata.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {};
  }

  const { metadata } = caseStudy;
  const path = `/work/case-studies/${metadata.slug}`;
  const title = `${metadata.title} Case Study`;
  const image = metadata.coverImage || metadata.heroImage;

  return {
    title,
    description: metadata.description,
    alternates: {
      canonical: path,
    },
    keywords: [
      metadata.title,
      metadata.client,
      metadata.role,
      ...metadata.tags,
      "case study",
      "portfolio",
    ].filter(Boolean),
    openGraph: {
      type: "article",
      url: path,
      title,
      description: metadata.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${metadata.title} case study preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metadata.description,
      images: [image],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  // "See more projects" shows the two studies that follow this one, wrapping
  // back to the start of the list so the grid stays full.
  const all = getAllCaseStudies();
  const currentIndex = all.findIndex(
    (entry) => entry.metadata.slug === caseStudy.metadata.slug,
  );
  const related = all
    .slice(currentIndex + 1)
    .concat(all.slice(0, currentIndex))
    .slice(0, 2)
    .map(({ metadata }) => ({
      slug: metadata.slug,
      title: metadata.title,
      subtitle: metadata.subtitle,
      coverImage: metadata.coverImage || metadata.heroImage,
    }));

  const { Content } = caseStudy;

  return (
    <main>
      <CaseStudyPageClient metadata={caseStudy.metadata} related={related}>
        <Content components={caseStudyMDXComponents} />
      </CaseStudyPageClient>
      <Footer />
    </main>
  );
}
