import Link from "next/link";

// Next.js serves this with a real 404 status and a noindex robots tag.
const LINKS = [{ href: "/", label: "Go To HomePage" }] as const;

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#08070a] px-5 py-32 text-center text-white">
      <div
        className="anime-speed-lines pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center">
        <p
          className="text-outline text-[clamp(7rem,28vw,20rem)] font-black leading-[.8] tracking-[-.07em]"
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="mt-10 text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-.03em]">
          This page <span className="text-purple-400">doesn&rsquo;t exist</span>
          .
        </h1>

        <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
          The link may be broken, or the page may have moved. Head back to a
          page that does exist.
        </p>

        <nav
          aria-label="Helpful links"
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {LINKS.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              className={
                index === 0
                  ? "border border-purple-300/60 bg-purple-400/15 px-6 py-3 text-xs font-semibold uppercase tracking-[.2em] text-purple-200 transition-colors hover:bg-purple-400/25"
                  : "border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[.2em] text-zinc-300 transition-colors hover:border-purple-300/50 hover:text-purple-200"
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
