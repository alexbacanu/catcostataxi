import BookingCard from "@/components/Directions/BookingCard"
import EstimateCard from "@/components/Directions/EstimateCard"
import MapCard from "@/components/Directions/MapCard"
import TaxiListCard from "@/components/Directions/TaxiListCard"
import TitleCard from "@/components/Directions/TitleCard"
import { fetchAllRoutesIds, fetchCompaniesByLoc, fetchSingleRoute } from "@/helpers/mongo"
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
  return { title: `Cat costa taxi de la ${route?.fromAddress} pana la ${route?.toAddress}` }
}

export default async function DirectionsPage({ params }: Props) {
  const route = await fetchSingleRoute(params.rid)
  if (!route) return <NoRouteFound />

  const companies = await fetchCompaniesByLoc(route.fromLoc)

  return (
    <>
      <TitleCard route={route} />
      <MapCard route={route} />
      <BookingCard />
      <EstimateCard companies={companies} />
      <TaxiListCard companies={companies} />
    </>
  )
}

function NoRouteFound() {
  return (
    <section className="layout-mx flex h-screen flex-col justify-start">
      <h2 className="mb-6">Ne pare rau, nu am gasit nici o ruta</h2>
      <div className="relative h-[36rem] w-[36rem]">
        <Image src="/undraw_exploring.svg" alt="No route found" fill priority />
      </div>
    </section>
  )
}
