import { IconPlaneTilt } from "@tabler/icons-react"
import Link from "next/link"

export default function BookingCard() {
  return (
    <section className="layout-mx flex flex-col gap-y-4 pt-0">
      <div className="card-base flex w-full flex-row justify-between gap-y-2 bg-blue-900 py-4 px-6 ring-neutral-200">
        {/* Title */}
        <div className="flex items-center">
          <IconPlaneTilt />
          <span className="pl-2">Booking</span>
        </div>
        <div>
          <Link href="/">Gaseste cele mai bune oferte pentru booking</Link>
        </div>
      </div>
    </section>
  )
}
