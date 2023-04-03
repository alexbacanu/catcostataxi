"use client"

import { Combobox, Transition } from "@headlessui/react"
import { IconMapPin, IconSwitchVertical } from "@tabler/icons-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Fragment, useEffect, useRef, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import usePlacesAutocomplete from "use-places-autocomplete"
import hashPair from "@/lib/helpers/hasher"
import { normalizeString } from "@/lib/helpers/normalize-string"
import { Dictionary } from "@/lib/locale/get-dictionary"
import useAddressStore from "@/lib/stores/address-store"
import LoadingAnimation from "@/ui/loading-animation"

type Props = {
  dictionary: Dictionary
  lang: string
}

export default function AddressForm({ dictionary, lang }: Props) {
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
      setFromError(dictionary.home.address_form.from_error)
      return
    } else {
      setFromError("")
    }

    if (!selectedTo.description) {
      setToError(dictionary.home.address_form.to_error)
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
      const response = await fetch(`/${lang}/api/directions`, {
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
      router.push(
        `/${lang}/directions/${data.hash}/${normalizeString(
          selectedFrom.structured_formatting.main_text
        )}/${normalizeString(selectedTo.structured_formatting.main_text)}`
      )
      setIsLoading(false)
    } catch (error) {
      toast.error(dictionary.home.address_form.toast_error)
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
        <form
          className="layout-mx mb-6 justify-between pt-0 md:gap-x-12 lg:gap-x-24"
          onSubmit={onSubmit}
        >
          <div className="mx-auto space-y-6 md:mx-0">
            <h1>{dictionary.home.address_form.title}</h1>

            {fromInput()}
            {toInput()}

            <div className="flex justify-center">
              <button
                type="submit"
                className="button-base button-primary flex h-12 w-44 gap-x-2 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? <LoadingAnimation /> : dictionary.home.address_form.button}
              </button>
            </div>
          </div>

          <Image
            src="/undraw_right_direction.svg"
            alt="Estimate taxi cost"
            className="hidden md:flex"
            width={315}
            height={304}
          />
          <Toaster />
        </form>
      </section>
    </>
  )

  function fromInput() {
    return (
      <div className="relative">
        <div className="pointer-events-none absolute left-2 top-2">
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
              placeholder={dictionary.home.address_form.from}
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
              className="input-base flex w-10 items-center justify-center px-2 py-0 hover:cursor-pointer"
              onClick={switchAddress}
            >
              <IconSwitchVertical />
            </div>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="input-modal">
              {data.length === 0 && value !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2">
                  {dictionary.home.address_form.no_results}
                </div>
              ) : loading ? (
                <div className="relative cursor-default select-none px-4 py-2">
                  {dictionary.home.address_form.loading}
                </div>
              ) : value === "" ? (
                <div className="relative cursor-default select-none px-4 py-2">
                  {dictionary.home.address_form.no_chars}
                </div>
              ) : (
                status === "OK" &&
                data.map((location) => (
                  <Combobox.Option
                    key={location.place_id}
                    value={location}
                    className={({ active }) =>
                      `relative cursor-default select-none px-4 py-2 ${
                        active ? "bg-teal-900 text-white" : "text-neutral-800"
                      }`
                    }
                  >
                    <span className="font-bold">
                      {location.structured_formatting.main_text}
                      <span className="pl-1 text-sm font-light italic">
                        {location.structured_formatting.secondary_text}
                      </span>
                    </span>
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
        <div className="pointer-events-none absolute left-2 top-2">
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
            placeholder={dictionary.home.address_form.to}
            onChange={(event) => {
              const inputValue = event.target.value
              if (inputValue.length >= 4) {
                setValue(event.target.value)
              }
            }}
            displayValue={(data: google.maps.places.AutocompletePrediction) => {
              return data.description
            }}
            className={`${toError ? "border border-red-500" : "border-0"} input-base`}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="input-modal">
              {data.length === 0 && value !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2">
                  {dictionary.home.address_form.no_results}
                </div>
              ) : loading ? (
                <div className="relative cursor-default select-none px-4 py-2">
                  {dictionary.home.address_form.loading}
                </div>
              ) : value === "" ? (
                <div className="relative cursor-default select-none px-4 py-2">
                  {dictionary.home.address_form.no_chars}
                </div>
              ) : (
                status === "OK" &&
                data.map((location) => (
                  <Combobox.Option
                    key={location.place_id}
                    value={location}
                    className={({ active }) =>
                      `relative cursor-default select-none px-4 py-2 ${
                        active ? "bg-teal-900 text-white" : "text-neutral-800"
                      }`
                    }
                  >
                    <span className="font-bold">
                      {location.structured_formatting.main_text}
                      <span className="pl-1 text-sm font-light italic">
                        {location.structured_formatting.secondary_text}
                      </span>
                    </span>
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
