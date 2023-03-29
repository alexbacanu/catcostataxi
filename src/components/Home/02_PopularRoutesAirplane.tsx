"use client"

import { popularAirports } from "@/data/airports"
import useAddressStore from "@/stores/addressStore"
import Image from "next/image"

export default function PopularRoutesAirplane() {
  const addressFrom = useAddressStore((state) => state.addressFrom)

  function handleClick(routeData: (typeof popularAirports)[number]["routeData"]) {
    addressFrom.description === ""
      ? useAddressStore.setState({ addressFrom: routeData })
      : useAddressStore.setState({ addressTo: routeData })
  }

  return (
    <section className="layout-mx gap-x-12">
      <Image
        src="/undraw_airport.svg"
        alt="Rute aeroport"
        className="hidden lg:flex"
        width={495 * 0.5}
        height={488 * 0.5}
      />

      <div className="card-base flex">
        <div className="flex flex-col items-center">
          <h2 className="pb-4">Selectează rapid un aeroport</h2>
          <div className="flex flex-wrap justify-center">
            {popularAirports.map((obj) => (
              <button
                key={obj.city}
                className="button-neutral m-1.5 cursor-pointer rounded-lg p-2 text-sm font-medium"
                onClick={() => handleClick(obj.routeData)}
              >
                {obj.destination}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
