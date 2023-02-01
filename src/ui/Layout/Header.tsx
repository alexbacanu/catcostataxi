import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="z-40 bg-amber-400 shadow-sm transition">
      <div className="home-section flex-col gap-y-2 py-2 sm:flex-row">
        <Link href="/" className="shrink-0 text-neutral-800 transition">
          <Image
            src="/logo.svg"
            alt="CatCostaTaxi Logo"
            className="shrink-0 text-black"
            width={211 * 0.6}
            height={110 * 0.6}
            priority
          />
        </Link>

        <Link href="#" className="button-base button-secondary">
          Transfer Aeroport
        </Link>
      </div>
    </header>
  )
}
