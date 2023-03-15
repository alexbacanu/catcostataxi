import Content from "@/app/(legal)/terms/terms.mdx"

export const metadata = {
  title: "Cat Costa Taxi - Termeni si conditii",
}

export default function TermsPage() {
  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <Content />
    </section>
  )
}
