import Link from "next/link";

const navigation = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-semibold tracking-tight text-zinc-950 dark:text-white"
          aria-label="Portfolio home"
        >
          <span className="grid size-9 place-items-center rounded-full bg-zinc-950 text-sm text-white transition-transform group-hover:-rotate-6 dark:bg-white dark:text-zinc-950">
            K
          </span>
          <span>Kumud Waykole</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex dark:text-zinc-300" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#contact"
          className="hidden rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 md:inline-flex dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
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
