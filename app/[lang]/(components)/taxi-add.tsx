import Image from "next/image"
import { Dictionary } from "@/lib/locale/get-dictionary"

type Props = {
  dictionary: Dictionary
}

export default function TaxiAdd({ dictionary }: Props) {
  return (
    <section className="layout-mx">
      <div className="card-base relative isolate flex w-full flex-col items-center gap-4 overflow-hidden bg-amber-400 p-10 md:flex-row md:p-12">
        <div className="mx-auto space-y-2 text-neutral-800">
          <h2 className="text-4xl font-extrabold md:text-5xl">{dictionary.home.taxi_add.title}</h2>
          <p className="text-lg md:text-xl">{dictionary.home.taxi_add.description}</p>
          <div className="flex flex-col items-center gap-6 pt-6 sm:flex-row">
            <p className="button-base button-secondary">{dictionary.home.taxi_add.button}</p>
            {/* <Link href="/" className="button-base button-primary">
              Adauga companie
            </Link>
            <Link href="/" className="button-base button-secondary">
              Afla mai multe <span aria-hidden="true">→</span>
            </Link> */}
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 ml-28 mt-10 h-[64rem] w-[64rem] -translate-y-1/2 sm:left-full sm:-ml-60 md:left-1/2 md:ml-0 md:-translate-x-1/2 md:translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.9"
          />
          <defs>
            <radialGradient
              id="759c1415-0410-454c-8f7c-9a820de03641"
              cx={0}
              cy={0}
              r={1}
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#134e4a" />
              <stop offset={1} stopColor="#134e4a" stopOpacity={1} />
            </radialGradient>
          </defs>
        </svg>

        <Image
          src="/undraw_duplicate.svg"
          alt="Add your taxi"
          className="h-60 w-auto md:h-60 lg:h-80"
          width={721 * 0.6}
          height={600 * 0.6}
        />
      </div>
    </section>
  )
}
