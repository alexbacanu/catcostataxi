import { IconHistory, IconMapPin } from "@tabler/icons";
import HeroCalculator from "ui/HeroCalculator";

export default function HomePage() {
  return (
    <>
      <HeroCalculator />

      {/* Bottom */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3">
          {/* Left */}
          <div className="col-span-2 space-y-2">
            <div className="group relative flex flex-col items-center">
              <div className="hover:dark:bg-zinc-800/50 p-6 transition hover:bg-zinc-50 sm:rounded-2xl">
                <h2 className="dark:text-zinc-100 pb-1 text-2xl font-semibold tracking-tight text-zinc-800">
                  Verifica preturile in orasul tau
                </h2>

                <p className="dark:text-zinc-400 pb-6 text-sm text-zinc-600">
                  Verifica daca serviciile ca Uber sunt disponibile in orasul tau si la ce pret
                </p>

                <div className="relative rounded-md shadow-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <span className="dark:text-zinc-300 text-zinc-500 sm:text-xs">
                      <IconMapPin />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="from"
                    id="from"
                    className="dark:bg-white/5 dark:text-zinc-100 dark:ring-inset dark:ring-white/10 placeholder:dark:text-zinc-200 dark:hover:ring-white/20 focus:dark:bg-white/10 focus:dark:ring-white/60 h-10 w-full items-center rounded-md bg-white/80 pl-9 text-sm text-zinc-800 ring-1 ring-zinc-900/10 transition placeholder:text-zinc-600 hover:ring-zinc-900/20 focus:bg-white focus:outline-none lg:flex"
                    placeholder="Introdu o locatie..."
                  />
                </div>

                <div className="dark:text-zinc-400 dark:hover:text-zinc-300 flex items-center justify-center space-x-4 pt-6 text-base font-medium text-zinc-800">
                  <a
                    href="#"
                    className="dark:bg-zinc-400/10 dark:ring-1 dark:ring-inset dark:ring-zinc-400/20 dark:hover:bg-zinc-400/10 dark:hover:ring-zinc-300 inline-flex justify-center overflow-hidden rounded-md bg-zinc-900 py-2 px-4 text-white transition hover:bg-zinc-700"
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
            <div className="dark:border-zinc-700/40 rounded-md border border-zinc-100 p-6">
              <h2 className="dark:text-zinc-100 flex text-sm font-semibold text-zinc-900">
                <IconHistory />
                <span className="pl-4 pb-4">Cautari recente</span>
              </h2>

              <ol className="space-y-2">
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Plaza Romania - Centrul Vechi
                </li>
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Ateneul Roman - Bucuresti Obor
                </li>
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Autogara Militari - Tineretului
                </li>
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Parcul Regele Mihai I - AFI Cotroceni
                </li>
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Gara de Nord - Chiajna
                </li>
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Parcul Drumul Taberei - Aviatorilor
                </li>
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Autogara Militari - Tineretului
                </li>
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Parcul Regele Mihai I - AFI Cotroceni
                </li>
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Gara de Nord - Chiajna
                </li>
                <li className="dark:text-zinc-100 w-full flex-none text-sm font-light text-zinc-900">
                  Parcul Drumul Taberei - Aviatorilor
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
