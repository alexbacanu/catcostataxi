import EstimatorForm from "./EstimatorForm"
import EstimatorImage from "./EstimatorImage"
import HomeSponsors from "./HomeSponsors"

export default function Estimator() {
  return (
    <section className="bg-gradient-to-b from-amber-400 to-amber-500 transition">
      <HomeSponsors />
      <div className="home-section gap-x-16 pt-4">
        <EstimatorForm />
        <EstimatorImage />
      </div>
      <HomeSponsors />
    </section>
  )
}
