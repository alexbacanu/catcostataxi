import ContentEN from "@/app/[lang]/(legal)/privacy/privacy-en.mdx"
import ContentRO from "@/app/[lang]/(legal)/privacy/privacy-ro.mdx"
import type { Locale } from "@/lib/locale/i18n-config"

export const metadata = {
  title: "Termeni și condiții",
}

type Props = {
  params: {
    lang: Locale
  }
}

export default function TermsPage({ params }: Props) {
  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      {params.lang === "ro" ? <ContentRO /> : <ContentEN />}
    </section>
  )
}
