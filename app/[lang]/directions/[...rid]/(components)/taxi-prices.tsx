"use client"

import { Listbox, Transition, Switch } from "@headlessui/react"
import {
  IconCurrencyDollar,
  IconSelector,
  IconSun,
  IconMoon,
  IconRoute2,
  IconTrafficCone,
  IconClockHour4,
} from "@tabler/icons-react"
import Image from "next/image"
import { useState, Fragment } from "react"
import toast from "react-hot-toast"
import { Dictionary } from "@/lib/locale/get-dictionary"
import useLocationStore from "@/lib/stores/location-store"
import useRoutesStore from "@/lib/stores/route-store"
import type { Company } from "@/lib/helpers/mongo"

type Props = {
  dictionary: Dictionary
  initialCompanies?: Company[]
  initialCity?: string
  availableCities?: string[]
}

export default function TaxiPrices({
  dictionary,
  initialCompanies,
  initialCity,
  availableCities,
}: Props) {
  const [nightToggle, setNightToggle] = useState(false)
  const [modifyToggle, setModifyToggle] = useState(false)

  const locationArray = useLocationStore((state) => state.location)
  const companiesArray = useLocationStore((state) => state.companies)

  const selectedCity = locationArray.length !== 0 ? locationArray : initialCity
  const fetchedCompanies = companiesArray.length !== 0 ? companiesArray : initialCompanies

  const [priceData, setPriceData] = useState(calculatePriceData(fetchedCompanies))

  const mapRoutes = useRoutesStore((state) => state.mapDirections.routes)
  if (!mapRoutes[0]) {
    return (
      <section className="layout-mx flex flex-col">
        {dictionary.directions.taxi_prices.loading}
      </section>
    )
  }

  const { distance, duration, duration_in_traffic } = mapRoutes[0]?.legs[0] || {}
  if (!distance || !duration || !duration_in_traffic) {
    return (
      <section className="layout-mx flex flex-col">
        {dictionary.directions.taxi_prices.loading}
      </section>
    )
  }

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
      dayPrice: 0,
      nightPrice: 0,
      dayPricePlus: 0,
      nightPricePlus: 0,
    }

    if (!companies) return defaultValue
    if (companies && companies.length === 0) return defaultValue

    return companies.reduce((prev, curr) => {
      return {
        dayPrice: Math.round((prev.dayPrice + curr.dayPrice / companies.length) * 100) / 100,
        nightPrice: Math.round((prev.nightPrice + curr.nightPrice / companies.length) * 100) / 100,
        dayPricePlus:
          Math.round((prev.dayPricePlus + curr.dayPricePlus / companies.length) * 100) / 100,
        nightPricePlus:
          Math.round((prev.nightPricePlus + curr.nightPricePlus / companies.length) * 100) / 100,
      }
    }, initialValue)
  }
  async function onInputChange(location: string) {
    useLocationStore.setState({ location })

    try {
      const response = await fetch("/api/getCompanies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location }),
      })

      if (!response.ok) {
        console.error(response.status, response.statusText)
        throw new Error("Network response was not ok.")
      }

      const companies = await response.json()
      useLocationStore.setState({ companies })
      setPriceData(calculatePriceData(companies))
    } catch (error) {
      toast.error(dictionary.directions.taxi_prices.toast_error)
      console.error("Error:", error)
    }
  }

  function totalPrice(priceType: keyof typeof priceData) {
    if (!distance || !duration || !duration_in_traffic) return 0

    const basePrice = priceData[priceType]
    const extraTime =
      duration_in_traffic.value < duration.value ? 0 : duration_in_traffic.value - duration.value
    const tripPrice =
      basePrice + basePrice * (distance.value / 1000) + (extraTime / 3600) * basePrice * 10

    return tripPrice
  }

  function capitalize(location: string | string[]): string {
    let locationString: string

    if (Array.isArray(location)) {
      locationString = location[0]
    } else {
      locationString = location
    }

    return locationString.replace(/\b\w/g, (match) => match.toUpperCase())
  }

  return (
    <section className="layout-mx">
      <div className="flex w-full flex-col justify-between gap-x-8 gap-y-12 lg:flex-row">
        <div className="card-base grow">
          {/* Top */}
          <div className="flex flex-col justify-between gap-x-4 sm:flex-row">
            {/* Left */}
            <div className="flex w-full items-center gap-x-4">
              {/* Title */}
              <div className="flex items-center">
                <IconCurrencyDollar />
                <span className="pl-2">{dictionary.directions.taxi_prices.ride}</span>
              </div>

              {/* Select city */}
              {availableCities && (
                <Listbox value={selectedCity} onChange={(location) => onInputChange(location)}>
                  <div className="relative z-30 grow items-center">
                    <Listbox.Button className="peer relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                      <span className="block truncate text-neutral-800">
                        {selectedCity
                          ? capitalize(selectedCity)
                          : dictionary.directions.taxi_prices.select_city}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <IconSelector className="h-5 w-5 text-neutral-500" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <div
                      role="tooltip"
                      className="invisible absolute top-full z-40 my-2 overflow-auto rounded-md bg-white/80 p-1 text-sm opacity-0 shadow-lg ring-1 ring-black/5 backdrop-blur-md transition-all focus:outline-none peer-hover:visible peer-hover:opacity-100"
                    >
                      <div className="cursor-default select-none p-1 text-neutral-800">
                        {dictionary.directions.taxi_prices.tooltip_select_city}
                      </div>
                    </div>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                        {availableCities.map((loc) => (
                          <Listbox.Option
                            key={loc}
                            className={({ active }) =>
                              `relative cursor-default select-none py-1 pl-3 pr-4 ${
                                active ? "bg-amber-100 text-amber-600" : "text-neutral-800"
                              }`
                            }
                            value={loc}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-bold" : "font-normal"
                                  }`}
                                >
                                  {capitalize(loc)}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              )}

              {/* Empty div */}
              {/* <div className="hidden sm:block sm:grow"></div> */}
            </div>

            {/* Right */}
            <div className="flex justify-center gap-x-4 py-4 sm:py-0">
              {/* Toggle */}
              <div className="relative flex items-center justify-end">
                <button
                  onClick={() => setModifyToggle(!modifyToggle)}
                  className="peer rounded-md bg-black/10 px-2 py-1 text-xs ring-1 ring-neutral-800/20 hover:bg-black/5 dark:bg-white/10 dark:ring-neutral-200/20 dark:hover:bg-white/5"
                >
                  {modifyToggle
                    ? dictionary.directions.taxi_prices.save
                    : dictionary.directions.taxi_prices.modify}
                </button>
                <div
                  role="tooltip"
                  className="invisible absolute -inset-x-full top-full z-10 my-2 overflow-auto rounded-md bg-white/80 p-1 text-sm opacity-0 shadow-lg ring-1 ring-black/5 backdrop-blur-md transition-all focus:outline-none peer-hover:visible peer-hover:opacity-100"
                >
                  <div className="cursor-default select-none p-1 text-neutral-800">
                    {dictionary.directions.taxi_prices.tooltip_modify}
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="my-1 w-[1px] bg-black/10 dark:bg-white/10"></div>

              {/* Night price */}
              <div className="relative flex items-center">
                <IconSun className="h-4 w-4 font-bold text-amber-500 dark:font-semibold dark:text-amber-400" />
                <Switch
                  checked={nightToggle}
                  onChange={setNightToggle}
                  className={`${
                    nightToggle
                      ? "bg-indigo-500"
                      : "bg-black/10 hover:bg-black/5 dark:bg-white/10 dark:hover:bg-white/5"
                  } peer relative mx-1 inline-flex h-6 w-11 items-center rounded-full ring-1 ring-neutral-800/20 dark:ring-neutral-200/20`}
                >
                  <span className="sr-only">{dictionary.directions.taxi_prices.change_price}</span>
                  <span
                    className={`${
                      nightToggle ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 rounded-full bg-white ring-1 ring-neutral-800/20 transition dark:ring-neutral-200/20`}
                  />
                </Switch>
                <IconMoon className="h-4 w-4 text-indigo-500" />
                <div
                  role="tooltip"
                  className="invisible absolute -inset-x-full top-full z-10 my-2 overflow-auto rounded-md bg-white/80 p-1 text-sm opacity-0 shadow-lg ring-1 ring-black/5 backdrop-blur-md transition-all focus:outline-none peer-hover:visible peer-hover:opacity-100"
                >
                  <div className="cursor-default select-none p-1 text-neutral-800">
                    {dictionary.directions.taxi_prices.tooltip_change_price}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex w-full items-center gap-x-4 py-4">
            {/* Image */}
            <div className="shrink-0">
              <div className="relative">
                <Image src="/taxi-yellow.png" alt="Standard taxi" width={113} height={72} />
                <div className="absolute bottom-0 rounded-md bg-black/40 px-2 py-1 text-center text-xs font-medium text-white shadow-lg backdrop-blur-[6px] dark:bg-white/20">
                  Taxi
                </div>
              </div>
            </div>

            {fetchedCompanies?.length === 0 ? (
              <div className="flex items-center gap-x-2 py-1 italic">
                {dictionary.directions.taxi_prices.not_enough_info}
              </div>
            ) : (
              <div className="grid grid-cols-2 items-center gap-2">
                <div className="whitespace-nowrap">Per km (lei):</div>
                <div
                  className={`${
                    nightToggle ? "text-indigo-500" : "text-amber-500 dark:text-amber-400"
                  } text-lg font-bold dark:font-semibold`}
                >
                  {modifyToggle ? (
                    <input
                      value={nightToggle ? priceData.nightPrice : priceData.dayPrice}
                      type="number"
                      step={0.01}
                      onChange={nightToggle ? handleChange("nightPrice") : handleChange("dayPrice")}
                      className="w-full rounded-lg bg-black/5 px-2 ring-1 ring-neutral-800/20 dark:bg-white/10 dark:ring-neutral-200/20 dark:hover:bg-white/5"
                    />
                  ) : (
                    <div className="px-2">
                      {nightToggle ? priceData.nightPrice : priceData.dayPrice}
                    </div>
                  )}
                </div>
                <div className="whitespace-nowrap">Total (lei):</div>
                <div
                  className={`${
                    nightToggle ? "text-indigo-500" : "text-amber-500 dark:text-amber-400"
                  } px-2 text-lg font-bold dark:font-semibold`}
                >
                  {totalPrice(nightToggle ? "nightPrice" : "dayPrice").toFixed(2)}
                </div>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p className="pt-2 text-xs italic">{dictionary.directions.taxi_prices.disclaimer}</p>
        </div>
        <div className="flex min-w-[28%] flex-row gap-8 lg:flex-col">
          <div className="card-base flex grow flex-col items-center justify-center gap-x-2 sm:flex-row sm:justify-between">
            {/* --- */}
            <div className="flex items-center">
              <IconRoute2 />
              <span className="pl-2">{dictionary.directions.taxi_prices.distance}</span>
            </div>
            <p className="text-lg font-bold text-amber-500 dark:font-semibold dark:text-amber-400 sm:text-xl">
              {distance.text}
            </p>
            {/* --- */}
          </div>
          <div className="card-base flex grow flex-col items-center justify-center gap-x-2 sm:flex-row sm:justify-between">
            {/* --- */}
            <div className="flex items-center">
              {duration.value > duration_in_traffic.value ? (
                <IconTrafficCone />
              ) : (
                <IconClockHour4 />
              )}
              <span className="pl-2">{dictionary.directions.taxi_prices.duration}</span>
            </div>
            <p className="text-lg font-bold text-amber-500 dark:font-semibold dark:text-amber-400 sm:text-xl">
              {duration.value > duration_in_traffic.value
                ? duration_in_traffic.text
                : duration.text}
            </p>
            {/* --- */}
          </div>
        </div>
      </div>
    </section>
  )
}
