import Link from "next/link";
import Threads from "./Threads";

export default function HeroSection() {
  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden bg-black px-5 py-24 text-white sm:px-8 sm:py-28"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 z-0 opacity-85 [mask-image:linear-gradient(to_bottom,transparent_2%,black_18%,black_82%,transparent_100%)]">
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(116,42,168,0.12),transparent_48%)]" />

      {/* Entrance is CSS-only (animate-fade-up) rather than ScrollReveal: this
          is the LCP content, so it must paint with the HTML, not after hydration. */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="animate-fade-up">
          <p className="mb-7 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-fuchsia-200 sm:text-xs">
            Hi.. i&apos;m Kumud Waykole
          </p>
        </div>

        <div className="animate-fade-up delay-100">
          <h1
            id="hero-heading"
            className="max-w-4xl text-balance text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]"
          >
            Full Stack
            <span className="block bg-gradient-to-r from-white via-fuchsia-200 to-purple-400 bg-clip-text text-transparent">
              Software Engineer
            </span>
          </h1>
        </div>

        <div className="flex animate-fade-up flex-col items-center delay-200">
          <p className="mt-7 max-w-2xl font-normal text-pretty text-base leading-7 text-zinc-400 sm:mt-9 sm:text-lg sm:leading-8">
            Specializing in React, Next.js, Node.js, TypeScript, and scalable
            system design, building secure, high-performance web applications
            from frontend to production.
          </p>

          <Link href="#work" className="group mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-purple-400/30 bg-zinc-950/85 px-8 text-sm font-semibold text-zinc-200 shadow-[0_0_28px_rgba(168,85,247,0.30)] backdrop-blur transition hover:-translate-y-0.5 hover:border-purple-300/60 hover:text-white hover:shadow-[0_0_38px_rgba(168,85,247,0.42)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 sm:mt-11 sm:px-10 sm:text-base">
            View Recent Projects
          <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-y-1">↓</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
