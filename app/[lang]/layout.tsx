import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/locale/get-dictionary";
import { i18n } from "@/lib/locale/i18n-config";
import LocaleSwitcher from "@/ui/locale-switcher";
import CookieButton from "./(components)/(cookies)/cookie-button";
import GoogleAds from "./(components)/google-ads";
import GoogleAnalytics from "./(components)/google-analytics";
import type { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: {
      default: dictionary.root.meta.title_default,
      template: "%s | CatCostaTaxi.ro",
    },
    description: dictionary.root.meta.description,
    keywords: dictionary.root.meta.keywords,
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({ subsets: ["latin"], display: "swap" });

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function RootLayout({ children, params }: Props) {
  const dictionary = await getDictionary(params.lang);

  return (
    <html lang={params.lang} className={inter.className}>
      <GoogleAnalytics />
      <GoogleAds />
      <CookieButton lang={params.lang} />

      <body className="bg-white text-neutral-800 antialiased transition dark:bg-neutral-800 dark:text-neutral-200 [&>*]:mx-auto">
        <header className="z-30 bg-amber-400 shadow-md transition">
          <div className="layout-mx flex-col justify-between gap-y-6 py-4 sm:flex-row">
            <Link href={{ pathname: `/${params.lang}` }}>
              <Image src="/logo.svg" alt="CatCostaTaxi Logo" className="h-14 sm:h-16" width={122} height={64} />
            </Link>

            <div className="flex gap-x-4">
              <LocaleSwitcher lang={params.lang} dictionary={dictionary} />
              <a
                className="button-base button-secondary"
                href="https://www.welcomepickups.com/airport-transfer-book/?tap_a=26297-438366&tap_s=3501725-e7c260&ref=catcostataxi"
              >
                {dictionary.root.header.airport}
              </a>
            </div>
          </div>
        </header>

        <main className="min-h-[80.5vh]">{children}</main>

        <footer className="light:bg-neutral-200/50 mt-6 border-t border-neutral-800/10 transition dark:border-white/10">
          <div className="layout-mx flex flex-col justify-between gap-y-4 lg:flex-row">
            <div>
              <div className="flex flex-col gap-x-4 text-center sm:flex-row">
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
                <Link className="hover:text-amber-500" href="#" data-cc="show-preferencesModal">
                  {dictionary.root.footer.cookies}
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <p>Copyright &copy; {new Date().getFullYear()} catcostataxi.ro</p>
              <div className="group relative flex justify-center lg:justify-end">
                <p className="peer inline-flex text-xs">{dictionary.root.footer.disclaimer}</p>
                <div className="card-base absolute bottom-full left-1/2 z-10 mb-2 hidden w-max max-w-sm -translate-x-1/2 px-4 py-[6px] text-sm opacity-0 transition duration-100 ease-out peer-hover:block peer-hover:opacity-100">
                  {dictionary.root.footer.disclaimer_tooltip}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
