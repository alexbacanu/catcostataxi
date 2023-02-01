"use client"

import type { TaxiCompanies } from "@/lib/helpers/mongodb"
import { Switch } from "@headlessui/react"
import {
  IconClockHour4,
  IconCurrencyDollar,
  IconList,
  IconMoon,
  IconPhone,
  IconRoute2,
  IconSun,
  IconTrafficCone,
} from "@tabler/icons-react"
import Image from "next/image"
import { useState } from "react"

type Props = {
  mapDirections: google.maps.DirectionsResult
  companies: TaxiCompanies[]
}

export default function PricesList({ mapDirections, companies }: Props) {
  function handleChange(field: keyof typeof priceData) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value)

      if (value >= 0 && value <= 99 && /^\d*(\.\d{0,2})?$/.test(value)) {
        setPriceData({
          ...priceData,
          [field]: value,
        })
      }
    }
  }

  function calculatePriceData(companies: TaxiCompanies[]) {
    return companies.length
      ? companies.reduce(
          (prev, curr) => ({
            dayPrice: (prev.dayPrice + curr.dayPrice) / 2,
            nightPrice: (prev.nightPrice + curr.nightPrice) / 2,
            premiumDayPrice: (prev.premiumDayPrice + curr.premiumDayPrice) / 2,
            premiumNightPrice: (prev.premiumNightPrice + curr.premiumNightPrice) / 2,
          }),
          { dayPrice: 0, nightPrice: 0, premiumDayPrice: 0, premiumNightPrice: 0 }
        )
      : {
          dayPrice: 2.69,
          nightPrice: 2.99,
          premiumDayPrice: 3.49,
          premiumNightPrice: 3.99,
        }
  }

  const [priceData, setPriceData] = useState(calculatePriceData(companies))

  function calculateTotalPrice(
    priceType: keyof typeof priceData,
    distance?: number,
    duration?: number,
    durationInTraffic?: number
  ) {
    if (!distance || !duration || !durationInTraffic) return 0

    const basePrice = priceData[priceType]
    const extraTime = durationInTraffic < duration ? 0 : durationInTraffic - duration
    const tripPrice = basePrice + basePrice * (distance / 1000) + (extraTime / 3600) * basePrice * 10

    return tripPrice
  }

  return (
    <div className="flex w-full flex-col gap-y-8">
      {mapDirections &&
        mapDirections.routes.map((route) => (
          <>
            {route.legs.map((leg, idx) => (
              <div key={idx} className="flex flex-col gap-y-4 text-lg">
                {StatsCard(leg)}
                {PriceCard(handleChange, priceData, calculateTotalPrice, leg)}
                {TaxiList(idx, companies)}
              </div>
            ))}
          </>
        ))}
    </div>
  )
}

function StatsCard(leg: google.maps.DirectionsLeg) {
  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      {/* Distance */}
      <div className="card-base flex w-full flex-col items-center justify-start gap-y-2 py-2 px-4">
        <div className="flex items-center">
          <IconRoute2 />
          <span className="pl-2">Distanta</span>
        </div>
        <p className="text-lg font-semibold text-amber-400 sm:text-xl">{leg.distance?.text}</p>
      </div>

      {/* Duration */}
      {leg.duration?.value && leg.duration_in_traffic?.value && (
        <div className="card-base flex w-full flex-col items-center justify-start gap-y-2 py-2 px-4">
          <div className="flex items-center">
            {leg.duration.value < leg.duration_in_traffic.value ? <IconClockHour4 /> : <IconTrafficCone />}
            <span className="pl-2">Durata</span>
          </div>
          <p className="text-lg font-semibold text-amber-400 sm:text-xl">
            {leg.duration.value < leg.duration_in_traffic.value ? leg.duration?.text : leg.duration_in_traffic?.text}
          </p>
        </div>
      )}
    </div>
  )
}

