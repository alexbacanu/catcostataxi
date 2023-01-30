export default function TaxiAdd() {
  return (
    <div className="mx-auto text-center lg:flex-auto lg:py-20 lg:pl-12 lg:text-left">
      <h1 className="text-neutral-800">Adauga compania ta de taxi</h1>
      <p className="mt-4 text-lg leading-8 text-neutral-800 lg:text-xl">Primeste reclama gratuita pentru firma ta</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row lg:justify-start">
        <a href="#" className="button-base button-primary">
          Adauga companie
        </a>
        <a href="#" className="button-base button-secondary">
          Afla mai multe <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}
