import Image from "next/image"

export default function RecentsImage() {
  return (
    <Image
      src="/undraw_right_direction.svg"
      className="hidden lg:flex"
      alt="Recent routes"
      width={380}
      height={320}
      priority
    />
  )
}
