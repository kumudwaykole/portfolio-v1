import Image from "next/image";
import { ScrollReveal } from "../scroll-reveal";
import { StackMarquee } from "./StackMarquee";

const FOCUS_AREAS = [
  "System design",
  "Database architecture",
  "Performance optimization",
  "DevOps",
] as const;

/** Matches the arrow used on the footer's CTA and case-study "explore" links. */
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-3.5 shrink-0 text-purple-400"
    >
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#08070a] px-5 py-24 text-white sm:px-8 sm:py-32"
      aria-labelledby="about-heading"
    >
      <div
        className="anime-speed-lines pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.3em] text-purple-300">
            CORE STACK
          </p>
        </ScrollReveal>

        {/* <h2
          id="about-heading"
          className="max-w-4xl text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold leading-[1.05] tracking-[-.04em]"
        >
          Engineering <span className="text-purple-400">Scalable</span>{" "}
          Systems That Solve{" "}
          <span className="text-purple-400">Real Business Problems</span>.
        </h2> */}

        <StackMarquee />

        {/* Photo / about-me / focus-areas */}
        <div className="mt-6 grid gap-4 lg:grid-cols-[.85fr_1.2fr_.85fr] lg:items-stretch">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-zinc-950 lg:aspect-auto">
            <Image
              src="/images/passport.jpg"
              alt="Kumud Waykole working at a multi-monitor development setup"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover object-top saturate-[.9]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08070a] via-[#08070a]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-lg font-bold">Kumud Waykole</p>
              <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-purple-300">
                Full Stack Developer
              </p>
            </div>
          </div>

          <div className="border border-white/10 bg-white/[.03] p-7 sm:p-9">
            <ScrollReveal>
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-purple-300">
                About me
              </p>
              <p className="mt-8 font-normal text-sm leading-7 text-zinc-400">
                I&rsquo;m a Full Stack Developer with 3+ years of experience
                building production-ready web applications, with a strong focus
                on system design, backend architecture, database optimization,
                and performance.
              </p>
              <p className="mt-5 font-normal text-sm leading-7 text-zinc-400">
                I enjoy solving complex business problems and turning them into
                scalable, reliable, and maintainable systems from development to
                deployment.
              </p>
            </ScrollReveal>
          </div>

          <div className="relative overflow-hidden border border-white/10 bg-white/[.03] p-7 sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full border border-purple-400/20"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full border border-purple-400/25"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-2 size-10 rounded-full bg-purple-400/25 blur-xl"
            />

            <ScrollReveal delay={100} className="relative">
              <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-purple-300">
                Focus areas
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {FOCUS_AREAS.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-2.5 font-normal text-sm text-zinc-300"
                  >
                    <ArrowIcon />
                    {area}
                  </li>
                ))}
              </ul>

              <div className="mt-16 flex items-center gap-2 px-3 pt-2.5 text-xs text-zinc-400">
                <span>
                  currently_at:{" "}
                  <span className="font-medium text-purple-300">
                    SourceCatch Konnect
                  </span>
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal>
          <h3
            id="experience"
            className="mt-20 text-[clamp(2.6rem,9vw,6rem)] font-bold uppercase leading-[.85] tracking-[-.06em] sm:mt-28"
          >
            3+ YEARS
            <br />
            <span className="tracking-wide text-purple-400"> OF Experience</span>
          </h3>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-16"></div>
      </div>
    </section>
  );
}
