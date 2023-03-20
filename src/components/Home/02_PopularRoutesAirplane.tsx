"use client"

import { popularAirports } from "@/data/airports"
import useAddressStore from "@/stores/addressStore"
import Image from "next/image"

export default function PopularRoutesAirplane() {
  return (
    <section className="layout-mx gap-x-12">
      <Image
        src="/undraw_airport.svg"
        alt="Rute aeroport"
        className="hidden lg:flex"
        width={495 * 0.5}
        height={488 * 0.5}
        priority
      />

      <div className="card-base flex">
        <div className="flex flex-col items-center">
          <h2 className="pb-4">Selectează rapid un aeroport</h2>
          <div className="flex flex-wrap justify-center">
            {popularAirports.map((obj) => (
              <button
                key={obj.city}
                className="m-1.5 cursor-pointer rounded-lg bg-neutral-800 p-2 text-sm font-medium text-neutral-200 hover:bg-teal-900 hover:text-neutral-200"
                onClick={() => useAddressStore.setState({ addressFrom: obj.routeData })}
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
