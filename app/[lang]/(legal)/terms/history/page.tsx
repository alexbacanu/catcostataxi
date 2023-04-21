import { Metadata } from "next"
import { fetchLegal } from "@/lib/helpers/mongo"
import { getDictionary } from "@/lib/locale/get-dictionary"
import type { Locale } from "@/lib/locale/i18n-config"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang)

  return {
    title: dictionary.root.footer.terms,
  }
}

type Props = {
  params: {
    lang: Locale
  }
}

export default async function TermsHistoryPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang)
  const legal = await fetchLegal("terms", params.lang)
  const lang = params.lang === "ro" ? "ro-RO" : "en-GB"

  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <h1>{dictionary.root.footer.terms}</h1>
      {legal.map((document) => (
        <a key={document.version} href={`/terms/history/${document.version}`}>
          <ul className="flex gap-x-2 text-lg font-normal leading-4">
            <li>{dictionary.legal.modified}</li>
            <li>{new Date(document.modified).toLocaleDateString(lang)}</li>
            <li>&middot;</li>
            <li>{dictionary.legal.version}</li>
            <li>{document.version}</li>
          </ul>
        </a>
      ))}
    </section>
  )
}
