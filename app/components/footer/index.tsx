import { Globe } from "@/components/ui/globe";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
    <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/10 bg-[#08070a] text-white">
      <div className="anime-speed-lines absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pb-7 pt-20 sm:px-8 sm:pt-28 lg:px-12">
        <div className="grid items-end gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.32em] text-purple-300">
              <span className="size-1.5 rotate-45 bg-purple-400" /> Final chapter
            </span>
            <h2 className="text-[clamp(4rem,10vw,8.8rem)] font-black uppercase leading-[.76] tracking-[-.075em]">
              Get in<br /><span className="text-outline">touch</span>
            </h2>
          </div>
          <div className="group relative h-74 overflow-hidden border border-purple-300/35 bg-black transition-colors duration-300 hover:border-purple-300/55 sm:h-90">
            <div className="pointer-events-none absolute inset-x-0 top-6 z-10 text-center font-mono text-sm font-semibold tracking-wide text-zinc-100 sm:top-5 sm:text-xl">
              <p className="italic">Let&apos;s connect</p>
            </div>
            <Globe className="inset-x-0 bottom-auto top-14 w-[125%] max-w-150 -translate-x-[10%] sm:top-16 sm:w-full sm:translate-x-0" />
            <div className="pointer-events-none absolute inset-x-[8%] bottom-[-35%] aspect-square rounded-full bg-[radial-gradient(circle_at_50%_38%,rgba(192,132,252,.16),rgba(126,34,206,.055)_38%,transparent_67%)] opacity-75 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-10 grid gap-7 border-y border-white/10 py-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <a href="mailto:hello@ikumud.com" className="group w-fit">
            <span className="block font-mono text-[9px] uppercase tracking-[.24em] text-zinc-500">Email</span>
            <span className="mt-1 block text-base font-semibold transition-colors group-hover:text-purple-300">hello@ikumud.com</span>
          </a>
          <div className="flex gap-6 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-purple-300">GitHub</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-purple-300">LinkedIn</a>
          </div>
        </div>

        <div className="grid items-center gap-8 py-10 md:grid-cols-[auto_1fr]">
          <a href="mailto:hello@ikumud.com" className="group inline-flex min-h-20 items-center justify-center gap-4 bg-purple-500 px-10 text-base font-bold uppercase transition hover:bg-purple-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 sm:min-w-72">
            Let&apos;s talk <Arrow />
          </a>
          <p className="select-none text-right text-[clamp(3rem,8vw,7rem)] font-black leading-none tracking-[-.07em] text-white/[.07]">KUMUD.W</p>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 pt-6 font-mono text-[9px] uppercase tracking-[.12em] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kumud Waykole. All rights reserved.</p>
          <a href="#top" className="transition-colors hover:text-purple-300">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
