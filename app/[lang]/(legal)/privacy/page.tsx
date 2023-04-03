import { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { fetchLegal } from "@/lib/helpers/mongo"
import { getDictionary } from "@/lib/locale/get-dictionary"
import type { Locale } from "@/lib/locale/i18n-config"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang)

  return {
    title: dictionary.root.footer.privacy,
  }
}

type Props = {
  params: {
    lang: Locale
  }
}

export default async function PrivacyPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang)
  const legal = await fetchLegal("privacy", params.lang)

  const currentDocument = legal[0]

  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <ul className="flex space-x-1 text-xs font-normal leading-4 text-gray-500">
        <li>{dictionary.legal.version}</li>
        <li>{currentDocument.version}</li>
        <li>&middot;</li>
        <li>{dictionary.legal.modified}</li>
        <li>{new Date(currentDocument.modified).toLocaleDateString()}</li>
        <li>&middot;</li>
        <li>
          <a href="/privacy/history">{dictionary.legal.history}</a>
        </li>
      </ul>
      {/* @ts-expect-error Server Error */}
      <MDXRemote source={currentDocument.markdown} />
    </section>
  )
}