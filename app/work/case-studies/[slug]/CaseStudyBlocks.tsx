"use client";

import { RevealBlock } from "@/app/work/case-studies/[slug]/RevealBlock";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * Editorial layout primitives for case study bodies.
 *
 * These are the pieces MDX files compose with. They live in their own client
 * module so `caseStudyMdx.tsx` can stay a server module (see the note there) —
 * named component exports cross the boundary fine, an exported object does not.
 */

/* ─── Section ──────────────────────────────────────────────────── */

type SectionLayout = "stacked" | "split" | "right";

const SECTION_BODY: Record<SectionLayout, string> = {
  // Heading sits above; copy runs in a narrow measure underneath it.
  stacked: "max-w-[54ch]",
  // Heading holds the left rail, copy takes the right two-thirds.
  split: "md:col-span-7 md:col-start-6 max-w-[62ch]",
  // No heading rail — copy is pushed into the right column on its own.
  right: "md:col-span-7 md:col-start-6 max-w-[62ch]",
};

export function Section({
  heading,
  layout = "stacked",
  children,
}: {
  heading?: string;
  layout?: SectionLayout;
  children: ReactNode;
}) {
  const isGrid = layout !== "stacked";

  return (
    <section
      className={`mt-24 first:mt-0 sm:mt-32 ${
        isGrid ? "md:grid md:grid-cols-12 md:gap-x-8" : ""
      }`}
    >
      {/* The column span has to sit on the outermost element — RevealBlock's
          own wrapper is what becomes the grid item, not the heading inside it. */}
      {heading ? (
        <div className={isGrid ? "md:col-span-4" : ""}>
          <RevealBlock>
            <h2
              className={`mb-7 text-[clamp(1.9rem,4.4vw,3.15rem)] font-medium leading-[1.05] tracking-[-.035em] text-white ${
                isGrid ? "md:mb-0" : ""
              }`}
            >
              {heading}
            </h2>
          </RevealBlock>
        </div>
      ) : null}

      <div className={SECTION_BODY[layout]}>{children}</div>
    </section>
  );
}

/* ─── Body copy ────────────────────────────────────────────────── */

export function Prose({ children }: { children: ReactNode }) {
  return (
    <RevealBlock>
      <p className="mb-6 text-[15px] leading-[1.7] text-zinc-400 last:mb-0 sm:text-[16.5px]">
        {children}
      </p>
    </RevealBlock>
  );
}

/* ─── Gallery ──────────────────────────────────────────────────── */

type GalleryLayout = "full" | "duo" | "trio" | "offset" | "offsetReverse";

/**
 * Every layout collapses to a single stacked column below `md` — the offsets
 * and column spans only switch on once there is room for them.
 */
const GALLERY_LAYOUT: Record<GalleryLayout, string> = {
  full: "grid-cols-1",

  duo: "grid-cols-1 md:grid-cols-2",

  trio: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",

  // Large plate on the left, smaller one dropped down the right-hand column.
  offset: [
    "grid-cols-1 md:grid-cols-12",
    "[&>*:nth-child(1)]:md:col-span-7",
    "[&>*:nth-child(2)]:md:col-span-5 [&>*:nth-child(2)]:md:col-start-8 [&>*:nth-child(2)]:md:mt-28",
  ].join(" "),

  // Mirror image of `offset` — small plate left and low, large plate right.
  offsetReverse: [
    "grid-cols-1 md:grid-cols-12",
    "[&>*:nth-child(1)]:md:col-span-5 [&>*:nth-child(1)]:md:mt-28",
    "[&>*:nth-child(2)]:md:col-span-7 [&>*:nth-child(2)]:md:col-start-6",
  ].join(" "),
};

export function Gallery({
  layout = "duo",
  children,
}: {
  layout?: GalleryLayout;
  children: ReactNode;
}) {
  return (
    <div
      className={`mt-12 grid gap-4 sm:mt-16 sm:gap-6 ${GALLERY_LAYOUT[layout]}`}
    >
      {children}
    </div>
  );
}

/* ─── Shot ─────────────────────────────────────────────────────── */

interface ShotProps {
  src: string;
  alt?: string;
  caption?: string;
  /** CSS aspect ratio for the crop box, e.g. "16/9". Ignored when sized. */
  ratio?: string;
  /** Pass both to render the image at its intrinsic ratio instead of cropping. */
  width?: number;
  height?: number;
  /** `contain` keeps whole screenshots visible; `cover` fills and crops. */
  fit?: "cover" | "contain";
  priority?: boolean;
}

/**
 * A single image plate. Screenshots dropped into `/public/images` are addressed
 * as `/images/<file>`. Without `width`/`height` the image fills a ratio box, so
 * new screenshots can be swapped in without looking up their pixel dimensions.
 */
export function Shot({
  src,
  alt = "",
  caption,
  ratio = "4/3",
  width,
  height,
  fit = "cover",
  priority = false,
}: ShotProps) {
  const sized = typeof width === "number" && typeof height === "number";
  const sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px";

  return (
    <RevealBlock>
      <figure className="m-0">
        <div
          className="relative w-full overflow-hidden bg-[#0f0f11]"
          style={sized ? undefined : ({ aspectRatio: ratio } as CSSProperties)}
        >
          {sized ? (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              priority={priority}
              className="h-auto w-full"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className={fit === "contain" ? "object-contain" : "object-cover"}
            />
          )}
        </div>

        {caption ? (
          <figcaption className="mt-3 text-[10px] font-medium uppercase tracking-[.16em] text-zinc-600">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </RevealBlock>
  );
}

/* ─── Pull quote ───────────────────────────────────────────────── */

export function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <RevealBlock>
      <figure className="mx-auto my-24 max-w-4xl text-center sm:my-32">
        <blockquote className="text-[clamp(1.35rem,3.2vw,2.25rem)] font-medium leading-[1.25] tracking-[-.03em] text-white [&_p]:m-0">
          {children}
        </blockquote>
        {attribution ? (
          <figcaption className="mt-7 text-[10px] font-medium uppercase tracking-[.22em] text-zinc-500">
            {attribution}
          </figcaption>
        ) : null}
      </figure>
    </RevealBlock>
  );
}

/* ─── Fact list ────────────────────────────────────────────────── */

export function FactList({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-6 grid gap-3 border-t border-white/10 pt-6">{children}</ul>
  );
}

export function Fact({ children }: { children: ReactNode }) {
  return (
    <RevealBlock>
      <li className="flex gap-4 text-[15px] leading-[1.7] text-zinc-400 sm:text-[16.5px]">
        <span
          className="mt-[.7em] block size-[3px] shrink-0 bg-purple-400"
          aria-hidden="true"
        />
        <span>{children}</span>
      </li>
    </RevealBlock>
  );
}
