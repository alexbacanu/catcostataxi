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

  return { title: `Cât costă taxi de la ${route?.fromAddress} până la ${route?.toAddress}` }
}

export default async function DirectionsPage({ params }: Props) {
  const route = await fetchSingleRoute(params.rid)
  if (!route) return <NoRouteFound />

  const availableCities = await fetchAvailableLocations()

  const initialCompanies = await fetchCompaniesByLoc(route.fromLoc)

  const initialCity = initialCompanies.length !== 0 ? initialCompanies[0].city : ""

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
