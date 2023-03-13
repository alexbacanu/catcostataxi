"use client"

import type { Company } from "@/helpers/mongo"
import useDirectionsStore from "@/stores/directionsStore"
import { Switch } from "@headlessui/react"
import { IconClockHour4, IconCurrencyDollar, IconMoon, IconRoute2, IconSun, IconTrafficCone } from "@tabler/icons-react"
import Image from "next/image"
import { useState } from "react"

type Props = {
  companies?: Company[]
}

export default function EstimateCard({ companies }: Props) {
  const [nightToggle, setNightToggle] = useState(false)
  const [modifyToggle, setModifyToggle] = useState(false)
  const [priceData, setPriceData] = useState(calculatePriceData(companies))

  const mapRoutes = useDirectionsStore((state) => state.mapDirections.routes)
  if (!mapRoutes[0]) return <LoadingRoute />

  const { distance, duration, duration_in_traffic } = mapRoutes[0]?.legs[0] || {}
  if (!distance || !duration || !duration_in_traffic) return <LoadingRoute />

  function handleChange(priceType: keyof typeof priceData) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      const pattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/

      if (!pattern.test(value)) return

      if (value === "") {
        setPriceData({
          ...priceData,
          [priceType]: 0,
        })
      }

      setPriceData({
        ...priceData,
        [priceType]: Math.min(Math.max(0, parseFloat(value)), 99),
      })
    }
  }

  function calculatePriceData(companies?: Company[]) {
    const initialValue = {
      dayPrice: 0,
      nightPrice: 0,
      dayPricePlus: 0,
      nightPricePlus: 0,
    }

    const defaultValue = {
      dayPrice: 2.69,
      nightPrice: 2.99,
      dayPricePlus: 3.49,
      nightPricePlus: 3.99,
    }

    if (!companies) return defaultValue
    if (companies && companies.length === 0) return defaultValue

    return companies.reduce((prev, curr) => {
      return {
        dayPrice: Math.round((prev.dayPrice + curr.dayPrice / companies.length) * 100) / 100,
        nightPrice: Math.round((prev.nightPrice + curr.nightPrice / companies.length) * 100) / 100,
        dayPricePlus: Math.round((prev.dayPricePlus + curr.dayPricePlus / companies.length) * 100) / 100,
        nightPricePlus: Math.round((prev.nightPricePlus + curr.nightPricePlus / companies.length) * 100) / 100,
      }
    }, initialValue)
  }

  function totalPrice(priceType: keyof typeof priceData) {
    if (!distance || !duration || !duration_in_traffic) return 0

    const basePrice = priceData[priceType]
    const extraTime = duration_in_traffic.value < duration.value ? 0 : duration_in_traffic.value - duration.value
    const tripPrice = basePrice + basePrice * (distance.value / 1000) + (extraTime / 3600) * basePrice * 10

    return tripPrice
  }

  return (
    <section className="layout-mx flex flex-col gap-y-6 pt-0">
      <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
        {/* Distance Card */}
        <div className="card-base flex w-full flex-col items-center justify-start gap-y-2 py-4 px-6">
          <div className="flex items-center">
            <IconRoute2 />
            <span className="pl-2">Distanta</span>
          </div>
          <p className="text-lg font-semibold text-amber-400 sm:text-xl">{distance.text}</p>
        </div>

        {/* Duration Card */}
        <div className="card-base flex w-full flex-col items-center justify-start gap-y-2 py-4 px-6">
          <div className="flex items-center">
            {duration.value > duration_in_traffic.value ? <IconTrafficCone /> : <IconClockHour4 />}
            <span className="pl-2">Durata</span>
          </div>
          <p className="text-lg font-semibold text-amber-400 sm:text-xl">
            {duration.value > duration_in_traffic.value ? duration_in_traffic.text : duration.text}
          </p>
        </div>
      </div>

      {/* Ride Card */}
      <div className="card-base flex w-full flex-col justify-between gap-y-2 py-4 px-6">
        {/* Top */}
        <div className="flex justify-between">
          {/* Title */}
          <div className="flex items-center">
            <IconCurrencyDollar />
            <span className="pl-2">Cursa</span>
          </div>

          {/* Custom */}
          <div className="flex flex-auto items-center justify-end">
            <button onClick={() => setModifyToggle(!modifyToggle)} className="rounded-md bg-white/10 px-2 py-1 text-xs">
              {modifyToggle ? "Salveaza" : "Modifica"}
            </button>
          </div>

          {/* Divider */}
          <div className="mx-4 my-1 w-[1px] grow-0 bg-white/10"></div>

          {/* Toggle */}
          <div className="flex items-center">
            <IconSun className="h-4 w-4 text-amber-400" />
            <Switch
              checked={nightToggle}
              onChange={setNightToggle}
              className={`${
                nightToggle ? "bg-indigo-500" : "bg-white/10"
              } relative mx-1 inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  nightToggle ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 rounded-full bg-white transition`}
              />
            </Switch>
            <IconMoon className="h-4 w-4 text-indigo-500" />
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-x-8 gap-y-4 sm:flex-row">
          {/* Left */}
          <div className="flex w-full items-center justify-start gap-x-6">
            {/* Image */}
            <div className="relative flex shrink-0 items-center justify-center p-2">
              <Image src="/taxi-yellow.png" alt="Standard taxi" width={569 * 0.15} height={361 * 0.15} priority />
              <div className="absolute bottom-0 rounded-md bg-white/20 px-2 py-1 text-center text-xs font-medium text-white shadow-lg backdrop-blur-[6px]">
                Standard
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="w-full text-right font-semibold text-amber-400">
                    {modifyToggle ? (
                      <input
                        value={nightToggle ? priceData.nightPrice : priceData.dayPrice}
                        type="number"
                        step={0.01}
                        onChange={nightToggle ? handleChange("nightPrice") : handleChange("dayPrice")}
                        className="w-full rounded-lg bg-white/10 p-1 px-2 text-right"
                      />
                    ) : (
                      <div className="w-full rounded-lg p-1 px-2 text-right">
                        {nightToggle ? priceData.nightPrice : priceData.dayPrice}
                      </div>
                    )}
                  </th>

                  <td scope="row" className="text-xs">
                    (lei/km)
                  </td>
                </tr>

                <tr>
                  <th className="text-right font-semibold text-amber-400">
                    <span className="p-1 px-2">{totalPrice(nightToggle ? "nightPrice" : "dayPrice").toFixed(2)}</span>
                  </th>

                  <td scope="row" className="text-xs">
                    (lei/total)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right */}
          <div className="flex w-full items-center justify-start gap-x-6">
            {/* Image */}
            <div className="relative flex shrink-0 items-center justify-center p-2">
              <Image src="/taxi-black.png" alt="Premium taxi" width={569 * 0.15} height={361 * 0.15} priority />
              <div className="absolute bottom-0 rounded-md bg-indigo-400/30 px-2 py-1 text-center text-xs font-medium text-white shadow-lg backdrop-blur-[6px]">
                Premium
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="w-full text-right font-semibold text-amber-400">
                    {modifyToggle ? (
                      <input
                        value={nightToggle ? priceData.nightPricePlus : priceData.dayPricePlus}
                        type="number"
                        step={0.01}
                        onChange={nightToggle ? handleChange("nightPricePlus") : handleChange("dayPricePlus")}
                        className="w-full rounded-lg bg-white/10 p-1 px-2 text-right"
                      />
                    ) : (
                      <div className="w-full rounded-lg p-1 px-2 text-right">
                        {nightToggle ? priceData.nightPricePlus : priceData.dayPricePlus}
                      </div>
                    )}
                  </th>

                  <td scope="row" className="text-xs">
                    (lei/km)
                  </td>
                </tr>

                <tr>
                  <th className="text-right font-semibold text-amber-400">
                    <span className="p-1 px-2">
                      {totalPrice(nightToggle ? "nightPricePlus" : "dayPricePlus").toFixed(2)}
                    </span>
                  </th>

                  <td scope="row" className="text-xs">
                    (lei/total)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

