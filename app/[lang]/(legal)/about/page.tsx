import ContentEN from "@/app/[lang]/(legal)/about/about-en.mdx"
import ContentRO from "@/app/[lang]/(legal)/about/about-ro.mdx"
import type { Locale } from "@/lib/locale/i18n-config"

export const metadata = {
  title: "Despre noi",
}

type Props = {
  params: {
    lang: Locale
  }
}

export default function AboutPage({ params }: Props) {
  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      {params.lang === "ro" ? <ContentRO /> : <ContentEN />}
    </section>
  )
}
