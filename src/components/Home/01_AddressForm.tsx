"use client"

import LoadingAnimation from "@/components/(helpers)/LoadingAnimation"
import hashPair from "@/helpers/hasher"
import useAddressStore from "@/stores/addressStore"
import { Combobox, Transition } from "@headlessui/react"
import { IconMapPin, IconSwitchVertical } from "@tabler/icons-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Fragment, useEffect, useRef, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import usePlacesAutocomplete from "use-places-autocomplete"

export default function AddressForm() {
  const [isLoading, setIsLoading] = useState(false)

  const selectedFrom = useAddressStore((state) => state.addressFrom)
  const selectedTo = useAddressStore((state) => state.addressTo)

  const resetAddress = useAddressStore((state) => state.reset)
  const switchAddress = useAddressStore((state) => state.switch)

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
      language: "ro",
      region: "RO",
    },
    debounce: 400,
    initOnMount: false,
  })

  const initRef = useRef(init)
  const router = useRouter()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedFrom.description) {
      setFromError("Câmpul 'De la' este obligatoriu")
      return
    } else {
      setFromError("")
    }

    if (!selectedTo.description) {
      setToError("Câmpul 'Până la' este obligatoriu")
      return
    } else {
      setToError("")
    }

    setIsLoading(true)

    const data = {
      hash: hashPair(selectedFrom.description, selectedTo.description),
      selectedFrom,
      selectedTo,
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

      resetAddress()
      router.push(`/directions/${data.hash}`)
      setIsLoading(false)
    } catch (error) {
      toast.error("A apărut o eroare, vă rugăm încercați mai târziu.")
      console.error("Error:", error)
    }
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
      <section className="bg-gradient-to-b from-amber-400 to-amber-500 text-neutral-800 shadow-md transition">
        <form className="layout-mx mb-6 justify-center md:gap-x-12 lg:gap-x-24" onSubmit={onSubmit}>
          <div className="mx-auto space-y-6 md:mx-0">
            <h1>Estimează costul unei curse de taxi</h1>

            {fromInput()}
            {toInput()}

            <div className="flex justify-center">
              <button
                type="submit"
                className="button-base button-primary flex h-12 w-44 gap-x-2 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? <LoadingAnimation /> : "Calculează estimat"}
              </button>
            </div>
          </div>

          <Image
            src="/undraw_right_direction.svg"
            alt="Estimate taxi cost"
            className="hidden md:flex"
            width={630 * 0.5}
            height={532 * 0.5}
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
            return useAddressStore.setState({ addressFrom: address })
          }}
          disabled={!ready}
        >
          <div className="flex gap-x-4">
            <Combobox.Input
              placeholder="De la"
              onChange={(event) => {
                const inputValue = event.target.value
                if (inputValue.length >= 4) {
                  setValue(event.target.value)
                }
              }}
              displayValue={(data: google.maps.places.AutocompletePrediction) => {
                return data.description
              }}
              className={`${fromError ? "border border-red-500" : "border-0"} input-base`}
            />

            <div
              className="input-base flex w-10 items-center justify-center py-0 px-2 hover:cursor-pointer"
              onClick={switchAddress}
            >
              <IconSwitchVertical />
            </div>
          </div>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Combobox.Options className="input-modal">
              {data.length === 0 && value !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4">Niciun rezultat</div>
              ) : loading ? (
                <div className="relative cursor-default select-none py-2 px-4">Se încarcă...</div>
              ) : value === "" ? (
                <div className="relative cursor-default select-none py-2 px-4">
                  Introduceți o locație (folosiți 4 sau mai multe caractere)
                </div>
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
                    <div className="flex items-center">
                      <div className="font-bold">{location.structured_formatting.main_text}</div>
                      <div className="pl-1 text-sm italic">{location.structured_formatting.secondary_text}</div>
                    </div>
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
        <Combobox
          value={selectedTo}
          onChange={(address) => {
            clearSuggestions()
            return useAddressStore.setState({ addressTo: address })
          }}
          disabled={!ready}
        >
          <Combobox.Input
            placeholder="Până la"
            onChange={(event) => {
              const inputValue = event.target.value
              if (inputValue.length >= 4) {
                setValue(event.target.value)
              }
            }}
            displayValue={(data: google.maps.places.AutocompletePrediction) => {
              return data.description
            }}
            className={`${toError ? "border border-red-500" : ""} input-base`}
          />

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Combobox.Options className="input-modal">
              {data.length === 0 && value !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4">Niciun rezultat</div>
              ) : loading ? (
                <div className="relative cursor-default select-none py-2 px-4">Se încarcă...</div>
              ) : value === "" ? (
                <div className="relative cursor-default select-none py-2 px-4">
                  Introduceți o locație (folosiți 4 sau mai multe caractere)
                </div>
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
