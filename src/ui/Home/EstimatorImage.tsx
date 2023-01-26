import Image from "next/image"

export default function EstimatorImage() {
  return (
    <div className="hidden lg:flex">
      <Image src="/undraw_ride.svg" alt="Estimate taxi cost" width={450} height={235} priority />
    </div>
  )
}
