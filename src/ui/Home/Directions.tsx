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
    <div className="group">
      <section className="border-y bg-yellow-600/90 transition group-hover:border-zinc-900/10 dark:border-white/10 dark:bg-amber-400/90 dark:group-hover:border-white/20">
        <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <HeroForm />
          <HeroFooter />
        </div>
      </section>
    </div>
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
      <form className="w-full space-y-4 lg:w-4/5 lg:pr-8" onSubmit={handleSubmit}>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-none tracking-tight text-zinc-900 transition dark:text-white md:text-5xl xl:text-6xl">
          Estimeaza cat costa un taxi
        </h1>

        <p className="text-xl font-medium tracking-tight text-zinc-800 transition dark:text-zinc-100">
          Uber & mai multe servicii, afla instant cat costa o cursa de taxi!
        </p>

        <div>
          <label className="block text-lg font-light text-zinc-800 dark:text-zinc-100">De la</label>
          <div className="relative rounded-md shadow-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <span className="text-zinc-500 dark:text-zinc-300 sm:text-xs">
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
                className="h-10 w-full items-center rounded-md bg-white/80 pl-9 text-sm text-zinc-800 ring-1 ring-zinc-900/10 transition placeholder:text-zinc-600 hover:ring-zinc-900/20 focus:bg-white focus:outline-none dark:bg-white/5 dark:text-zinc-100 dark:ring-inset dark:ring-white/10 placeholder:dark:text-zinc-200 dark:hover:ring-white/20 focus:dark:bg-white/10 focus:dark:ring-white/60 lg:flex"
                disabled={!ready}
              />

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {data.length === 0 && value !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nici un rezultat</div>
                  ) : loading ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Se incarca...</div>
                  ) : value === "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Introduceti o locatie
                    </div>
                  ) : (
                    status === "OK" &&
                    data.map(({ place_id, description }) => (
                      <Combobox.Option
                        key={place_id}
                        value={description}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
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
          <label className="block text-lg font-light text-zinc-800 dark:text-zinc-100">Pana la</label>
          <div className="relative rounded-md shadow-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <span className="text-zinc-500 dark:text-zinc-300 sm:text-xs">
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
                className="h-10 w-full items-center rounded-md bg-white/80 pl-9 text-sm text-zinc-800 ring-1 ring-zinc-900/10 transition placeholder:text-zinc-600 hover:ring-zinc-900/20 focus:bg-white focus:outline-none dark:bg-white/5 dark:text-zinc-100 dark:ring-inset dark:ring-white/10 placeholder:dark:text-zinc-200 dark:hover:ring-white/20 focus:dark:bg-white/10 focus:dark:ring-white/60 lg:flex"
                disabled={!ready}
              />

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {data.length === 0 && value !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nici un rezultat</div>
                  ) : loading ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Se incarca...</div>
                  ) : value === "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Introduceti o locatie
                    </div>
                  ) : (
                    status === "OK" &&
                    data.map(({ place_id, description }) => (
                      <Combobox.Option
                        key={place_id}
                        value={description}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex justify-center overflow-hidden rounded-md bg-zinc-900 py-2 px-4 text-base font-medium text-white transition hover:bg-zinc-700 dark:bg-yellow-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-yellow-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
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
    <div className="hidden lg:flex">
      <img
        src="https://www.elluminatiinc.com/wp-content/uploads/2022/01/ubrclnw/uber-clone.png"
        alt="mockup"
        className="object-scale-down"
      />
    </div>
  )
}
