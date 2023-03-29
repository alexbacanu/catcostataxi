import RouteDetails from "@/components/Directions/01_RouteDetails"
import RouteMap from "@/components/Directions/02_RouteMap"
import TaxiPrices from "@/components/Directions/04_TaxiPrices"
import TaxiList from "@/components/Directions/05_TaxiList"
import { fetchAllRoutesIds, fetchAvailableLocations, fetchCompaniesByLoc, fetchSingleRoute } from "@/helpers/mongo"
import type { Metadata } from "next"
import Image from "next/image"

type Props = {
  params: {
    rid: string[]
  }
}

export async function generateStaticParams() {
  if (process.env.CUSTOM_ENV === "production") {
    const routes = await fetchAllRoutesIds()

    return routes.map(({ hash, selectedFrom, selectedTo }) => ({
      rid: [hash, selectedFrom.structured_formatting.main_text, selectedTo.structured_formatting.main_text],
    }))
  } else {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hash = params.rid[0]
  const route = await fetchSingleRoute(hash)

  const routeFrom = route?.selectedFrom.structured_formatting.main_text
  const routeTo = route?.selectedTo.structured_formatting.main_text

  const title = `Cât costă taxi de la ${routeFrom} până la ${routeTo}`
  const description = `Obțineți o estimare a tarifului pentru taxi de la de la ${routeFrom} până la ${routeTo}. Verifică gratuit, cât costă cursa într-un mod convenabil și ușor.`
  const imageUrl = `${process.env.SITE_URL}/api/og?from=${routeFrom}&to=${routeTo}`

  return {
    title,
    description,
    keywords: ["tarif taxi", "estimat taxi", `de la ${routeFrom}`, `pana la ${routeTo}`],
    openGraph: {
      title,
      description,
      url: `${process.env.SITE_URL}/directions/${hash}/${routeFrom}/${routeTo}}`,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function DirectionsPage({ params }: Props) {
  if (params.rid[0].length !== 8 && typeof params.rid[0] !== "string") return <NoRouteFound />

  const route = await fetchSingleRoute(params.rid[0])
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
