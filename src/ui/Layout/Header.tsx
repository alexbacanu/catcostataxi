import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-amber-400 transition">
      <div className="home-section flex-col gap-y-2 py-4 sm:flex-row">
        <Link href="/" className="shrink-0 text-neutral-800 transition">
          <Image
            src="/logo3.svg"
            alt="CatCostaTaxi Logo"
            className="shrink-0 text-black"
            width={166}
            height={166}
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
