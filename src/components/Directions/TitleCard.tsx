import type { Route } from "@/helpers/mongo"

type Props = {
  route: Route
}

export default function TitleCard({ route }: Props) {
  return (
    <section className="bg-gradient-to-b from-amber-400 to-amber-500 text-neutral-800 transition">
      <div className="layout-mx flex-col items-start gap-2 pt-2 md:flex-row">
        {/*
          <h2 className="hidden self-center whitespace-nowrap md:block">
            Pret <span className="mx-2 bg-black px-2 text-white">Taxi</span>
          </h2>
        */}
        <div className="text-lg">
          <h1>de la</h1>
          <div className="border border-dashed border-neutral-800/80 px-2 py-1 shadow-md line-clamp-2">
            {route.fromAddress}
          </div>
        </div>
        <div className="text-lg">
          <h1>pana la</h1>
          <div className="border border-dashed border-neutral-800/80 px-2 py-1 shadow-md line-clamp-2">
            {route.toAddress}
          </div>
        </div>
      </div>
    </section>
  )
}
