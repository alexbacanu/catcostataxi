import { IconBrandFacebook, IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import "./globals.css"

export const metadata = {
  title: "Cat costa taxi",
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
    return <main className="min-h-screen">{children}</main>
  }

  function Footer() {
    return (
      <footer className="border-t border-neutral-800/10 transition dark:border-white/10">
        <div className="layout-mx flex-col gap-y-4 sm:flex-row">
          <div className="flex gap-x-4">
            <p>Home</p>
            <p>Contact</p>
            <p>About</p>
            <p>Privacy</p>
            <p>GDPR</p>
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
