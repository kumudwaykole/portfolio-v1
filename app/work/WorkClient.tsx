"use client";

import { Strands } from "@/app/work/components/Strands";
import type { ProjectMeta } from "@/app/work/types";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A strand junction. The strands pinch together here, and the dot marks it. */
function StrandNode({ className }: { className?: string }) {
  return (
    <span
      data-strand-node
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 block size-1.5 -translate-x-1/2 rounded-full bg-purple-300 shadow-[0_0_12px_3px_rgb(168_85_247/.45)] ${className ?? ""}`}
    />
  );
}

/* ─── Reveal-on-scroll wrapper ─────────────────────────────────── */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px -18% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────── */
function Hero({ projectCount }: { projectCount: number }) {
  return (
    <section className="relative px-5 pb-10 pt-28 text-center sm:px-8 sm:pt-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <span className="mb-7 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[.32em] text-purple-300">
          <span className="size-1.5 rotate-45 bg-purple-400" /> The archive
        </span>

        <h1 className="text-[clamp(3rem,11vw,9rem)] font-black uppercase leading-[.82] tracking-[-.07em]">
          Selected <span className="text-outline">work</span>
          <sup className="ml-3 align-super text-[clamp(.65rem,1.6vw,1.1rem)] font-normal tracking-[.1em] text-purple-300/70">
            ({String(projectCount).padStart(2, "0")})
          </sup>
        </h1>

        <p className="mx-auto mt-7 max-w-md text-base leading-7 text-zinc-500">
          A curated showcase of platforms, storefronts and internal tools —
          written up end to end, from constraint to shipped product.
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Project ──────────────────────────────────────────────────── */
function ProjectRow({
  project,
  index,
}: {
  project: ProjectMeta;
  index: number;
}) {
  const href = `/work/case-studies/${project.slug}`;
  const right = index % 2 === 1;

  return (
    // The row box is transparent to the pointer so the strands behind it stay
    // hoverable; only the card itself takes events back.
    <div
      className={`pointer-events-none relative flex py-[9vh] sm:py-[12vh] ${right ? "justify-end" : "justify-start"}`}
    >
      <Reveal className="pointer-events-auto relative w-full lg:w-[54%]">
        <article className="group relative">
          <StrandNode className="-top-2.5" />

          <Link
            href={href}
            aria-label={`Explore project: ${project.title}`}
            className="block focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-purple-300"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-white/10 bg-black sm:aspect-16/11">
              <Image
                src={project.coverImage}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover saturate-[.85] transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:saturate-100"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-purple-300/40"
                aria-hidden="true"
              />
              {project.draft ? (
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[.18em] text-purple-200/80 backdrop-blur-sm">
                  <span className="inline-block size-1 animate-pulse rounded-full bg-purple-400" />
                  Writing
                </span>
              ) : null}
            </div>
          </Link>

          <div className="mt-7">
            <Link href={href} className="inline-block">
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-.035em] transition-colors duration-300 group-hover:text-purple-200">
                {project.title}
              </h2>
            </Link>

            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
              <p className="max-w-xs text-sm leading-6 text-zinc-500">
                {project.subtitle}
              </p>

              <Link
                href={href}
                className="group/cta flex w-full max-w-xs shrink-0 items-center justify-between gap-8 border-b border-white/25 pb-2.5 text-[11px] font-medium uppercase tracking-[.18em] text-zinc-300 transition-colors hover:border-purple-300 hover:text-purple-200 sm:w-auto"
              >
                Explore project
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1"
                >
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  );
}

/* ─── Closing CTA ──────────────────────────────────────────────── */
function ClosingCta() {
  return (
    <div className="pointer-events-none relative pb-24 pt-[10vh] text-center">
      <StrandNode className="top-0" />
      <Reveal className="pointer-events-auto">
        <p className="text-[10px] font-medium uppercase tracking-[.32em] text-purple-300">
          Next chapter
        </p>
        <h2 className="mt-6 text-[clamp(2.2rem,6.5vw,5rem)] font-black uppercase leading-[.86] tracking-[-.06em]">
          Have a project
          <br />
          <span className="text-outline">in mind?</span>
        </h2>
        <Link
          href="/#contact"
          className="group mt-9 inline-flex min-h-14 items-center gap-3 border border-purple-300/40 bg-purple-500/10 px-8 text-sm font-bold uppercase tracking-[.08em] text-purple-100 transition hover:bg-purple-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
        >
          Let&apos;s talk
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="size-5 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M5 12h13M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </Reveal>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export function WorkClient({ projects }: { projects: ProjectMeta[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden bg-[#08070a] text-white">
      <Hero projectCount={projects.length} />

      <div
        ref={trackRef}
        className="relative isolate mx-auto max-w-6xl px-5 sm:px-8 lg:px-12"
      >
        <Strands containerRef={trackRef} />

        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}

        <ClosingCta />
      </div>
    </div>
  );
}
