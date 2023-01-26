"use client"

import hashPair from "@/lib/helpers/hash"
import { Combobox, Transition } from "@headlessui/react"
import { IconMapPin } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import usePlacesAutocomplete from "use-places-autocomplete"

type Props = {}

export default function Directions({}: Props) {
  return (
    <section className="bg-gradient-to-b from-amber-400 to-amber-600 transition">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-8">
        <HeroForm />
        <HeroFooter />
      </div>
    </section>
  )
}

function HeroForm() {
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
    if (result.ok) router.push(`/estimat/${uniqueId}`)
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
      <form className="w-full space-y-6 px-6 text-neutral-800 lg:px-2" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-extrabold tracking-tight transition md:text-5xl lg:text-6xl">
          Estimeaza cat costa un taxi
        </h1>

        <p className="text-lg font-medium tracking-tight transition md:text-xl lg:text-2xl">
          Uber & mai multe servicii, afla instant cat costa o cursa de taxi!
        </p>

        <div>
          <div className="relative">
            <div className="pointer-events-none absolute top-2 left-0 flex items-center pl-2">
              <span className="text-xs">
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
            >
              <Combobox.Input
                id="from-input"
                placeholder="De la"
                onChange={(event) => setValue(event.target.value)}
                disabled={!ready}
                className="h-10 w-full rounded-md border-0 bg-white/20 pl-9 shadow-md ring-1 ring-neutral-800/10 transition placeholder:text-neutral-700 focus:ring-neutral-800/50"
              />

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/60 text-base shadow-lg backdrop-blur-md">
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
        </div>

        <div>
          <div className="relative">
            <div className="pointer-events-none absolute top-2 left-0 flex items-center pl-2">
              <span className="text-xs">
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
            >
              <Combobox.Input
                id="to-input"
                placeholder="Pana la"
                onChange={(event) => setValue(event.target.value)}
                disabled={!ready}
                className="h-10 w-full rounded-md border-0 bg-white/20 pl-9 shadow-md ring-1 ring-neutral-800/10 transition placeholder:text-neutral-700 focus:ring-neutral-800/50"
              />

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/60 text-base shadow-lg backdrop-blur-md">
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
        </div>

        <div>
          <button
            type="submit"
            className="rounded-md bg-teal-900 py-2 px-4 text-base font-medium text-white ring-1 ring-neutral-800/20 transition hover:shadow-md"
          >
            Calculeaza estimat cursa
          </button>
        </div>
      </form>
    </>
  )
}

function HeroFooter() {
  return (
    <div className="hidden w-auto lg:flex">
      <img
        className="object-contain p-12"
        src="https://www.elluminatiinc.com/wp-content/uploads/2022/01/ubrclnw/uber-clone.png"
        alt="mockup"
      />
    </div>
  )
}
