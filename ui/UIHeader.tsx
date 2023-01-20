import Link from "next/link";

type Props = {};

export default function UIHeader({}: Props) {
  return (
    <header className="dark:bg-zinc-900/80 dark:backdrop-blur sticky top-0 z-50 bg-white backdrop-blur-sm transition">
      <div className="mx-auto flex max-w-7xl items-center justify-between space-x-6 py-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <p className="dark:text-white text-2xl font-semibold text-zinc-900 transition">Cat costa taxi</p>
        </Link>

        {/* Transfer */}
        <Link
          href="#"
          className="dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300 inline-flex justify-center gap-1 overflow-hidden rounded-md bg-zinc-900 py-2 px-4 text-base font-medium text-white transition hover:bg-zinc-700"
        >
          Transfer aeroport
        </Link>
      </div>
    </header>
  );
}
