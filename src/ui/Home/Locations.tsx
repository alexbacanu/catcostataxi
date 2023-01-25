import { IconHistory, IconMapPin } from "@tabler/icons-react"

export default function Locations() {
  return (
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
  )
}
