"use client"

import type { TaxiCompanies } from "@/lib/helpers/mongodb"
import {
  IconCashBanknote,
  IconClockHour4,
  IconMoon,
  IconPhoneCall,
  IconRoute2,
  IconSun,
  IconTrafficCone,
} from "@tabler/icons-react"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  mapDirections: google.maps.DirectionsResult
  companies: TaxiCompanies[]
}

type Averages = {
  dayPrice: number
  nightPrice: number
  premiumDayPrice?: number
  premiumNightPrice?: number
}

export default function PricesList({ mapDirections, companies }: Props) {
  const [taxiPrice, setTaxiPrice] = useState(2.69)

  useEffect(() => {
    console.log(companies)
  }, [companies])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.target.value)
    if (value >= 0 && value <= 99) {
      setTaxiPrice(value)
    }
  }

  function calculateTripPrice(distance?: number, duration?: number, durationWithTraffic?: number) {
    if (!distance || !duration || !durationWithTraffic) return

    let keys = ["dayPrice", "nightPrice", "premiumDayPrice", "premiumNightPrice"]
    let averages: { [key: string]: string } = {}

    keys.forEach((key) => {
      let ppk = companies.reduce((acc, company) => acc + (company[key as keyof Averages] || 0), 0) / companies.length
      if (!ppk) ppk = taxiPrice
      const idleTime = durationWithTraffic < duration ? 0 : durationWithTraffic - duration
      const tripPrice = ppk + ppk * (distance / 1000) + (idleTime / 3600) * ppk * 10
      const roundedTripPrice = tripPrice.toFixed(2)

      averages[key] = roundedTripPrice
    })

    return averages
  }

  return (
    <div className="flex w-full flex-col gap-y-8">
      {mapDirections &&
        mapDirections.routes.map((route) =>
          route.legs.map((leg, idx) => (
            <>
              <div key={idx} className="flex items-start justify-between space-x-4 text-lg">
                <div className="card-base flex w-full flex-col items-center justify-center gap-y-2 py-4 px-6">
                  <div className="flex items-center justify-center">
                    <IconCashBanknote />
                    <span className="pl-2">Pret total</span>
                  </div>

                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col items-end justify-center p-1">
                      {/* <IconFreeRights className="justify-self-start text-amber-400" /> */}

                      <p className="flex items-center justify-end">
                        <IconSun className="mx-1 px-1 text-amber-400" />
                        {
                          calculateTripPrice(leg.distance?.value, leg.duration?.value, leg.duration_in_traffic?.value)
                            ?.dayPrice
                        }
                        <span className="px-1">RON</span>
                      </p>
                      <p className="flex items-center justify-end">
                        <IconMoon className="mx-1 px-1 text-indigo-500" />
                        {
                          calculateTripPrice(leg.distance?.value, leg.duration?.value, leg.duration_in_traffic?.value)
                            ?.nightPrice
                        }
                        <span className="px-1">RON</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-center rounded-md bg-amber-500/10 p-1">
                      {/* <IconPremiumRights className="mx-1 justify-self-start text-amber-400 " /> */}
                      <p className="flex items-center justify-end">
                        <IconSun className="mx-1 px-1 text-amber-400" />
                        {
                          calculateTripPrice(leg.distance?.value, leg.duration?.value, leg.duration_in_traffic?.value)
                            ?.premiumDayPrice
                        }
                        <span className="px-1">RON</span>
                      </p>
                      <p className="flex items-center justify-end">
                        <IconMoon className="mx-1 px-1 text-indigo-500" />
                        {
                          calculateTripPrice(leg.distance?.value, leg.duration?.value, leg.duration_in_traffic?.value)
                            ?.premiumNightPrice
                        }
                        <span className="px-1">RON</span>
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>

                <div className="card-base flex flex-col items-center justify-center gap-y-2 bg-teal-900 py-4 px-6">
                  <div className="flex items-center justify-center">
                    <IconRoute2 />
                    <span className="pl-2">Pret pe km</span>
                  </div>
                  {/* <p className="text-2xl font-semibold">{taxiPrice} RON</p> */}
                  <input
                    type="number"
                    className="input-base text-2xl font-semibold"
                    value={taxiPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className="card-base flex flex-col items-center justify-center gap-y-2 py-4 px-6">
                  <div className="flex items-center justify-center">
                    <IconRoute2 />
                    <span className="pl-2">Distanta</span>
                  </div>
                  <p className="text-2xl font-semibold">{leg.distance?.text}</p>
                </div>

                {leg.duration?.value && leg.duration_in_traffic?.value && (
                  <div className="card-base flex flex-col items-center justify-center gap-y-2 py-4 px-6">
                    <div className="flex items-center justify-center">
                      {leg.duration.value < leg.duration_in_traffic.value ? <IconClockHour4 /> : <IconTrafficCone />}
                      <span className="pl-2">Durata</span>
                    </div>
                    <p className="text-2xl font-semibold">
                      {leg.duration.value < leg.duration_in_traffic.value
                        ? leg.duration?.text
                        : leg.duration_in_traffic?.text}
                    </p>
                  </div>
                )}
              </div>

              <div key={idx} className="flex w-full items-center justify-between">
                <div className="card-base flex w-full flex-col items-start justify-center py-4 px-6">
                  <ul className="w-full divide-y divide-white/10">
                    {companies.length > 0 ? (
                      companies.map((company) => (
                        <li key={company.name} className="flex">
                          <div>
                            <Image
                              src="/taxi_driver_two_color.svg"
                              alt="Taxi driver"
                              width={406 * 0.4}
                              height={306 * 0.4}
                              priority
                            />
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <div className="space-y-2">
                              <h3>{company.name}</h3>
                              <p>{company.city}</p>
                            </div>
                            <h2 className="flex items-center justify-center gap-x-4">
                              <span>0{company.phoneNumber}</span>
                              <IconPhoneCall />
                            </h2>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p>No taxi found in this area</p>
                    )}
                  </ul>
                </div>
              </div>
            </>
          ))
        )}
    </div>
  )
}
