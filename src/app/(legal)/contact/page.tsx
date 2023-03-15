import Content from "@/app/(legal)/contact/contact.mdx"
import Contact from "@/components/(legal)/Contact"

export const metadata = {
  title: "Cat Costa Taxi - Contacteaza-ne",
}

export default function ContactPage() {
  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <Content />
      <Contact />
    </section>
  )
}
