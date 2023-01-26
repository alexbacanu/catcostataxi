"use client"

import hashPair from "@/lib/helpers/hash"
import { Combobox, Transition } from "@headlessui/react"
import { IconMapPin } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import usePlacesAutocomplete from "use-places-autocomplete"

export default function EstimatorForm() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (from === "" || to === "") return

    const uniqueId = hashPair(from, to)
    const tripData = { from, to }

    const result = await fetch("/api/submitRoute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uniqueId ?? "",
        tripData: tripData ?? "",
      }),
    })

    // TODO: Make a proper error:
    if (result.ok) router.push(`/estimate/${uniqueId}`)
  }

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

  const handleAddress = useCallback(
    async (address: string) => {
      setValue(address, false)
      clearSuggestions()
    },
    [clearSuggestions, setValue]
  )

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
          <p>Uber & mai multe servicii, afla instant cat costa o cursa de taxi!</p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-2 left-2">
            <span className="text-xs text-neutral-600">
              <IconMapPin />
            </span>
          </div>

          <Combobox
            id="from"
            as="div"
            onChange={(address: string) => {
              handleAddress(address)
              setFrom(address)
            }}
            disabled={!ready}
          >
            <Combobox.Input
              id="from-input"
              as="input"
              placeholder="De la"
              onChange={(event) => setValue(event.target.value)}
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
                  data.map(({ place_id, description }) => (
                    <Combobox.Option
                      key={place_id}
                      value={description}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active ? "bg-teal-900 text-white" : "text-neutral-800"
                        }`
                      }
                    >
                      {description}
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

          <Combobox
            id="to"
            as="div"
            onChange={(address: string) => {
              handleAddress(address)
              setTo(address)
            }}
            disabled={!ready}
          >
            <Combobox.Input
              id="to-input"
              as="input"
              placeholder="Pana la"
              onChange={(event) => setValue(event.target.value)}
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
                  data.map(({ place_id, description }) => (
                    <Combobox.Option
                      key={place_id}
                      value={description}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${
                          active ? "bg-teal-900 text-white" : "text-neutral-800"
                        }`
                      }
                    >
                      {description}
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
