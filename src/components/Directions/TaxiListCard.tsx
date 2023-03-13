import type { Company } from "@/helpers/mongo"
import { IconList, IconPhone } from "@tabler/icons-react"
import Image from "next/image"
type Props = {
  companies?: Company[]
}

export default function TaxiListCard({ companies }: Props) {
  return (
    <section className="layout-mx flex flex-col gap-y-4 pt-0">
      <div className="card-base flex w-full flex-col justify-between gap-y-2 py-4 px-6">
        {/* Title */}
        <div className="flex items-center">
          <IconList />
          <span className="pl-2">Lista taxiuri</span>
        </div>

        {/* List */}
        <div className="flex flex-col gap-y-2">
          {companies?.some((item) => item.placeholder === false) ? (
            companies
              .filter((item) => item.placeholder === false)
              .map((company, index) => (
                <div key={index} className="flex items-center gap-x-2 py-1">
                  <div className="hidden md:block">
                    <Image src="/taxi_driver_two_color.svg" alt="Taxi driver" width={406 * 0.2} height={306 * 0.2} />
                  </div>
                  <div className="flex-auto">
                    <div className="whitespace-nowrap capitalize tracking-tighter">{company.name}</div>
                    <div className="text-sm italic">
                      @<span className="pl-1">{company.city}</span>
                    </div>
                  </div>
                  <button className="button-base button-primary flex">
                    <span className="pr-1">{company.phone}</span>
                    <IconPhone />
                  </button>
                </div>
              ))
          ) : (
            <div className="flex items-center gap-x-2 py-1 italic">Nici un taxi gasit in aceasta zona</div>
          )}
        </div>
      </div>
    </section>
  )
}
