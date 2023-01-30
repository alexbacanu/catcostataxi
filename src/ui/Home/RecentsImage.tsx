import Image from "next/image"

export default function RecentsImage() {
  return (
    <Image
      src="/undraw_up_to_date.svg"
      alt="Recent routes"
      className="hidden lg:block"
      width={611 * 0.6}
      height={545 * 0.6}
      priority
    />
  )
}
