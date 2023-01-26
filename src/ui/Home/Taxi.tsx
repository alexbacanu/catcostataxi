import TaxiAdd from "./TaxiAdd"
import TaxiImage from "./TaxiImage"

export default function Taxi() {
  return (
    <section className="transition">
      <div className="home-section pt-8">
        <div className="card-base relative isolate w-full overflow-hidden bg-amber-400 p-6 lg:flex">
          <TaxiAdd />
          <TaxiImage />
        </div>
      </div>
    </section>
  )
}
