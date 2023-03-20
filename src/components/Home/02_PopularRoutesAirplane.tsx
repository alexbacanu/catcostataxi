"use client"

import { popularAirports } from "@/data/airports"
import useAddressStore from "@/stores/addressStore"
import Image from "next/image"

export default function PopularRoutesAirplane() {
  return (
    <section className="layout-mx">
      <Image
        src="/undraw_airport.svg"
        alt="Recent routes"
        className="hidden p-6 md:flex"
        width={550 * 0.65}
        height={488.5 * 0.65}
        priority
      />

      <div className="card-base flex">
        <div className="flex flex-col items-center">
          <h2 className="pb-4">Selectează rapid un aeroport</h2>
          <div className="flex flex-wrap justify-center">
            {popularAirports.map((obj) => (
              <button
                key={obj.city}
                className="button-secondary m-1 cursor-pointer rounded-lg py-2 px-4 text-sm font-medium hover:bg-teal-900 hover:text-neutral-200"
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
