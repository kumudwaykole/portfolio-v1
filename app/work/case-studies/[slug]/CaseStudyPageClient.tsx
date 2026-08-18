"use client";

import type { CaseStudyMetadata } from "@/app/work/types";
import { IconArrowNarrowUp } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared page gutter. The hero image deliberately sits outside of it. */
const SHELL = "mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-16";

export interface RelatedCaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
}

interface CaseStudyPageClientProps {
  metadata: CaseStudyMetadata;
  related: RelatedCaseStudy[];
  children: ReactNode;
}

/* ─── Hero ─────────────────────────────────────────────────────── */

function Hero({ metadata }: { metadata: CaseStudyMetadata }) {
  return (
    <header>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`${SHELL} pb-14 pt-28 sm:pb-20 sm:pt-36`}
      >
        <Link
          href="/work"
          className="group mb-12 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[.22em] text-zinc-500 transition-colors hover:text-white"
        >
          <IconArrowNarrowUp
            size={13}
            stroke={1.5}
            className="-rotate-90 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          All work
        </Link>

        <h1 className="text-[clamp(2.75rem,7.5vw,5.5rem)] font-medium leading-[.98] tracking-[-.045em] text-white">
          {metadata.title}
        </h1>

        {/* Description left, disciplines right — they meet on the baseline on
            wide screens and stack on narrow ones. */}
        <div className="mt-10 flex flex-col gap-8 sm:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p className="max-w-[46ch] text-[15px] leading-[1.65] text-zinc-400 sm:text-[17px]">
            {metadata.subtitle}
          </p>

          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {metadata.tags.map((tag) => (
              <li
                key={tag}
                className="border border-white/20 px-3 py-2 text-[10px] font-medium uppercase tracking-[.14em] text-zinc-300 sm:text-[11px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Full-bleed cover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="relative h-[46vh] min-h-[280px] w-full overflow-hidden bg-[#0f0f11] sm:h-[68vh] sm:min-h-[440px]"
      >
        <Image
          src={metadata.heroImage}
          alt={`${metadata.title} case study cover`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Project facts */}
      <dl
        className={`${SHELL} grid grid-cols-2 gap-x-6 gap-y-8 pt-12 sm:grid-cols-4 sm:pt-16`}
      >
        {metadata.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-[10px] font-medium uppercase tracking-[.2em] text-zinc-600">
              {stat.label}
            </dt>
            <dd className="mt-2.5 text-[14px] text-zinc-200 sm:text-[15px]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

/* ─── Client review ────────────────────────────────────────────── */

function Review({ review }: { review: CaseStudyMetadata["review"] }) {
  if (!review?.text) return null;

  return (
    <aside className="mt-24 border-t border-white/10 pt-12 sm:mt-32 sm:pt-16">
      <p className="max-w-4xl text-[clamp(1.25rem,3vw,2rem)] font-medium leading-[1.3] tracking-[-.03em] text-white">
        {review.text}
      </p>
      <p className="mt-8 text-[10px] font-medium uppercase tracking-[.2em] text-zinc-500">
        {review.name}
        {review.role ? ` — ${review.role}` : ""}
      </p>
    </aside>
  );
}

/* ─── See more projects ────────────────────────────────────────── */

function MoreProjects({ related }: { related: RelatedCaseStudy[] }) {
  if (related.length === 0) return null;

  return (
    <section className={`${SHELL} pb-24 pt-28 sm:pb-32 sm:pt-40`}>
      <div className="mb-12 flex flex-wrap items-center justify-between gap-6 sm:mb-16">
        <h2 className="text-[clamp(1.9rem,4.4vw,3.15rem)] font-medium leading-none tracking-[-.035em] text-white">
          See more projects
        </h2>

        <Link
          href="#top"
          className="group inline-flex items-center gap-2 border-b border-white/40 pb-1.5 text-[10px] font-medium uppercase tracking-[.2em] text-zinc-300 transition-colors hover:border-white hover:text-white"
        >
          Back to top
          <IconArrowNarrowUp
            size={14}
            stroke={1.5}
            className="transition-transform group-hover:-translate-y-1"
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {related.map((project) => (
          <Link
            key={project.slug}
            href={`/work/case-studies/${project.slug}`}
            className="group block"
          >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-[#0f0f11]">
              <Image
                src={project.coverImage}
                alt={`${project.title} case study cover`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h3 className="text-xl font-medium tracking-[-.03em] text-white sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-[42ch] text-[13.5px] leading-[1.6] text-zinc-500">
                  {project.subtitle}
                </p>
              </div>
              <IconArrowNarrowUp
                size={22}
                stroke={1.5}
                className="mt-1 shrink-0 rotate-45 text-zinc-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── Page shell ───────────────────────────────────────────────── */

export function CaseStudyPageClient({
  metadata,
  related,
  children,
}: CaseStudyPageClientProps) {
  return (
    <div id="top" className="bg-[#0d0d0f] text-white">
      <Hero metadata={metadata} />

      <div className={`${SHELL} pt-24 sm:pt-32`}>
        {metadata.draft ? (
          <p className="mb-16 flex items-center gap-3 border border-white/15 px-5 py-4 text-[10px] font-medium uppercase tracking-[.16em] text-zinc-400">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-purple-400" />
            This write-up is still in progress.
          </p>
        ) : null}

        {children}

        <Review review={metadata.review} />
      </div>

      <MoreProjects related={related} />
    </div>
  );
}
