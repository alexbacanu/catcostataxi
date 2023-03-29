"use client"

import { popularTrainStations } from "@/data/stations"
import useAddressStore from "@/stores/addressStore"
import Image from "next/image"

export default function PopularRoutesTrain() {
  const addressFrom = useAddressStore((state) => state.addressFrom)

  function handleClick(routeData: (typeof popularTrainStations)[number]["routeData"]) {
    addressFrom.description === ""
      ? useAddressStore.setState({ addressFrom: routeData })
      : useAddressStore.setState({ addressTo: routeData })
  }

  return (
    <section className="layout-mx gap-x-10">
      <div className="card-base flex">
        <div className="flex flex-col items-center">
          <h2 className="pb-4">Selectează rapid o gară</h2>
          <div className="flex flex-wrap justify-center">
            {popularTrainStations.map((obj) => (
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

      <Image
        src="/undraw_subway.svg"
        alt="Rute trenuri"
        className="hidden lg:flex"
        width={728 * 0.5}
        height={469 * 0.5}
      />
    </section>
  )
}
