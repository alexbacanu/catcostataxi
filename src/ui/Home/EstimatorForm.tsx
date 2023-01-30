"use client"

import hashPair from "@/lib/helpers/hash"
import { Combobox, Transition } from "@headlessui/react"
import { IconMapPin } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Fragment, useEffect, useRef, useState } from "react"
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete"

export default function EstimatorForm() {
  const router = useRouter()

  const [selectedFrom, setSelectedFrom] = useState<google.maps.places.AutocompletePrediction>()
  const [selectedTo, setSelectedTo] = useState<google.maps.places.AutocompletePrediction>()

  const {
    init,
    ready,
    value,
    setValue,
    suggestions: { status, data, loading },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "ro" },
    },
    debounce: 400,
    initOnMount: false,
  })

  const initRef = useRef(init)

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = init
    }
  }, [init])

  const getLocality = async (location: google.maps.places.AutocompletePrediction) => {
    const result = await getDetails({ placeId: location.place_id })
    if (!result || typeof result === "string") return

    const area = result.address_components?.find((component) => component.types.includes("administrative_area_level_2"))
    if (area) return area.long_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const locality = result.address_components?.find((component) => component.types.includes("locality"))
    return locality?.long_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedFrom || !selectedTo) return

    const id = hashPair(selectedFrom.description, selectedTo.description)

    const tripData = {
      from: selectedFrom.description,
      fromLoc: await getLocality(selectedFrom),
      to: selectedTo.description,
      toLoc: await getLocality(selectedTo),
    }

    const result = await fetch("/api/submitRoute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        tripData,
      }),
    })

    // TODO: Make a proper error:
    if (result.ok) router.push(`/estimate/${id}`)
  }

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onReady={initRef.current}
      />
      <form className="w-full space-y-6 text-justify text-neutral-800 lg:w-auto" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <h1>Estimeaza cat costa un taxi</h1>
          <h3>Uber & mai multe servicii, afla instant cat costa o cursa de taxi!</h3>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-2 left-2">
            <span className="text-xs text-neutral-600">
              <IconMapPin />
            </span>
          </div>

          <Combobox
            value={selectedFrom}
            onChange={(address) => {
              clearSuggestions()
              return setSelectedFrom(address)
            }}
            disabled={!ready}
          >
            <Combobox.Input
              placeholder="De la"
              onChange={(event) => setValue(event.target.value)}
              displayValue={(data: google.maps.places.AutocompletePrediction) => {
                return data.description
              }}
              className="input-base"
            />

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="input-modal">
                {data.length === 0 && value !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4">Nici un rezultat</div>
                ) : loading ? (
                  <div className="relative cursor-default select-none py-2 px-4">Se incarca...</div>
                ) : value === "" ? (
                  <div className="relative cursor-default select-none py-2 px-4">Introduceti o locatie</div>
                ) : (
                  status === "OK" &&
                  data.map((location) => (
                    <Combobox.Option
                      key={location.place_id}
                      value={location}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active ? "bg-teal-900 text-white" : "text-neutral-800"
                        }`
                      }
                    >
                      {location.description}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </Combobox>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-2 left-2">
            <span className="text-xs text-neutral-600">
              <IconMapPin />
            </span>
          </div>

          <Combobox value={selectedTo} onChange={setSelectedTo} disabled={!ready}>
            <Combobox.Input
              placeholder="Pana la"
              onChange={(event) => setValue(event.target.value)}
              displayValue={(data: google.maps.places.AutocompletePrediction) => {
                return data.description
              }}
              className="input-base"
            />

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options className="input-modal">
                {data.length === 0 && value !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4">Nici un rezultat</div>
                ) : loading ? (
                  <div className="relative cursor-default select-none py-2 px-4">Se incarca...</div>
                ) : value === "" ? (
                  <div className="relative cursor-default select-none py-2 px-4">Introduceti o locatie</div>
                ) : (
                  status === "OK" &&
                  data.map((location) => (
                    <Combobox.Option
                      key={location.place_id}
                      value={location}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active ? "bg-teal-900 text-white" : "text-neutral-800"
                        }`
                      }
                    >
                      {location.description}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </Combobox>
        </div>

        <div className="flex items-center justify-center">
          <button type="submit" className="button-base button-primary">
            Calculeaza estimat
          </button>
        </div>
      </form>
    </>
  )
}
