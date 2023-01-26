import UIMap from "./UIMap"

type Props = {
  from: string
  to: string
}

export default function Header({ from, to }: Props) {
  return (
    <>
      <section className="bg-gradient-to-b from-amber-400 to-amber-600 transition">
        <div className="mx-auto max-w-7xl items-center justify-between p-8 text-neutral-800">
          <h1 className="space-y-4 text-2xl font-extrabold tracking-tight transition md:text-3xl lg:text-4xl">
            Pret <span className="w-auto bg-black px-2 py-1 text-white">Uber</span> de la{" "}
            <span className="border border-dashed border-zinc-900/80 px-2 py-1 shadow-lg line-clamp-2">{from}</span>{" "}
            catre <span className="border border-dashed border-zinc-900/80 px-2 py-1 shadow-lg line-clamp-2">{to}</span>
          </h1>
        </div>
        <div>
          <UIMap from={from} to={to} />
        </div>
      </section>
    </>
  )
}
