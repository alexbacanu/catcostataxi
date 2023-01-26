import { IconHistory } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  recentSearches: { id: string; from: string; to: string }[]
}

export default function Locations({ recentSearches }: Props) {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between p-8">
      <div className="flex items-center justify-center">
        {/* Left */}
        {/* <div>
          <div>
            <div>
              <h2>Verifica preturile in orasul tau</h2>

              <p>Verifica daca serviciile ca Uber sunt disponibile in orasul tau si la ce pret</p>

              <div>
                <div>
                  <span>
                    <IconMapPin />
                  </span>
                </div>
                <input type="text" name="from" id="from" placeholder="Introdu o locatie..." />
              </div>

              <div>
                <a href="#">Verifica preturi</a>
                <span>sau</span>
                <a href="#">vezi locatiile disponibile...</a>
              </div>
            </div>
          </div>
        </div> */}

        <div className="m-6 w-1/3 space-y-4 rounded-md p-4 shadow-lg ring-1 ring-zinc-900/10 dark:bg-neutral-900 dark:ring-white/10">
          <h2 className="flex justify-center space-x-2">
            <IconHistory />
            <span>Cautari Recente</span>
          </h2>

          <ol className="space-y-2">
            {recentSearches.map((item) => {
              const { from, to, id } = item

              return (
                <li key={id} className="line-clamp-1">
                  <Link href={`/estimat/${id}`}>
                    <span>{from}</span>
                    {" -> "}
                    <span>{to}</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="m-6 w-1/3 space-y-4 rounded-md p-4 shadow-lg ring-1 ring-zinc-900/10 dark:bg-neutral-900 dark:ring-white/10">
          <h2 className="flex justify-center space-x-2">
            <IconHistory />
            <span>Cautari Populare</span>
          </h2>

          <ol className="space-y-2">
            {recentSearches.map((item) => {
              const { from, to, id } = item

              return (
                <li key={id} className="line-clamp-1">
                  <Link href={`/estimat/${id}`}>
                    <span>{from}</span>
                    {" -> "}
                    <span>{to}</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="m-6 w-1/3 space-y-4 rounded-md p-4 shadow-lg ring-1 ring-zinc-900/10 dark:bg-neutral-900 dark:ring-white/10">
          <h2 className="flex justify-center space-x-2">
            <IconHistory />
            <span>Orase Populare</span>
          </h2>

          <ol className="space-y-2">
            {recentSearches.map((item) => {
              const { from, to, id } = item

              return (
                <li key={id} className="line-clamp-1">
                  <Link href={`/estimat/${id}`}>
                    <span>{from}</span>
                    {" -> "}
                    <span>{to}</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
