import Image from "next/image"
import { fetchAllRoutesIds, fetchAvailableLocations, fetchCompaniesByLoc, fetchSingleRoute } from "@/lib/helpers/mongo"
import { normalizeString } from "@/lib/helpers/normalize-string"
import { getDictionary } from "@/lib/locale/get-dictionary"
import RouteDetails from "./(components)/route-details"
import RouteMap from "./(components)/route-map"
import TaxiPrices from "./(components)/taxi-prices"
import TaxiTable from "./(components)/taxi-table"
import type { Locale } from "@/lib/locale/i18n-config"
import type { Metadata } from "next"

export async function generateStaticParams() {
  if (process.env.CUSTOM_ENV === "production") {
    const routes = await fetchAllRoutesIds()

    return routes.map(({ hash, selectedFrom, selectedTo }) => ({
      rid: [
        hash,
        normalizeString(selectedFrom.structured_formatting.main_text),
        normalizeString(selectedTo.structured_formatting.main_text),
      ],
    }))
  } else {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hash = params.rid[0]
  const route = await fetchSingleRoute(hash)

  const routeFrom = route?.selectedFrom.structured_formatting.main_text || ""
  const routeTo = route?.selectedTo.structured_formatting.main_text || ""

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
      url: `${process.env.SITE_URL}/directions/${hash}/${params.rid[1]}/${params.rid[2]}}`,
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

type Props = {
  params: {
    lang: Locale
    rid: string[]
  }
}

export default async function DirectionsPage({ params }: Props) {
  if (params.rid[0].length !== 8 && typeof params.rid[0] !== "string") {
    return (
      <section className="layout-mx flex h-screen flex-col justify-start">
        <h1 className="mb-6 py-6">Ne pare rău, ruta nu este validă</h1>
        <div className="relative h-[36rem] w-[36rem]">
          <Image src="/undraw_exploring.svg" alt="No route found" fill />
        </div>
      </section>
    )
  }

  const route = await fetchSingleRoute(params.rid[0])
  if (!route) {
    return (
      <section className="layout-mx flex h-screen flex-col justify-start">
        <h1 className="mb-6 py-6">Ne pare rău, nu am găsit nicio rută</h1>
        <div className="relative h-[36rem] w-[36rem]">
          <Image src="/undraw_exploring.svg" alt="No route found" fill />
        </div>
      </section>
    )
  }

  const availableCities = await fetchAvailableLocations()

  let initialCompanies = await fetchCompaniesByLoc(route.selectedFrom.structured_formatting.secondary_text)
  if (initialCompanies.length === 0 && route.selectedTo.structured_formatting.secondary_text) {
    initialCompanies = await fetchCompaniesByLoc(route.selectedTo.structured_formatting.secondary_text)
  }

  const initialCity = initialCompanies.length !== 0 ? initialCompanies[0]?.city : ""

  const dictionary = await getDictionary(params.lang)

  return (
    <>
      <RouteDetails dictionary={dictionary} route={route} />
      <RouteMap dictionary={dictionary} route={route} />
      <TaxiPrices
        dictionary={dictionary}
        initialCompanies={initialCompanies}
        initialCity={initialCity}
        availableCities={availableCities}
      />
      <TaxiTable dictionary={dictionary} initialCompanies={initialCompanies} />
    </>
  )
}
