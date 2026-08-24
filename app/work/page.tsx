import { Footer } from "@/app/components/footer";
import { WorkClient } from "@/app/work/WorkClient";
import { getProjectCards } from "@/content/case-studies";
import type { Metadata } from "next";

const SITE_URL = "https://ikumud.com";

const title = "Selected Work — Full Stack Projects";
const description =
  "Real-world full stack case studies by Kumud Waykole — Next.js, React, Node.js and PostgreSQL platforms spanning ERP systems, service marketplaces and e-commerce checkouts, built end to end.";

// The `keywords` meta tag carries no ranking weight with Google or Bing —
// kept short and specific to this listing (rather than duplicating the
// broader skill list in the root layout) since it's still read by a handful
// of secondary engines and costs nothing.
const keywords = [
  "Full Stack Developer Projects",
  "React Developer Projects",
  "Next.js Developer Projects",
  "Real-World Next.js Projects",
  "Production Next.js Applications",
  "Scalable React Applications",
  "MERN Stack Projects",
  "Node.js Backend Projects",
  "TypeScript Full Stack Projects",
  "REST API Projects",
  "PostgreSQL Full Stack Applications",
  "Prisma ORM Projects",
  "Redis Caching",
  "Monorepo Architecture",
  "Turborepo Monorepo",
  "System Design",
  "Real-Time Applications",
  "Enterprise Web Applications",
  "ERP Software",
  "ERP System",
  "Admin Dashboard",
  "Service Marketplace",
  "Booking Platform",
  "Event Booking Platform",
  "E-commerce Web Applications",
  "Payment Gateway Integration",
  "Razorpay Integration",
  "Stripe Integration",
  "Full Stack Developer Case Studies",
  "Production-Ready Full Stack Projects",
];

export const metadata: Metadata = {
  title,
  description,
  keywords,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    url: "/work",
    title,
    description,
    images: [
      {
        url: "/images/open_graph.webp",
        width: 2048,
        height: 1143,
        alt: "Kumud Waykole — Selected Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/open_graph.webp"],
  },
};

export default function WorkPage() {
  const projects = getProjectCards();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${SITE_URL}/work`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/work/case-studies/${project.slug}`,
        name: project.title,
      })),
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <WorkClient projects={projects} />
      <Footer />
    </main>
  );
}