function PriceCard(
  handleChange: (field: "dayPrice" | "nightPrice" | "premiumDayPrice" | "premiumNightPrice") => {
    (e: React.ChangeEvent<HTMLInputElement>): void
  },
  priceData: { dayPrice: number; nightPrice: number; premiumDayPrice: number; premiumNightPrice: number },
  calculateTotalPrice: (
    priceType: "dayPrice" | "nightPrice" | "premiumDayPrice" | "premiumNightPrice",
    distance?: number,
    duration?: number,
    durationInTraffic?: number
  ) => number,
  leg: google.maps.DirectionsLeg
) {
  const [enabled, setEnabled] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  return (
    <div className="card-base flex w-full flex-col justify-between gap-y-2 py-4 px-6">
      <div className="flex justify-between">
        {/* Title */}
        <div className="flex items-center">
          <IconCurrencyDollar />
          <span className="pl-2">Estimat cursa</span>
        </div>

        {/* Custom values */}
        <div className="flex flex-auto items-center justify-end">
          <button onClick={() => setIsDisabled(!isDisabled)} className="rounded-md bg-white/10 px-2 py-1 text-xs">
            Modifica
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 my-1 w-[1px] grow-0 bg-white/10"></div>

        {/* Toggle */}
        <div className="flex items-center">
          <IconSun className="h-4 w-4 text-amber-400" />
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-indigo-500" : "bg-white/10"
            } relative mx-1 inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 rounded-full bg-white transition`}
            />
          </Switch>
          <IconMoon className="h-4 w-4 text-indigo-500" />
        </div>
      </div>
      <div className="flex flex-col justify-start lg:flex-row">
        {/* Left */}
        <div className="flex w-full items-center justify-between">
          {/* Image */}
          <div className="relative flex shrink-0 items-center justify-center p-2">
            <Image src="/yellow.png" alt="Standard taxi" width={569 * 0.15} height={361 * 0.15} priority />
            <div className="absolute bottom-0 rounded-md bg-white/20 px-2 py-1 text-center text-xs font-medium text-white shadow-lg backdrop-blur-[6px]">
              Standard
            </div>
          </div>

          {/* Table */}
          <table className=" text-left">
            <tbody>
              <tr>
                <th className="text-right font-semibold text-amber-400">
                  <input
                    value={enabled ? priceData.nightPrice : priceData.dayPrice}
                    type="number"
                    step={0.01}
                    onChange={enabled ? handleChange("nightPrice") : handleChange("dayPrice")}
                    className="w-full rounded-lg border-0 bg-white/20 p-1 text-right text-sm ring-1 ring-neutral-800/20 transition placeholder:text-neutral-600 hover:bg-white/40 focus:bg-white/40 focus:ring-[1.5px] focus:ring-neutral-800/80 disabled:bg-transparent disabled:ring-0"
                    disabled={isDisabled}
                  />
                </th>

                <td scope="row" className="text-xs">
                  (lei/km)
                </td>
              </tr>

              <tr>
                <th className="text-right font-semibold text-amber-400">
                  <span>
                    {calculateTotalPrice(
                      enabled ? "nightPrice" : "dayPrice",
                      leg.distance?.value,
                      leg.duration?.value,
                      leg.duration_in_traffic?.value
                    ).toFixed(2)}
                  </span>
                </th>

                <td scope="row" className="text-xs">
                  (lei/total)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right */}
        <div className="flex w-full items-center justify-between">
          {/* Image */}
          <div className="relative flex shrink-0 items-center justify-center p-2">
            <Image src="/black.png" alt="Premium taxi" width={569 * 0.15} height={361 * 0.15} priority />
            <div className="absolute bottom-0 rounded-md bg-indigo-400/30 px-2 py-1 text-center text-xs font-medium text-white shadow-lg backdrop-blur-[6px]">
              Premium
            </div>
          </div>

          {/* Table */}
          <table className="text-left">
            <tbody>
              <tr>
                <th className="text-right font-semibold text-amber-400">
                  <input
                    value={enabled ? priceData.premiumNightPrice : priceData.premiumDayPrice}
                    type="number"
                    step={0.01}
                    onChange={enabled ? handleChange("premiumNightPrice") : handleChange("premiumDayPrice")}
                    className="w-full rounded-lg border-0 bg-white/20 p-1 text-right text-sm ring-1 ring-neutral-800/20 transition placeholder:text-neutral-600 hover:bg-white/40 focus:bg-white/40 focus:ring-[1.5px] focus:ring-neutral-800/80 disabled:bg-transparent disabled:ring-0"
                    disabled={isDisabled}
                  />
                </th>

                <td scope="row" className="text-xs">
                  (lei/km)
                </td>
              </tr>

              <tr>
                <th className="text-right font-semibold text-amber-400">
                  <span>
                    {calculateTotalPrice(
                      enabled ? "premiumNightPrice" : "premiumDayPrice",
                      leg.distance?.value,
                      leg.duration?.value,
                      leg.duration_in_traffic?.value
                    ).toFixed(2)}
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
  )
}

function TaxiList(idx: number, companies: TaxiCompanies[]) {
  return (
    <div key={idx} className="card-base flex w-full flex-col gap-y-2 py-4 px-6">
      {/* Title */}
      <div className="flex items-center">
        <IconList />
        <span className="pl-2">Lista</span>
      </div>

      {/* List */}
      <div className="divide-y divide-white/10">
        {companies.length > 0 ? (
          companies.map((company) => (
            <div key={company.name} className="flex items-center gap-x-2 py-1">
              <div className="hidden lg:block">
                <Image src="/taxi_driver_two_color.svg" alt="Taxi driver" width={406 * 0.2} height={306 * 0.2} />
              </div>
              <div className="flex-auto">
                <div className="whitespace-nowrap capitalize tracking-tighter">{company.name}</div>
                <div className="text-sm italic">
                  @<span className="pl-1">{company.city}</span>
                </div>
              </div>
              <button className="button-base button-primary flex">
                <span className="pr-1">0{company.phoneNumber}</span>
                {/* <span className="pr-1">0755555555</span> */}
                <IconPhone />
              </button>
            </div>
          ))
        ) : (
          <div>Nici un taxi gasit in aceasta zona</div>
        )}
      </div>
    </div>
  )
}
