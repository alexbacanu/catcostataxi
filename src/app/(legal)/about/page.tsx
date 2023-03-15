import Content from "@/app/(legal)/about/about.mdx"

export const metadata = {
  title: "Cat Costa Taxi - Despre noi",
}

export default function AboutPage() {
  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <Content />
    </section>
  )
}
