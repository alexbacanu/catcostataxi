import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { i18n } from "@/lib/locale/i18n-config"
import LocaleSwitcher from "@/ui/locale-switcher"

export const metadata = {
  title: {
    default: "Estimator de tarife taxi",
    template: "%s | Cat Costa Taxi",
  },
  description:
    "Aplicație pentru verificarea tarifului de taxi. CatCostaTaxi.ro estimează costurile călătoriei tale următoare rapid, simplu și gratuit!",
  keywords:
    "cat costa taxi, estimare tarif taxi, cat costa uber, cat costa bolt, estimare cost uber, estimare cost bolt, tarif taxi online, tarif uber online, tarif bolt online",
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

const inter = Inter({ subsets: ["latin"] })

type Props = {
  children: React.ReactNode
  params: { lang: string }
}

export default function RootLayout({ children, params }: Props) {
  return (
    <html lang={params.lang} className={inter.className}>
      <body className="bg-white text-neutral-800 antialiased transition dark:bg-neutral-800 dark:text-neutral-200 [&>*]:mx-auto">
        <header className="z-30 bg-amber-400 shadow-md transition">
          <div className="layout-mx justify-between py-4">
            <Link href={{ pathname: "/" }}>
              <Image
                src="/logo.svg"
                alt="CatCostaTaxi Logo"
                className="h-16 w-auto"
                width={211 * 0.6}
                height={110 * 0.6}
              />
            </Link>

            {/* <Link href="/" className="button-base button-secondary">
              Transfer Aeroport
            </Link> */}

            <LocaleSwitcher lang={params.lang} />
          </div>
        </header>

        <main className="min-h-[80.5vh]">{children}</main>

        <footer className="light:bg-neutral-200/50 mt-6 border-t border-neutral-800/10 transition dark:border-white/10">
          <div className="layout-mx flex-col gap-4 py-4 lg:flex-row">
            <div className="flex flex-col gap-x-4 gap-y-2 text-center text-lg font-light tracking-tight md:flex-row md:self-center">
              <Link className="hover:text-amber-500" href={`/${params.lang}/about`}>
                Despre noi
              </Link>
              <Link className="hover:text-amber-500" href={`/${params.lang}/privacy`}>
                Politica de confidențialitate
              </Link>
              <Link className="hover:text-amber-500" href={`/${params.lang}/terms`}>
                Termeni și condiții
              </Link>
              <Link className="hover:text-amber-500" href={`/${params.lang}/contact`}>
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

        <Analytics />
      </body>
    </html>
  )
}
