type Props = {
  from: string
  to: string
}

export default function Directions({ from, to }: Props) {
  return (
    <section className="bg-gradient-to-b from-amber-400 to-amber-500 transition">
      <div className="home-section items-center justify-center gap-x-8 pt-0 pb-6 text-justify text-neutral-800">
        <h2 className="mt-4 hidden text-3xl sm:block">
          Pret<span className="mx-2 bg-black px-2 text-white">Uber</span>
        </h2>
        <div className="text-lg">
          <div>de la</div>
          <div className="border border-dashed border-neutral-800/80 px-2 py-1 shadow-md line-clamp-2">{from}</div>
        </div>
        <div className="text-lg">
          <div>pana la</div>
          <div className="border border-dashed border-neutral-800/80 px-2 py-1 shadow-md line-clamp-2">{to}</div>
        </div>
      </div>
    </section>
  )
}
