import { Footer } from "@/app/components/footer";
import { WorkClient } from "@/app/work/WorkClient";
import { getProjectCards } from "@/content/case-studies";
import type { Metadata } from "next";

const title = "Selected Work";
const description =
  "Case studies and shipped product work by Kumud Waykole — platforms, storefronts and internal tools, built end to end.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    url: "/work",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function WorkPage() {
  return (
    <main>
      <WorkClient projects={getProjectCards()} />
      <Footer />
    </main>
  );
}
