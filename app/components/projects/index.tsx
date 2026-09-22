import Image from "next/image";
import Link from "next/link";
import { IconArrowNarrowUp } from "@tabler/icons-react";
import { ScrollReveal } from "../scroll-reveal";

const projects = [
  {
    title: "ERP Software",
    tags: ["Express", "React"],
    image: "/images/erp.jpg",
    href: "/work/case-studies/erp",
  },
  {
    title: "Book My Services",
    tags: ["MERN", "Redux"],
    image: "/images/bms.jpg",
    href: "/work/case-studies/bms-platform",
  },
  {
    title: "Vaault Of Scents",
    tags: ["Next.js", "Razorpay"],
    image: "/images/vos.jpg",
    href: "/work/case-studies/vos",
  },
  {
    title: "BookTkit",
    tags: ["Next.js", "Razorpay", "PostgreSQL"],
    image: "/images/booktkit-platform.png",
    href: "/work/case-studies/booktkit",
  },
] as const;

export function Projects() {
  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#08070a] px-5 py-24 text-white sm:px-8 sm:pt-15 sm:pb:32"
      aria-labelledby="projects-heading"
    >
      <div
        className="anime-speed-lines pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 border-b border-white/10 pb-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <ScrollReveal>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.3em] text-purple-300">
              Selected work
            </p>
            <h2
              id="projects-heading"
              className="text-3xl font-bold tracking-[-.04em] sm:text-4xl"
            >
              Real-World Software Projects
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100} className="lg:justify-self-end">
            <p className="max-w-sm font-normal text-base leading-7 text-zinc-500">
              Production-ready web applications and scalable software systems
              built with React, Next.js, Node.js, TypeScript, PostgreSQL, and
              Redis.
            </p>
          </ScrollReveal>
        </div>

        <div className="divide-y divide-white/10">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group relative min-h-36 bg-transparent sm:min-h-40"
            >
              {/* Floats over the middle of the row, nudged down from center, like a kite
                                drifting in — pointer-events-none so it never blocks the CTA underneath. */}
              <div
                className="pointer-events-none absolute inset-0 z-20 flex translate-x-12 translate-y-6 items-center justify-center opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100 sm:translate-x-20"
                aria-hidden="true"
              >
                <div className="relative aspect-4/3 w-56 overflow-hidden rounded-2xl shadow-2xl shadow-black/60 ring-1 ring-white/10 group-hover:animate-kite-float group-focus-within:animate-kite-float sm:w-80">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 224px, 320px"
                    className="scale-110 object-cover object-center transition-transform duration-700 group-hover:scale-100 group-focus-within:scale-100"
                  />
                </div>
              </div>

              <ScrollReveal className="relative z-10 grid min-h-36 items-center gap-x-4 gap-y-5 px-3 py-7 sm:min-h-40 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:px-4 md:gap-x-7">
                <span className="self-start pt-2 text-[10px] text-zinc-500 sm:self-auto sm:pt-0">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="col-start-1 row-start-2 text-[clamp(1.8rem,4vw,3.4rem)] font-bold italic leading-none tracking-[-.055em] transition-all duration-300 group-hover:translate-x-2 group-hover:text-purple-200 group-focus-within:translate-x-2 group-focus-within:text-purple-200 sm:col-start-2 sm:row-start-1">
                  {project.title}
                </h3>

                <div className="col-start-1 row-start-3 flex flex-wrap items-center gap-4 sm:col-start-3 sm:row-start-1 sm:justify-end">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-white/10 bg-black/60 px-2 py-1 text-[8px] uppercase text-zinc-300 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.href}
                    className="relative z-30 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/45 bg-black/30 px-5 text-xs font-semibold transition hover:border-purple-300 hover:bg-purple-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
                  >
                    View case study{" "}
                    <IconArrowNarrowUp
                      size={16}
                      stroke={1.5}
                      className="rotate-45"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </ScrollReveal>
            </article>
          ))}
        </div>

        <ScrollReveal className="mt-14 flex justify-center sm:mt-16">
          <Link
            href="/work"
            className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-transparent px-7 text-sm font-semibold transition hover:border-purple-300 hover:bg-purple-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
          >
            View all projects
            <IconArrowNarrowUp
              size={16}
              stroke={1.5}
              className="rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
