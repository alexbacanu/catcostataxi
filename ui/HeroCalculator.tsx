"use client";

import { Combobox, Transition } from "@headlessui/react";
import { IconMapPin } from "@tabler/icons";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

type Props = {};

export default function HeroCalculator({}: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromCoords, setFromCoords] = useState({});
  const [toCoords, setToCoords] = useState({});
  const router = useRouter();

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
  });

  const handleAddress = useCallback(
    async (address: string, setCoords: (coords: any) => void) => {
      setValue(address, false);
      clearSuggestions();

      try {
        const results = await getGeocode({ address });
        console.log(results);
        const { lat, lng } = await getLatLng(results[0]);
        setCoords({ lat, lng });
      } catch (error) {
        console.error("😱 Error:", error);
      }
    },
    [clearSuggestions, setValue]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (from === "") return;
    if (to === "") return;
    router.push(`/estimat/?from=${from}&to=${to}`);
  };

  const initRef = useRef(init);
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = init;
    }
  }, [init]);

  useEffect(() => {
    console.log(fromCoords);
    console.log(toCoords);
  }, [fromCoords, toCoords]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onReady={initRef.current}
      />

      <div className="group">
        <section className="dark:border-white/10 dark:bg-emerald-600/60 dark:group-hover:border-white/20 border-y bg-emerald-600/90 transition group-hover:border-zinc-900/10">
          <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <form className="w-full space-y-4 lg:w-4/5 lg:pr-8" onSubmit={handleSubmit}>
              {/* Heading */}
              <h1 className="dark:text-white max-w-3xl text-4xl font-extrabold leading-none tracking-tight text-zinc-900 transition md:text-5xl xl:text-6xl">
                Estimeaza cat costa un taxi
              </h1>

              {/* Paragraph */}
              <p className="dark:text-zinc-100 text-xl font-medium tracking-tight text-zinc-800 transition">
                Uber & mai multe servicii, afla instant cat costa o cursa de taxi!
              </p>

              {/* From */}
              <div>
                <label className="dark:text-zinc-100 block text-lg font-light text-zinc-800">De la</label>
                <div className="relative rounded-md shadow-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="dark:text-zinc-300 text-zinc-500 sm:text-xs">
                      <IconMapPin />
                    </span>
                  </div>
                  {/* Combobox */}
                  <Combobox
                    id="from"
                    as="div"
                    onChange={(address: string) => {
                      handleAddress(address, setFromCoords);
                      setFrom(address);
                    }}
                  >
                    <Combobox.Input
                      id="from-input"
                      placeholder="De la"
                      onChange={(event) => setValue(event.target.value)}
                      className="dark:bg-white/5 dark:text-zinc-100 dark:ring-inset dark:ring-white/10 placeholder:dark:text-zinc-200 dark:hover:ring-white/20 focus:dark:bg-white/10 focus:dark:ring-white/60 h-10 w-full items-center rounded-md bg-white/80 pl-9 text-sm text-zinc-800 ring-1 ring-zinc-900/10 transition placeholder:text-zinc-600 hover:ring-zinc-900/20 focus:bg-white focus:outline-none lg:flex"
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
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nici un rezultat
                          </div>
                        ) : loading ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Se incarca...
                          </div>
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

              {/* To */}
              <div>
                <label className="dark:text-zinc-100 block text-lg font-light text-zinc-800">Pana la</label>
                <div className="relative rounded-md shadow-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="dark:text-zinc-300 text-zinc-500 sm:text-xs">
                      <IconMapPin />
                    </span>
                  </div>
                  {/* Combobox */}
                  <Combobox
                    id="to"
                    as="div"
                    onChange={(address: string) => {
                      handleAddress(address, setToCoords);
                      setTo(address);
                    }}
                  >
                    <Combobox.Input
                      id="to-input"
                      placeholder="Pana la"
                      onChange={(event) => setValue(event.target.value)}
                      className="dark:bg-white/5 dark:text-zinc-100 dark:ring-inset dark:ring-white/10 placeholder:dark:text-zinc-200 dark:hover:ring-white/20 focus:dark:bg-white/10 focus:dark:ring-white/60 h-10 w-full items-center rounded-md bg-white/80 pl-9 text-sm text-zinc-800 ring-1 ring-zinc-900/10 transition placeholder:text-zinc-600 hover:ring-zinc-900/20 focus:bg-white focus:outline-none lg:flex"
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
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nici un rezultat
                          </div>
                        ) : loading ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Se incarca...
                          </div>
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

              {/* Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300 inline-flex justify-center overflow-hidden rounded-md bg-zinc-900 py-2 px-4 text-base font-medium text-white transition hover:bg-zinc-700"
                >
                  Calculeaza estimat cursa
                </button>
              </div>
            </form>

            {/* Image */}
            <div className="hidden lg:flex">
              <img
                src="https://www.elluminatiinc.com/wp-content/uploads/2022/01/ubrclnw/uber-clone.png"
                alt="mockup"
                className="object-scale-down"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
