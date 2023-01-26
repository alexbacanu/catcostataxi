import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="w-full bg-amber-400 backdrop-blur transition">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-8">
        {/* Logo */}
        <Link href="/">
          <p className="text-3xl font-extrabold tracking-tighter text-neutral-800 transition">Cat costa taxi</p>
        </Link>

        {/* Transfer */}
        <Link href="#">
          <p className="rounded-md bg-teal-900 py-2 px-4 text-base font-medium text-white ring-1 ring-neutral-800/20 transition hover:shadow-md">
            Transfer aeroport
          </p>
        </Link>
      </div>
    </nav>
  )
}
