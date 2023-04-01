import { Metadata } from "next"
import ContentEN from "@/app/[lang]/(legal)/privacy/privacy-en.mdx"
import ContentRO from "@/app/[lang]/(legal)/privacy/privacy-ro.mdx"
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

export default function PrivacyPage({ params }: Props) {
  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      {params.lang === "ro" ? <ContentRO /> : <ContentEN />}
    </section>
  )
}
