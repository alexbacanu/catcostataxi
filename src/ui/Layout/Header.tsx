import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm transition dark:bg-zinc-900/80 dark:backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between space-x-6 py-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <p className="text-2xl font-semibold text-zinc-900 transition dark:text-white">Cat costa taxi</p>
        </Link>

        {/* Transfer */}
        <Link
          href="#"
          className="inline-flex justify-center gap-1 overflow-hidden rounded-md bg-zinc-900 py-2 px-4 text-base font-medium text-white transition hover:bg-zinc-700 dark:bg-yellow-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-yellow-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
        >
          Transfer aeroport
        </Link>
      </div>
    </header>
  )
}
