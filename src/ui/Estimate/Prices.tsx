import type { TaxiCompanies } from "@/lib/helpers/mongodb"
import PricesList from "./PricesList"
import PricesSponsors from "./PricesSponsors"

type Props = {
  mapDirections: google.maps.DirectionsResult
  companies: TaxiCompanies[]
}

export default function Prices({ mapDirections, companies }: Props) {
  return (
    <section className="transition">
      <PricesSponsors />
      <div className="home-section gap-x-16">
        <PricesList mapDirections={mapDirections} companies={companies} />
        <PricesSponsors />
      </div>
    </section>
  )
}
