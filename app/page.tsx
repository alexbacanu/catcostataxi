import { IconHistory, IconMapPin } from "@tabler/icons";

export default function Home() {
  return (
    <>
      <div className="group">
        <section className="border-y bg-emerald-600/90 transition group-hover:border-zinc-900/10 dark:border-white/10 dark:bg-emerald-600/60 dark:group-hover:border-white/20">
          <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="w-full space-y-4 lg:w-4/5 lg:pr-8">
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
                  <input
                    type="text"
                    name="from"
                    id="from"
                    className="h-10 w-full items-center rounded-md bg-white/80 pl-9 text-sm text-zinc-800 ring-1 ring-zinc-900/10 transition placeholder:text-zinc-600 hover:ring-zinc-900/20 focus:bg-white focus:outline-none dark:bg-white/5 dark:text-zinc-100 dark:ring-inset dark:ring-white/10 placeholder:dark:text-zinc-200 dark:hover:ring-white/20 focus:dark:bg-white/10 focus:dark:ring-white/60 lg:flex"
                    placeholder="Gara de Nord"
                  />
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
                  <input
                    type="text"
                    name="from"
                    id="from"
                    className="h-10 w-full items-center rounded-md bg-white/80 pl-9 text-sm text-zinc-800 ring-1 ring-zinc-900/10 transition placeholder:text-zinc-600 hover:ring-zinc-900/20 focus:bg-white focus:outline-none dark:bg-white/5 dark:text-zinc-100 dark:ring-inset dark:ring-white/10 placeholder:dark:text-zinc-200 dark:hover:ring-white/20 focus:dark:bg-white/10 focus:dark:ring-white/60 lg:flex"
                    placeholder="Aeroport Henri Coanda"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-flex justify-center overflow-hidden rounded-md bg-zinc-900 py-2 px-4 text-base font-medium text-white transition hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
                >
                  Calculeaza estimat cursa
                </a>
              </div>
            </div>

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

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3">
          {/* Left */}
          <div className="col-span-2 space-y-2">
            <div className="group relative flex flex-col items-center">
              <div className="p-6 transition hover:bg-zinc-50 hover:dark:bg-zinc-800/50 sm:rounded-2xl">
                <h2 className="pb-1 text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                  Verifica preturile in orasul tau
                </h2>

                <p className="pb-6 text-sm text-zinc-600 dark:text-zinc-400">
                  Verifica daca serviciile ca Uber sunt disponibile in orasul tau si la ce pret
                </p>

                <div className="relative rounded-md shadow-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="text-zinc-500 dark:text-zinc-300 sm:text-xs">
                      <IconMapPin />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="from"
                    id="from"
                    className="h-10 w-full items-center rounded-md bg-white/80 pl-9 text-sm text-zinc-800 ring-1 ring-zinc-900/10 transition placeholder:text-zinc-600 hover:ring-zinc-900/20 focus:bg-white focus:outline-none dark:bg-white/5 dark:text-zinc-100 dark:ring-inset dark:ring-white/10 placeholder:dark:text-zinc-200 dark:hover:ring-white/20 focus:dark:bg-white/10 focus:dark:ring-white/60 lg:flex"
                    placeholder="Introdu o locatie..."
                  />
                </div>

                <div className="flex items-center justify-center space-x-4 pt-6 text-base font-medium text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-300">
                  <a
                    href="#"
                    className="inline-flex justify-center overflow-hidden rounded-md bg-zinc-900 py-2 px-4 text-white transition hover:bg-zinc-700 dark:bg-zinc-400/10 dark:ring-1 dark:ring-inset dark:ring-zinc-400/20 dark:hover:bg-zinc-400/10 dark:hover:ring-zinc-300"
                  >
                    Verifica preturi
                  </a>
                  <span className="font-light">sau</span>
                  <a href="#" className="whitespace-nowrap">
                    vezi locatiile disponibile...
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="col-span-1 space-y-2">
            <div className="rounded-md border border-zinc-100 p-6 dark:border-zinc-700/40">
              <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <IconHistory />
                <span className="pl-4 pb-4">Cautari recente</span>
              </h2>

              <ol className="space-y-2">
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Plaza Romania - Centrul Vechi
                </li>
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Ateneul Roman - Bucuresti Obor
                </li>
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Autogara Militari - Tineretului
                </li>
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Parcul Regele Mihai I - AFI Cotroceni
                </li>
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Gara de Nord - Chiajna
                </li>
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Parcul Drumul Taberei - Aviatorilor
                </li>
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Autogara Militari - Tineretului
                </li>
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Parcul Regele Mihai I - AFI Cotroceni
                </li>
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Gara de Nord - Chiajna
                </li>
                <li className="w-full flex-none text-sm font-light text-zinc-900 dark:text-zinc-100">
                  Parcul Drumul Taberei - Aviatorilor
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="">
        <div className=" mx-auto max-w-screen-xl columns-1 gap-8 space-y-8 bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 lg:columns-2">
          <div className="overflow-hidden rounded-lg bg-white sm:rounded-xl">
            <div className="p-3 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Verifica preturile in orasul tau</h3>
            </div>

            <div className="mr-auto place-self-center lg:col-span-7">
              <p className="mb-2 max-w-3xl p-2 font-light text-slate-600 dark:text-slate-700 md:text-lg lg:mb-4 lg:text-lg">
                Verifica daca serviciile ca Uber sunt disponibile in orasul tau si la ce pret
              </p>

              <div className="relative mx-4 rounded-md shadow-lg">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <span className="text-gray-400 sm:text-xs">
                    <IconMapPin />
                  </span>
                </div>
                <input
                  type="text"
                  name="to"
                  id="to"
                  className="block w-full rounded-md border-gray-700 py-2 pl-9 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="Introdu o locatie"
                />
              </div>

              <div className="items-center justify-center space-x-4 pt-6 md:flex">
                <a
                  href="#"
                  className="whitespace-nowrap rounded-md bg-cyan-500 px-4 py-2 text-base font-medium text-white shadow-md hover:bg-cyan-600"
                >
                  <span className="sr-only">Verifica preturi</span>
                  Verifica preturi
                </a>
                <p>sau</p>
                <a href="#" className="whitespace-nowraptext-base font-medium text-emerald-900">
                  <span className="sr-only">Verifica preturi</span>
                  vezi locatiile disponibile...
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white">
            <div className="p-3 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Estimari recente</h3>
            </div>

            <div className=" border-gray-200">
              <dl>
                <div className="flex items-center   p-1 sm:grid sm:grid-cols-1 sm:gap-4">
                  Plaza Romania - Centrul Vechi
                </div>
                <div className="flex items-center   p-1 sm:grid sm:grid-cols-1 sm:gap-4">
                  Ateneul Roman - Bucuresti Obor
                </div>
                <div className="flex items-center   p-1 sm:grid sm:grid-cols-1 sm:gap-4">Gara de Nord - Chiajna</div>
                <div className="flex items-center   p-1 sm:grid sm:grid-cols-1 sm:gap-4">
                  Autogara Militari - Tineretului
                </div>
                <div className="flex items-center   p-1 sm:grid sm:grid-cols-1 sm:gap-4">
                  Parcul Regele Mihai I - AFI Cotroceni
                </div>
                <div className="flex items-center   pb-96 sm:grid sm:grid-cols-1 sm:gap-4">
                  Parcul Drumul Taberei - Aviatorilor
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
