import Image from "next/image";
import { IconArrowNarrowUp } from "@tabler/icons-react";

const projects = [
    {
        title: "ERP Software",
        tags: ["Express", "React"],
        image: "/images/novastream.webp",
        href: "#contact",
    },
    {
        title: "Book My Services",
        tags: ["MERN", "Redux"],
        image: "/images/zentask.webp",
        href: "#contact",
    },
    {
        title: "Vaault Of Scents",
        tags: ["Next.js", "Razorpay"],
        image: "/images/aura-commerce.webp",
        href: "#contact",
    },
    {
        title: "BookTkit",
        tags: ["Nextjs", "Tailwind"],
        image: "/images/booktkit.png",
        href: "#contact",
    },
] as const;

export function Projects() {
    return (
        <section id="work" className="relative overflow-hidden bg-[#08070a] px-5 py-24 text-white sm:px-8 sm:py-32" aria-labelledby="projects-heading">
            <div className="anime-speed-lines pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-6 border-b border-white/10 pb-10 lg:grid-cols-[1fr_1fr] lg:items-end">
                    <div>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.3em] text-purple-300">Selected work</p>
                        <h2 id="projects-heading" className="text-3xl font-bold tracking-[-.04em] sm:text-4xl">Building for the modern web</h2>
                    </div>
                    <p className="max-w-sm text-base leading-7 text-zinc-500 lg:justify-self-end">
                        A curated selection of applications that blend performance with pixel-perfect design.
                    </p>
                </div>

                <div className="divide-y divide-white/10">
                    {projects.map((project, index) => (
                        <article key={project.title} className="group relative isolate min-h-36 overflow-hidden bg-transparent transition-colors duration-500 hover:bg-white/[.035] focus-within:bg-white/[.035] sm:min-h-40">
                            <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden="true">
                                <Image
                                    src={project.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, 1280px"
                                    className="scale-105 object-cover object-center saturate-[.75] transition-transform duration-700 group-hover:scale-100 group-focus-within:scale-100"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,10,.96)_0%,rgba(8,7,10,.7)_42%,rgba(8,7,10,.45)_68%,rgba(8,7,10,.9)_100%)]" />
                                <div className="absolute inset-0 bg-purple-950/20 mix-blend-color" />
                            </div>

                            <div className="grid min-h-36 items-center gap-x-4 gap-y-5 px-3 py-7 sm:min-h-40 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:px-4 md:gap-x-7">
                                <span className="self-start pt-2 text-[10px] text-zinc-500 sm:self-auto sm:pt-0">{String(index + 1).padStart(2, "0")}</span>

                                <h3 className="col-start-1 row-start-2 text-[clamp(1.8rem,4vw,3.4rem)] font-bold italic leading-none tracking-[-.055em] transition-all duration-300 group-hover:translate-x-2 group-hover:text-purple-200 group-focus-within:translate-x-2 group-focus-within:text-purple-200 sm:col-start-2 sm:row-start-1">
                                    {project.title}
                                </h3>

                                <div className="col-start-1 row-start-3 flex flex-wrap items-center gap-4 sm:col-start-3 sm:row-start-1 sm:justify-end">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="rounded border border-white/10 bg-black/60 px-2 py-1 text-[8px] uppercase text-zinc-300 backdrop-blur-sm">{tag}</span>
                                        ))}
                                    </div>
                                    <a href={project.href} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/45 bg-black/30 px-5 text-xs font-semibold transition hover:border-purple-300 hover:bg-purple-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300">
                                        View case study <IconArrowNarrowUp size={16} stroke={1.5} className="rotate-45" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
