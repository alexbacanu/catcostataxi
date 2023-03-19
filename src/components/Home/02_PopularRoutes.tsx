import { IconHistory } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

export default function PopularRoutes() {
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

      <div className="card-base w-full max-w-lg space-y-4">
        <div className="flex items-center justify-center gap-x-2">
          <IconHistory className="h-6 w-6" />
          <span className="text-xl uppercase">Cautari Rapide</span>
        </div>

        <ol className="space-y-2 divide-y divide-dashed divide-black/10 dark:divide-white/10">
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Arad"}
              {" -> "} */}
              {"Aeroportul Internațional Arad (ARW)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Bacău"}
              {" -> "} */}
              {"Aeroportul Internațional George Enescu Bacău (BCM)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Baia Mare"}
              {" -> "} */}
              {"Aeroportul Internațional Maramureș (BAY)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Bucuresti"}
              {" -> "} */}
              {"Aeroportul Internațional Henri Coandă (OTP)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Cluj-Napoca"}
              {" -> "} */}
              {"Aeroportul Internațional Avram Iancu Cluj-Napoca (CLJ)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Constanta"}
              {" -> "} */}
              {"Aeroportul Internațional Mihail Kogălniceanu Constanța (CND)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Craiova"}
              {" -> "} */}
              {"Aeroportul Internațional Craiova (CRA)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Iasi"}
              {" -> "} */}
              {"Aeroportul Internațional Iași (IAS)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Oradea"}
              {" -> "} */}
              {"Aeroportul Internaţional Oradea (OMR)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Satu Mare"}
              {" -> "} */}
              {"Aeroportul Internațional Satu Mare (SUJ)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Sibiu"}
              {" -> "} */}
              {"Aeroportul Internațional Sibiu (SBZ)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Suceava"}
              {" -> "} */}
              {"Aeroportul Internațional Ștefan cel Mare Suceava (SCV)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Târgu Mureș"} */}
              {/* {" -> "} */}
              {"Aeroportul Internațional Transilvania Târgu Mureș (TGM)"}
            </Link>
          </li>
          <li>
            <Link
              href={`/directions/555www`}
              className="rounded-md px-1 outline-none line-clamp-1 hover:text-amber-500 focus:outline-dashed focus:outline-1 focus:outline-neutral-200/80"
            >
              {/* {"Timişoara"}
              {" -> "} */}
              {"Aeroportul Internațional Traian Vuia Timişoara (TSR)"}
            </Link>
          </li>
        </ol>
      </div>
    </section>
  )
}
