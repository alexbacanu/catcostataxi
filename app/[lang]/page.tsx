import { popularAirports } from "@/lib/data/airports"
import { popularStations } from "@/lib/data/stations"
import { getDictionary } from "@/lib/locale/get-dictionary"
import AddressForm from "./(components)/address-form"
import PopularRoutes from "./(components)/popular-routes"
import TaxiAdd from "./(components)/taxi-add"
import PickupsPage from "./(components)/welcome-pickups"
import type { Locale } from "@/lib/locale/i18n-config"

type Props = {
  params: {
    lang: Locale
  }
}

export default async function HomePage({ params }: Props) {
  const dictionary = await getDictionary(params.lang)

  return (
    <>
      <AddressForm dictionary={dictionary} lang={params.lang} />
      <PickupsPage />
      <PopularRoutes dictionary={dictionary} type="airports" data={popularAirports} />
      <PopularRoutes dictionary={dictionary} type="stations" data={popularStations} />
      <TaxiAdd dictionary={dictionary} />
    </>
  )
}
