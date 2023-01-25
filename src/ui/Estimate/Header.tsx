type Props = {
  from: string
  to: string
}

export default function Header({ from, to }: Props) {
  return (
    <section className="border-y bg-yellow-600/90 transition group-hover:border-zinc-900/10 dark:border-white/10 dark:bg-yellow-600/60 dark:group-hover:border-white/20">
      <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="pb-1 text-2xl font-semibold leading-loose tracking-tight text-zinc-800 dark:text-zinc-100">
          Pret <span className="bg-black px-2 py-1 text-white">Uber</span> de la{" "}
          <span className="whitespace-nowrap border border-dashed border-zinc-900/80 px-2 py-1 shadow-lg">{from}</span>{" "}
          catre{" "}
          <span className="whitespace-nowrap border border-dashed border-zinc-900/80 px-2 py-1 shadow-lg">{to}</span>
        </h2>
      </div>
    </section>
  )
}
