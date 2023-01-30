import Image from "next/image"

export default function EstimatorImage() {
  return (
    <div className="hidden lg:flex">
      <Image
        src="/undraw_right_direction.svg"
        className="hidden lg:flex"
        alt="Estimate taxi cost"
        width={630 * 0.6}
        height={532 * 0.6}
        priority
      />
    </div>
  )
}
