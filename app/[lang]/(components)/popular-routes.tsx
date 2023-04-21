"use client"

import Image from "next/image"
import { Dictionary } from "@/lib/locale/get-dictionary"
import useAddressStore from "@/lib/stores/address-store"
import type { popularAirports } from "@/lib/data/airports"
import type { popularStations } from "@/lib/data/stations"

type Props = {
  dictionary: Dictionary
  type: "airports" | "stations"
  data: typeof popularAirports | typeof popularStations
}

export default function PopularRoutes({ dictionary, type, data }: Props) {
  const addressFrom = useAddressStore((state) => state.addressFrom)

  function handleClick(routeData: (typeof data)[number]["routeData"]) {
    addressFrom.description === ""
      ? useAddressStore.setState({ addressFrom: routeData })
      : useAddressStore.setState({ addressTo: routeData })
  }

  return (
    <section className="layout-mx gap-x-12">
      {type === "airports" && (
        <div className="hidden min-w-[260px] lg:flex">
          <Image src="/undraw_airport.svg" alt="Rute aeroport" width={260} height={256} />
        </div>
      )}

      <div className="card-base flex">
        <div className="flex flex-col items-center">
          <h2 className="pb-4">
            {type === "airports"
              ? dictionary.home.popular_routes.title_airport
              : dictionary.home.popular_routes.title_station}
          </h2>
          <div className="flex flex-wrap justify-center">
            {data.map((obj) => (
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

      {type === "stations" && (
        <div className="hidden min-w-[370px] lg:flex">
          <Image
            src="/undraw_subway.svg"
            alt="Rute trenuri"
            className="h-[244px]"
            width={370}
            height={244}
          />
        </div>
      )}
    </section>
  )
}
