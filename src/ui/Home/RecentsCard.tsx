import { IconHistory } from "@tabler/icons-react"
import Link from "next/link"

type Props = {
  recentSearches: { id: string; from: string; to: string }[]
}

export default function RecentsCard({ recentSearches }: Props) {
  return (
    <div className="card-base space-y-6 p-8">
      <h3 className="flex items-center justify-center space-x-2">
        <IconHistory className="h-8 w-8" />
        <span className="uppercase">Cautari Recente</span>
      </h3>

      <ol className="divide-y divide-dashed divide-black/10 dark:divide-white/10">
        {recentSearches ? (
          recentSearches.map((item) => {
            const { from, to, id } = item

            return (
              <li key={id}>
                <Link
                  href={`/estimate/${id}`}
                  className="my-1 p-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80 lg:rounded-lg"
                >
                  {from}
                  {" -> "}
                  {to}
                </Link>
              </li>
            )
          })
        ) : (
          <div className="my-1 rounded-md p-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80 lg:rounded-lg">
            No recent searches
          </div>
        )}
      </ol>
    </div>
  )
}
