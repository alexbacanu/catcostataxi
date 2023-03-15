import Content from "@/app/(legal)/privacy/privacy.mdx"

export const metadata = {
  title: "Cat Costa Taxi - Politica de confidentialitate",
}

export default function PrivacyPage() {
  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <Content />
    </section>
  )
}
