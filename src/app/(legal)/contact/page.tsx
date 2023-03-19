import Content from "@/app/(legal)/contact/contact.mdx"
import ContactForm from "@/components/(legal)/01_ContactForm"

export const metadata = {
  title: "Cat Costa Taxi - Contacteaza-ne",
}

export default function ContactPage() {
  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <Content />
      <ContactForm />
    </section>
  )
}
