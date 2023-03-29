import type { Route } from "@/helpers/mongo"

type Props = {
  route: Route
}

export default function RouteDetails({ route }: Props) {
  return (
    <section className="bg-gradient-to-b from-amber-400 to-amber-500 text-neutral-800 shadow-md transition">
      <div className="layout-mx mb-6 flex-col items-start gap-x-6 md:flex-row">
        <div className="space-y-2 text-lg">
          <h1>de la</h1>
          <div className="line-clamp-2 border border-dashed border-neutral-800/80 px-2 py-1 shadow-md">
            {route.selectedFrom.structured_formatting.main_text}
          </div>
        </div>
        <div className="space-y-2 text-lg">
          <h1>până la</h1>
          <div className="line-clamp-2 border border-dashed border-neutral-800/80 px-2 py-1 shadow-md">
            {route.selectedTo.structured_formatting.main_text}
          </div>
        </div>
      </div>
    </section>
  )
}
