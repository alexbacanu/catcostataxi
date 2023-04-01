import type { Route } from "@/lib/helpers/mongo"

type Props = {
  dictionary: {
    [key: string]: {
      [key: string]: string
    }
  }
  route: Route
}

export default function RouteDetails({ dictionary, route }: Props) {
  return (
    <section className="bg-gradient-to-b from-amber-400 to-amber-500 text-neutral-800 shadow-md transition">
      <div className="layout-mx mb-6 flex-col items-start gap-x-6 gap-y-2 pt-0 md:flex-row">
        <div className="space-y-2 text-lg">
          <h1>de la</h1>
          <div className="line-clamp-2 border border-dashed border-neutral-800/80 px-2 py-1 font-bold leading-tight shadow-md">
            {route.selectedFrom.structured_formatting.main_text}
            <span className="pl-1 text-sm font-normal italic">
              {route.selectedFrom.structured_formatting.secondary_text}
            </span>
          </div>
        </div>
        <div className="space-y-2 text-lg">
          <h1>până la</h1>
          <div className="line-clamp-2 border border-dashed border-neutral-800/80 px-2 py-1 font-bold leading-tight shadow-md">
            {route.selectedTo.structured_formatting.main_text}
            <span className="pl-1 text-sm font-normal italic">
              {route.selectedTo.structured_formatting.secondary_text}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
