import Link from "next/link";

const navigation = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
] as const;

export function Header() {
  return (
    <header id="top" className="sticky top-0 z-50 border-b border-purple-300/10 bg-[#08070a]/85 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 font-semibold tracking-tight text-white"
          aria-label="Portfolio home"
        >
          <span className="grid size-9 rotate-3 place-items-center border border-purple-300/50 bg-purple-500/15 text-sm text-purple-200 transition-transform group-hover:-rotate-6">
            K.
          </span>
          <span>Kumud Waykole</span>
        </Link>

        <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[.18em] text-zinc-400 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-purple-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden border border-purple-300/40 bg-purple-500/10 px-5 py-2.5 text-sm font-semibold text-purple-100 transition hover:bg-purple-500 hover:text-white md:inline-flex"
        >
          Let&apos;s talk
        </Link>

        <details className="group relative md:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-zinc-200 text-zinc-950 transition hover:bg-zinc-100 [&::-webkit-details-marker]:hidden dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800">
            <span className="sr-only">Toggle navigation</span>
            <svg className="size-5 group-open:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg className="hidden size-5 group-open:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
            </svg>
          </summary>

          <nav className="absolute right-0 top-13 w-56 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-900" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800">
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" className="mt-1 block rounded-xl bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
              Let&apos;s talk
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
