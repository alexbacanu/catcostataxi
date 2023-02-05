import type { TaxiCompanies } from "@/lib/helpers/mongodb"
import PricesList from "./PricesList"

type Props = {
  mapDirections: google.maps.DirectionsResult
  companies: TaxiCompanies[]
}

export default function Prices({ mapDirections, companies }: Props) {
  return (
    <section className="transition">
      <div className="home-section py-6">
        <PricesList mapDirections={mapDirections} companies={companies} />
      </div>
    </section>
  )
}
