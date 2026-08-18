import Image from "next/image";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#08070a] px-5 py-24 text-white sm:px-8 sm:py-32" aria-labelledby="about-heading">
      <div className="anime-speed-lines pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.3em] text-purple-300">The philosophy</p>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start lg:gap-16">
          <div>
            <h2 id="about-heading" className="text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold leading-[1.05] tracking-[-.04em]">
              Founded on <span className="text-purple-400">precision</span> and modern innovation to redefine{" "}
              <span className="text-purple-400">full-stack development</span>.
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <p className="text-sm leading-7 text-zinc-500">
                My dedication to clean architecture and thoughtful engineering sets a high standard, ensuring
                every project ships with quality, performance, and polish.
              </p>
              <blockquote className="border-l-2 border-purple-400/40 pl-4 text-sm italic leading-7 text-zinc-300">
                &ldquo;I believe in pushing the boundaries of design while honoring solid, maintainable
                code.&rdquo;
                <footer className="mt-3 not-italic text-xs font-semibold text-zinc-500">— Kumud Waykole, Developer</footer>
              </blockquote>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-zinc-950">
            <Image
              src="/images/portfolio image.jpg"
              alt="Kumud Waykole working at a multi-monitor development setup"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top saturate-[.9]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08070a]/55 via-transparent to-transparent" />
          </div>
        </div>

        <h3 className="mt-20 text-[clamp(2.6rem,9vw,7rem)] font-black uppercase leading-[.85] tracking-[-.06em] sm:mt-28">
          Crafting the
          <br />
          <span className="text-purple-400">unconventional</span>
        </h3>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-16">
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-zinc-500">
            From concept to
            <br />
            craftsmanship
          </p>
          <p className="max-w-2xl text-sm leading-7 text-zinc-500">
            Explore the process behind each build — from wireframes to production-ready engineering. Every
            step blends thoughtful design with modern, scalable technology and a commitment to detail.
          </p>
        </div>
      </div>
    </section>
  );
}
