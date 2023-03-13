import type { Route } from "@/helpers/mongo"
import { IconHistory } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
  recentRoutes?: Route[]
}

export default function RecentsCard({ recentRoutes }: Props) {
  return (
    <section className="layout-mx flex flex-col items-center justify-between gap-y-4 md:flex-row">
      <Image
        src="/undraw_up_to_date.svg"
        alt="Recent routes"
        className="hidden h-80 w-auto lg:flex"
        width={611 * 0.4}
        height={545 * 0.4}
        priority
      />

      <div className="card-base max-w-lg space-y-4">
        Ads
        {/* <AdUnit data-ad-slot="4225008821" data-ad-format="auto" data-full-width-responsive="true" /> */}
      </div>

      <div className="card-base max-w-lg space-y-4">
        <h3 className="flex items-center justify-center gap-x-2">
          <IconHistory className="h-6 w-6" />
          <span className="uppercase">Cautari Recente</span>
        </h3>

        <ol className="space-y-2 divide-y divide-dashed divide-black/10 dark:divide-white/10">
          {recentRoutes && recentRoutes.length > 0 ? (
            recentRoutes.map((item) => {
              const { fromAddress, toAddress, hash } = item
              return (
                <li key={hash}>
                  <Link
                    href={`/directions/${hash}`}
                    className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
                  >
                    {fromAddress}
                    {" -> "}
                    {toAddress}
                  </Link>
                </li>
              )
            })
          ) : (
            <p className="px-1">Nu exista cautari recente</p>
          )}
        </ol>
      </div>
    </section>
  )
}