function LoadingRoute() {
  return (
    <section className="layout-mx flex flex-col gap-y-6 pt-0">
      <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
        {/* Distance Card */}
        <div className="card-base flex w-full flex-col items-center justify-start gap-y-2 py-4 px-6">
          <div className="flex items-center">
            <IconRoute2 />
            <span className="pl-2">Distanta</span>
          </div>
          <p className="text-lg font-semibold text-amber-400 sm:text-xl">Se incarca...</p>
        </div>

        {/* Duration Card */}
        <div className="card-base flex w-full flex-col items-center justify-start gap-y-2 py-4 px-6">
          <div className="flex items-center">
            <IconClockHour4 />
            <span className="pl-2">Durata</span>
          </div>
          <p className="text-lg font-semibold text-amber-400 sm:text-xl">Se incarca...</p>
        </div>
      </div>

      {/* Ride Card */}
      <div className="card-base flex w-full flex-col justify-between gap-y-2 py-4 px-6">
        {/* Top */}
        <div className="flex justify-between">
          {/* Title */}
          <div className="flex items-center">
            <IconCurrencyDollar />
            <span className="pl-2">Cursa</span>
          </div>

          {/* Custom */}
          <div className="flex flex-auto items-center justify-end">
            <button className="rounded-md bg-white/10 px-2 py-1 text-xs">Modifica</button>
          </div>

          {/* Divider */}
          <div className="mx-4 my-1 w-[1px] grow-0 bg-white/10"></div>

          {/* Toggle */}
          <div className="flex items-center">
            <IconSun className="h-4 w-4 text-amber-400" />
            <Switch className={`${"bg-white/10"} relative mx-1 inline-flex h-6 w-11 items-center rounded-full`}>
              <span className="sr-only">Enable notifications</span>
              <span className={`${"translate-x-1"} inline-block h-4 w-4 rounded-full bg-white transition`} />
            </Switch>
            <IconMoon className="h-4 w-4 text-indigo-500" />
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-x-8 gap-y-4 sm:flex-row">
          {/* Left */}
          <div className="flex w-full items-center justify-start gap-x-6">
            {/* Image */}
            <div className="relative flex shrink-0 items-center justify-center p-2">
              <Image src="/taxi-yellow.png" alt="Standard taxi" width={569 * 0.15} height={361 * 0.15} priority />
              <div className="absolute bottom-0 rounded-md bg-white/20 px-2 py-1 text-center text-xs font-medium text-white shadow-lg backdrop-blur-[6px]">
                Standard
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="w-full text-right font-semibold text-amber-400">
                    <div className="w-full rounded-lg p-1 px-2 text-right">0</div>
                  </th>

                  <td scope="row" className="text-xs">
                    (lei/km)
                  </td>
                </tr>

                <tr>
                  <th className="text-right font-semibold text-amber-400">
                    <span className="p-1 px-2">0</span>
                  </th>

                  <td scope="row" className="text-xs">
                    (lei/total)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right */}
          <div className="flex w-full items-center justify-start gap-x-6">
            {/* Image */}
            <div className="relative flex shrink-0 items-center justify-center p-2">
              <Image src="/taxi-black.png" alt="Premium taxi" width={569 * 0.15} height={361 * 0.15} priority />
              <div className="absolute bottom-0 rounded-md bg-indigo-400/30 px-2 py-1 text-center text-xs font-medium text-white shadow-lg backdrop-blur-[6px]">
                Premium
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <th className="w-full text-right font-semibold text-amber-400">
                    <div className="w-full rounded-lg p-1 px-2 text-right">0</div>
                  </th>

                  <td scope="row" className="text-xs">
                    (lei/km)
                  </td>
                </tr>

                <tr>
                  <th className="text-right font-semibold text-amber-400">
                    <span className="p-1 px-2">0</span>
                  </th>

                  <td scope="row" className="text-xs">
                    (lei/total)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
