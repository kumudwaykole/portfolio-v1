"use client";

import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiGithubactions,
  SiGreensock,
  SiJest,
  SiMedusa,
  SiNextdotjs,
  SiNodedotjs,
  SiPnpm,
  SiPostgresql,
  SiPrisma,
  SiRazorpay,
  SiReact,
  SiRedis,
  SiStripe,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";

const CORE_STACK: { name: string; Icon: IconType }[] = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express", Icon: SiExpress },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Prisma", Icon: SiPrisma },
  { name: "Redis", Icon: SiRedis },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "GSAP", Icon: SiGreensock },
  { name: "Medusa.js", Icon: SiMedusa },
  { name: "Razorpay", Icon: SiRazorpay },
  { name: "Stripe", Icon: SiStripe },
  { name: "Zod", Icon: SiZod },
  { name: "Turborepo", Icon: SiTurborepo },
  { name: "Docker", Icon: SiDocker },
  { name: "GitHub Actions", Icon: SiGithubactions },
  { name: "Jest", Icon: SiJest },
  { name: "Git", Icon: SiGit },
  { name: "pnpm", Icon: SiPnpm },
  { name: "Vercel", Icon: SiVercel },
];

/**
 * A seamless CSS-only marquee (two copies of the list, translated exactly
 * -50%) — a single GPU-composited transform, no JS per frame. The only JS
 * involved is an IntersectionObserver that toggles the `paused` utility
 * (from tw-animate-css) directly via the DOM, not React state, so scrolling
 * the section in/out of view costs one class toggle, never a re-render.
 *
 * Starts paused: the animation only runs while the strip is actually on
 * screen, so it costs nothing for the rest of the page's lifetime.
 */
export function StackMarquee() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        track.classList.toggle("paused", !entry.isIntersecting);
      },
      { rootMargin: "80px 0px" },
    );
    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative mt-10 overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        aria-hidden="true"
      >
        <div
          ref={trackRef}
          className="animate-marquee paused hover:paused flex w-max items-center gap-3 will-change-transform"
        >
          {[...CORE_STACK, ...CORE_STACK].map(({ name, Icon }, index) => (
            <span
              key={`${name}-${index}`}
              className="flex shrink-0 items-center gap-2.5 border border-white/15 bg-white/[.03] px-4 py-2.5 text-xs font-semibold uppercase tracking-[.14em] text-zinc-300 sm:text-sm"
            >
              <Icon
                aria-hidden="true"
                className="size-5 shrink-0 text-purple-300 sm:size-6"
              />
              {name}
            </span>
          ))}
        </div>
      </div>
      {/* Same list, real text this time, for screen readers / SEO — the
          marquee above is presentational and hidden from the a11y tree. */}
      <p className="sr-only">
        Core stack: {CORE_STACK.map(({ name }) => name).join(", ")}.
      </p>
    </>
  );
}
