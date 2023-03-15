import { IconBrandFacebook, IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import "./globals.css"

export const metadata = {
  title: "Cat Costa Taxi",
  description: "Aplicatie pentru verificarea pretului unui taxi",
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
        <div className="layout-mx px-4 py-2">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="CatCostaTaxi Logo"
              className="h-16 w-auto"
              width={211 * 0.6}
              height={110 * 0.6}
              priority
            />
          </Link>

          <Link href="/" className="button-base button-secondary">
            Transfer Aeroport
          </Link>
        </div>
      </header>
    )
  }

  function Children() {
    return <main className="min-h-[80.5vh]">{children}</main>
  }

  function Footer() {
    return (
      <footer className="border-t border-neutral-800/10 transition dark:border-white/10">
        <div className="layout-mx flex-col gap-y-4 sm:flex-row">
          <div className="flex flex-col gap-x-4 gap-y-2 self-start text-lg font-light tracking-tight sm:flex-row md:self-center">
            <Link href="/about">Despre noi</Link>
            <Link href="/privacy">Politica de confidentialitate</Link>
            <Link href="/terms">Termeni si conditii</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="space-y-2">
            <div className="flex w-full justify-evenly">
              <IconBrandGithub />
              <IconBrandTwitter />
              <IconBrandFacebook />
            </div>
            <div>Copyright &copy; {new Date().getFullYear()} catcostataxi.ro</div>
          </div>
        </div>
      </footer>
    )
  }
}
