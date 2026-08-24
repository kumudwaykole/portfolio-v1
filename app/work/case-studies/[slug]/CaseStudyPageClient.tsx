"use client";

import { BackToTop } from "@/app/components/footer/back-to-top";
import type { CaseStudyMetadata } from "@/app/work/types";
import { IconArrowNarrowUp, IconArrowUpRight } from "@tabler/icons-react";
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
          className="group mb-12 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.22em] text-zinc-500 transition-colors hover:text-white"
        >
          <IconArrowNarrowUp
            size={13}
            stroke={1.5}
            className="-rotate-90 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          All work
        </Link>

        <h1 className="text-[clamp(2.75rem,7.5vw,5.5rem)] font-bold leading-[.98] tracking-[-.045em] text-white">
          {metadata.title}
        </h1>

        {/* Description left, disciplines right — they meet on the baseline on
            wide screens and stack on narrow ones. */}
        <div className="mt-10 flex flex-col gap-8 sm:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p className="max-w-[46ch] font-normal text-[15px] leading-[1.65] text-zinc-400 sm:text-[17px]">
            {metadata.subtitle}
          </p>

          <ul className="flex flex-wrap gap-2 lg:justify-end">
            {metadata.tags.map((tag) => (
              <li
                key={tag}
                className="border border-white/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.14em] text-zinc-300 sm:text-[11px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {metadata.liveUrl ? (
          <a
            href={metadata.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex min-h-16 items-center gap-3 bg-purple-500 px-8 text-sm font-bold uppercase tracking-[.08em] text-white transition hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 sm:mt-14"
          >
            Visit website
            <IconArrowUpRight
              size={18}
              stroke={2}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </a>
        ) : null}
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
            <dt className="text-[10px] font-semibold uppercase tracking-[.2em] text-zinc-600">
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
      <p className="max-w-4xl text-[clamp(1.25rem,3vw,2rem)] font-normal leading-[1.3] tracking-[-.03em] text-white">
        {review.text}
      </p>
      <p className="mt-8 text-[10px] font-semibold uppercase tracking-[.2em] text-zinc-500">
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
        <h2 className="text-[clamp(1.9rem,4.4vw,3.15rem)] font-bold leading-none tracking-[-.035em] text-white">
          See more projects
        </h2>

        <BackToTop className="group inline-flex items-center gap-2 border-b border-white/40 pb-1.5 text-[10px] font-semibold uppercase tracking-[.2em] text-zinc-300 transition-colors hover:border-white hover:text-white">
          Back to top
          <IconArrowNarrowUp
            size={14}
            stroke={1.5}
            className="transition-transform group-hover:-translate-y-1"
            aria-hidden="true"
          />
        </BackToTop>
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
                <h3 className="text-xl font-bold tracking-[-.03em] text-white sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-[42ch] font-normal text-[13.5px] leading-[1.6] text-zinc-500">
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

/* ─── Floating visit-website bar ───────────────────────────────── */

function VisitWebsiteBar({ metadata }: { metadata: CaseStudyMetadata }) {
  if (!metadata.liveUrl) return null;

  const initials = metadata.title
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-black/80 p-2 pl-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
          {initials}
        </span> */}
        <span className="hidden max-w-40 truncate text-sm font-semibold text-zinc-200 sm:inline">
          {metadata.title}
        </span>
        <a
          href={metadata.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-purple-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
        >
          Visit website
          <IconArrowUpRight
            size={16}
            stroke={2.25}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Page shell ───────────────────────────────────────────────── */

export function CaseStudyPageClient({
  metadata,
  related,
  children,
}: CaseStudyPageClientProps) {
  return (
    <div
      id="top"
      className={`bg-[#0d0d0f] text-white ${metadata.liveUrl ? "pb-28" : ""}`}
    >
      <Hero metadata={metadata} />

      <div className={`${SHELL} pt-24 sm:pt-32`}>
        {metadata.draft ? (
          <p className="mb-16 flex items-center gap-3 border border-white/15 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.16em] text-zinc-400">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-purple-400" />
            This write-up is still in progress.
          </p>
        ) : null}

        {children}

        <Review review={metadata.review} />
      </div>

      <MoreProjects related={related} />

      <VisitWebsiteBar metadata={metadata} />
    </div>
  );
}
