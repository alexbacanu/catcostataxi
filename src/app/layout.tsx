import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import "./globals.css"

export const metadata = {
  title: "Cat Costa Taxi - Estimator de tarife taxi",
  description:
    "Aplicație pentru verificarea tarifului de taxi. CatCostaTaxi.ro estimează costurile călătoriei tale următoare rapid, simplu și gratuit!",
  keywords:
    "cat costa taxi, estimare tarif taxi, cat costa uber, cat costa bolt, estimare cost uber, estimare cost bolt, tarif taxi online, tarif uber online, tarif bolt online",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={inter.className}>
      <head />
      <body className="layout-bg [&>*]:mx-auto">
        <Header />
        <Children />
        <Footer />
        <Analytics />
      </body>
    </html>
  )

  function Header() {
    return (
      <header className="z-30 bg-amber-400 shadow-md transition">
        <div className="layout-mx justify-center py-4 md:justify-start">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="CatCostaTaxi Logo"
              className="h-16 w-auto"
              width={211 * 0.6}
              height={110 * 0.6}
            />
          </Link>
          {/*
          <Link href="/" className="button-base button-secondary">
            Transfer Aeroport
          </Link> */}
        </div>
      </header>
    )
  }

  function Children() {
    return <main className="min-h-[80.5vh]">{children}</main>
  }

  function Footer() {
    return (
      <footer className="light:bg-neutral-200/50 mt-6 border-t border-neutral-800/10 transition dark:border-white/10">
        <div className="layout-mx flex-col gap-4 py-4 lg:flex-row">
          <div className="flex flex-col gap-x-4 gap-y-2 text-center text-lg font-light tracking-tight md:flex-row md:self-center">
            <Link className="hover:text-amber-500" href="/about">
              Despre noi
            </Link>
            <Link className="hover:text-amber-500" href="/privacy">
              Politica de confidențialitate
            </Link>
            <Link className="hover:text-amber-500" href="/terms">
              Termeni și condiții
            </Link>
            <Link className="hover:text-amber-500" href="/contact">
              Contact
            </Link>
          </div>
          <div className="space-y-2">
            {/* <div className="flex w-full justify-evenly">
              <IconBrandGithub />
              <IconBrandTwitter />
              <IconBrandFacebook />
            </div> */}
            <div>Copyright &copy; {new Date().getFullYear()} catcostataxi.ro</div>
          </div>
        </div>
      </footer>
    )
  }
}
