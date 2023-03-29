import RouteDetails from "@/components/Directions/01_RouteDetails"
import RouteMap from "@/components/Directions/02_RouteMap"
import TaxiPrices from "@/components/Directions/04_TaxiPrices"
import TaxiList from "@/components/Directions/05_TaxiList"
import { fetchAllRoutesIds, fetchAvailableLocations, fetchCompaniesByLoc, fetchSingleRoute } from "@/helpers/mongo"
import type { Metadata } from "next"
import Image from "next/image"

type Props = {
  params: {
    rid: string
  }
}

export async function generateStaticParams() {
  const routes = await fetchAllRoutesIds()

  return routes.map((route: string) => ({
    rid: route,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await fetchSingleRoute(params.rid)
  const imageUrl = `${process.env.SITE_URL}/api/og?from=${route?.selectedFrom.structured_formatting.main_text}&to=${route?.selectedTo.structured_formatting.main_text}`

  return {
    title: `Cât costă taxi de la ${route?.selectedFrom.structured_formatting.main_text} până la ${route?.selectedTo.structured_formatting.main_text}`,
    description: `Obțineți o estimare a tarifului pentru taxi de la de la ${route?.selectedFrom.structured_formatting.main_text} până la ${route?.selectedTo.structured_formatting.main_text}. Verifică gratuit, cât costă cursa într-un mod convenabil și ușor.`,
    keywords: `tarif taxi, estimat taxi, de la ${route?.selectedFrom.structured_formatting.main_text}, pana la ${route?.selectedTo.structured_formatting.main_text}`,
    openGraph: {
      title: `Cât costă taxi de la ${route?.selectedFrom.structured_formatting.main_text} până la ${route?.selectedTo.structured_formatting.main_text}`,
      description: `Obțineți o estimare a tarifului pentru taxi de la de la ${route?.selectedFrom.structured_formatting.main_text} până la ${route?.selectedTo.structured_formatting.main_text}. Verifică gratuit, cât costă cursa într-un mod convenabil și ușor.`,
      url: `${process.env.SITE_URL}/directions/${params.rid}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 400,
        },
      ],
      siteName: "CatCostaTaxi",
      locale: "ro-RO",
      type: "website",
    },
  }
}

export default async function DirectionsPage({ params }: Props) {
  const route = await fetchSingleRoute(params.rid)
  if (!route) return <NoRouteFound />

  const availableCities = await fetchAvailableLocations()

  let initialCompanies = await fetchCompaniesByLoc(route.selectedFrom.structured_formatting.secondary_text)
  if (initialCompanies.length === 0 && route.selectedTo.structured_formatting.secondary_text) {
    initialCompanies = await fetchCompaniesByLoc(route.selectedTo.structured_formatting.secondary_text)
  }

  const initialCity = initialCompanies.length !== 0 ? initialCompanies[0]?.city : ""

  return (
    <>
      <RouteDetails route={route} />
      <RouteMap route={route} />
      {/* <Affiliate /> */}
      <TaxiPrices initialCompanies={initialCompanies} initialCity={initialCity} availableCities={availableCities} />
      <TaxiList initialCompanies={initialCompanies} />
    </>
  )
}

function NoRouteFound() {
  return (
    <section className="layout-mx flex h-screen flex-col justify-start">
      <h1 className="mb-6 py-6">Ne pare rău, nu am găsit nicio rută</h1>
      <div className="relative h-[36rem] w-[36rem]">
        <Image src="/undraw_exploring.svg" alt="No route found" fill />
      </div>
    </section>
  )
}
