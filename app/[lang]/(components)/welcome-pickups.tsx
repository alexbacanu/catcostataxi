import Image from "next/image"

export default function PickupsPage() {
  return (
    <div className="layout-mx">
      <a
        href="https://www.welcomepickups.com/airport-transfer-book/?tap_a=26297-438366&tap_s=3501725-e7c260&ref=catcostataxi"
        target="_blank"
        className="mx-auto"
        rel="nofollow"
      >
        <Image
          src="https://static.tapfiliate.com/5c6692ed7f06e.png?a=44615-ed5b33"
          alt="Welcome Pickups Airport Transfer"
          className="hidden rounded-lg md:flex"
          width={727}
          height={90}
          priority
        />
        <Image
          src="https://static.tapfiliate.com/5ca4ca72499c2.jpg?a=47283-3f468b"
          alt="Welcome Pickups Airport Transfer"
          className="flex rounded-lg md:hidden"
          width={300}
          height={300}
          priority
        />
      </a>
    </div>
  )
}
