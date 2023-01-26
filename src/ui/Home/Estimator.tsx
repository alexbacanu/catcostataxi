import EstimatorForm from "./EstimatorForm"
import EstimatorImage from "./EstimatorImage"

export default function Estimator() {
  return (
    <section className="bg-gradient-to-b from-amber-400 to-amber-500 transition">
      <div className="home-section gap-x-16 pt-0">
        <EstimatorForm />
        <EstimatorImage />
      </div>
    </section>
  )
}
