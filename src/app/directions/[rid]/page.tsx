import BookingCard from "@/components/Directions/BookingCard"
import EstimateCard from "@/components/Directions/EstimateCard"
import MapCard from "@/components/Directions/MapCard"
import TaxiListCard from "@/components/Directions/TaxiListCard"
import TitleCard from "@/components/Directions/TitleCard"
import { fetchCompaniesByLoc, fetchSingleRoute } from "@/helpers/mongo"
import Image from "next/image"

type Props = {
  params: {
    rid: string
  }
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

// export async function generateStaticParams() {
//   const client = await clientPromise
//   const db = client.db(process.env.MONGO_DB ?? "")
//   const routes = db.collection("routes")

//   const allRoutes = await routes.find({}).sort("createdAt", -1).project<Route>({ _id: 0, hash: 1 }).toArray()
//   if (allRoutes.length == 0) console.warn("😱 Warning: No routes found")

//   const allRoutesIds = allRoutes.map((object) => object.hash)

//   if (!allRoutesIds) return

//   const returned = allRoutesIds.map((route) => ({
//     rid: route,
//   }))

//   return returned
// }
