import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/lib/locale/get-dictionary"
import { i18n } from "@/lib/locale/i18n-config"
import LocaleSwitcher from "@/ui/locale-switcher"
import type { Metadata } from "next"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang)

  return {
    title: {
      default: dictionary.root.meta.title_default,
      template: "%s | CatCostaTaxi.ro",
    },
    description: dictionary.root.meta.description,
    keywords: dictionary.root.meta.keywords,
  }
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

const inter = Inter({ subsets: ["latin"] })

type Props = {
  children: React.ReactNode
  params: { lang: string }
}

export default async function RootLayout({ children, params }: Props) {
  const dictionary = await getDictionary(params.lang)

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
              {dictionary.root.header.transfer}
            </Link> */}

            <LocaleSwitcher lang={params.lang} />
          </div>
        </header>

        <main className="min-h-[80.5vh]">{children}</main>

        <footer className="light:bg-neutral-200/50 mt-6 border-t border-neutral-800/10 transition dark:border-white/10">
          <div className="layout-mx flex-col gap-4 py-4 lg:flex-row">
            <div className="flex flex-col gap-x-4 gap-y-2 text-center text-lg font-light tracking-tight md:flex-row md:self-center">
              <Link className="hover:text-amber-500" href={`/${params.lang}/about`}>
                {dictionary.root.footer.about}
              </Link>
              <Link className="hover:text-amber-500" href={`/${params.lang}/privacy`}>
                {dictionary.root.footer.privacy}
              </Link>
              <Link className="hover:text-amber-500" href={`/${params.lang}/terms`}>
                {dictionary.root.footer.terms}
              </Link>
              <Link className="hover:text-amber-500" href={`/${params.lang}/contact`}>
                {dictionary.root.footer.contact}
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
