"use client"

import { popularTrainStations } from "@/data/stations"
import useAddressStore from "@/stores/addressStore"
import Image from "next/image"

export default function PopularRoutesTrain() {
  return (
    <section className="layout-mx">
      <div className="card-base flex">
        <div className="flex flex-col items-center">
          <h2 className="pb-4">Selectează rapid o gară</h2>
          <div className="flex flex-wrap justify-center">
            {popularTrainStations.map((obj) => (
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

      <Image
        src="/undraw_subway.svg"
        alt="Recent routes"
        className="hidden p-6 md:flex"
        width={982 * 0.4}
        height={469.75 * 0.4}
        priority
      />
    </section>
  )
}
