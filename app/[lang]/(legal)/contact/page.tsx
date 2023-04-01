import { Metadata } from "next"
import ContentEN from "@/app/[lang]/(legal)/contact/contact-en.mdx"
import ContentRO from "@/app/[lang]/(legal)/contact/contact-ro.mdx"
import { getDictionary } from "@/lib/locale/get-dictionary"
// import { getDictionary } from "@/lib/locale/get-dictionary"
// import ContactForm from "./(components)/contact-form"
import type { Locale } from "@/lib/locale/i18n-config"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang)

  return {
    title: dictionary.root.footer.contact,
  }
}

type Props = {
  params: {
    lang: Locale
  }
}

export default async function ContactPage({ params }: Props) {
  // const dictionary = await getDictionary(params.lang)

  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      {params.lang === "ro" ? <ContentRO /> : <ContentEN />}
      {/* <ContactForm dictionary={dictionary} lang={params.lang} /> */}
    </section>
  )
}
