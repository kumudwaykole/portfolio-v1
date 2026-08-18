import Link from "next/link";
import Threads from "./Threads";

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden bg-black px-5 py-24 text-white sm:px-8 sm:py-28" aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0 opacity-85 [mask-image:linear-gradient(to_bottom,transparent_2%,black_18%,black_82%,transparent_100%)]">
        <Threads amplitude={1} distance={0} enableMouseInteraction />
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(116,42,168,0.12),transparent_48%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <p className="mb-7 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-fuchsia-200 sm:text-xs">
          Precision engineering
        </p>

        <h1 id="hero-heading" className="max-w-4xl text-balance text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
          Crafting digital experiences
          <span className="block bg-gradient-to-r from-white via-fuchsia-200 to-purple-400 bg-clip-text text-transparent">
            with precision.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-zinc-400 sm:mt-9 sm:text-lg sm:leading-8">
          MERN Stack Developer &amp; UI/UX Enthusiast. Specialized in building high-performance, scalable web applications with a focus on aesthetic excellence.
        </p>

        <Link href="#work" className="group mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-purple-400/30 bg-zinc-950/85 px-8 text-sm font-medium text-zinc-200 shadow-[0_0_28px_rgba(168,85,247,0.30)] backdrop-blur transition hover:-translate-y-0.5 hover:border-purple-300/60 hover:text-white hover:shadow-[0_0_38px_rgba(168,85,247,0.42)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 sm:mt-11 sm:px-10 sm:text-base">
          View Recent Projects
          <span aria-hidden="true" className="text-lg transition-transform group-hover:translate-y-1">↓</span>
        </Link>
      </div>
    </section>
  );
}
