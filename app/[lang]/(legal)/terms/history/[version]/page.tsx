import { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { fetchSingleLegal } from "@/lib/helpers/mongo"
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
    version: string
  }
}

export default async function TermsHistoryVersionPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang)
  const legal = await fetchSingleLegal("terms", params.lang, params.version)
  if (!legal)
    return (
      <section className="layout-mx flex-col items-start gap-y-4">
        {dictionary.legal.not_found}
      </section>
    )

  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <ul className="flex space-x-1 text-xs font-normal leading-4 text-gray-500">
        <li>{dictionary.legal.version}</li>
        <li>{legal.version}</li>
        <li>&middot;</li>
        <li>{dictionary.legal.modified}</li>
        <li>{new Date(legal.modified).toLocaleDateString()}</li>
      </ul>
      {/* @ts-expect-error Server Error */}
      <MDXRemote source={legal.markdown} />
    </section>
  )
}
