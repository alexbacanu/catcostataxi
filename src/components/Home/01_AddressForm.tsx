"use client"

import hashPair from "@/helpers/hasher"
import { Combobox, Transition } from "@headlessui/react"
import { IconMapPin, IconSwitchVertical } from "@tabler/icons-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Fragment, useEffect, useRef, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete"

export default function AddressForm() {
  const [selectedFrom, setSelectedFrom] = useState<google.maps.places.AutocompletePrediction>({
    description: "",
    matched_substrings: [],
    place_id: "",
    structured_formatting: {
      main_text: "",
      main_text_matched_substrings: [],
      secondary_text: "",
    },
    terms: [],
    types: [],
  })
  const [selectedTo, setSelectedTo] = useState<google.maps.places.AutocompletePrediction>({
    description: "",
    matched_substrings: [],
    place_id: "",
    structured_formatting: {
      main_text: "",
      main_text_matched_substrings: [],
      secondary_text: "",
    },
    terms: [],
    types: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const [fromError, setFromError] = useState("")
  const [toError, setToError] = useState("")

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
  const router = useRouter()

  async function getLocality(location: google.maps.places.AutocompletePrediction): Promise<string | undefined> {
    const { place_id } = location
    const details: string | google.maps.places.PlaceResult = (await getDetails({ placeId: place_id })) ?? {}

    const address_components = typeof details === "string" ? undefined : details.address_components

    const findComponent = (type: string) => {
      const component = address_components?.find((component: google.maps.GeocoderAddressComponent) =>
        component.types.includes(type)
      )
      return component?.long_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }

    const areaLevel1 = findComponent("administrative_area_level_1")
    if (areaLevel1) return areaLevel1

    const areaLevel2 = findComponent("administrative_area_level_2")
    if (areaLevel2) return areaLevel2

    const locality = findComponent("locality")
    if (locality) return locality

    return findComponent("country")
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedFrom.description) {
      setFromError("Campul 'De la' este obligatoriu")
      return
    } else {
      setFromError("")
    }

    if (!selectedTo.description) {
      setToError("Campul 'Pana la' este obligatoriu")
      return
    } else {
      setToError("")
    }

    setIsLoading(true)

    const data = {
      id: hashPair(selectedFrom.description, selectedTo.description),
      tripData: {
        fromAddress: selectedFrom.description,
        fromLoc: await getLocality(selectedFrom),
        toAddress: selectedTo.description,
        toLoc: await getLocality(selectedTo),
      },
    }

    try {
      const response = await fetch("/api/submitRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.error(response.status, response.statusText)
        setIsLoading(false)
        throw new Error("Network response was not ok.")
      }

      router.push(`/directions/${data.id}`)
      setIsLoading(false)
    } catch (error) {
      toast.error("A aparut o eroare, va rugam incercati mai tarziu.")
      console.error("Error:", error)
    }
  }

  const handleSwitch = () => {
    if (!selectedTo.description || !selectedFrom.description) return
    setSelectedFrom(selectedTo)
    setSelectedTo(selectedFrom)
  }

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = init
    }
  }, [init])

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onReady={initRef.current}
      />
      <section className="bg-gradient-to-b from-amber-400 to-amber-500 text-neutral-800 transition">
        <form className="layout-mx" onSubmit={onSubmit}>
          <div className="mx-auto space-y-4 md:mx-0">
            <h1>Estimeaza costul unei curse de taxi</h1>

            {fromInput()}
            {toInput()}

            <div className="flex justify-center">
              <button
                type="submit"
                className="button-base button-primary flex gap-x-2 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Calculeaza estimat
                {isLoading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 animate-spin fill-amber-500 text-gray-200 dark:text-gray-400"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  ""
                )}
              </button>
            </div>
          </div>

          <Image
            src="/undraw_right_direction.svg"
            alt="Estimate taxi cost"
            className="hidden h-80 w-auto md:flex md:h-60 lg:h-80"
            width={630 * 0.6}
            height={532 * 0.6}
            priority
          />
          <Toaster />
        </form>
      </section>
    </>
  )

  function fromInput() {
    return (
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
          <div className="flex gap-x-2">
            <Combobox.Input
              placeholder="De la"
              onChange={(event) => setValue(event.target.value)}
              displayValue={(data: google.maps.places.AutocompletePrediction) => {
                return data.description
              }}
              className={`${fromError ? "border border-red-500" : "border-0"} input-base`}
            />

            <div
              className="input-base flex w-10 items-center justify-center py-0 px-2 hover:cursor-pointer"
              onClick={handleSwitch}
            >
              <IconSwitchVertical />
              {/* <IconArrowsUpDown /> */}
            </div>
          </div>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
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
    )
  }

  function toInput() {
    return (
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
            className={`${toError ? "border border-red-500" : ""} input-base`}
          />

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
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
    )
  }
}
