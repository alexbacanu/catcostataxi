import { getMongoKeys, getMongoTaxis, getMongoValue } from "@/lib/helpers/mongodb"
import Directions from "@/ui/Estimate/Directions"
import MapList from "@/ui/Estimate/MapList"

type Props = {
  params: {
    rid: string
  }
}

export default async function PIDPage({ params }: Props) {
  const routeData = await getMongoValue(params.rid)

  // TODO: Make skeleton
  if (!routeData) return <div>Not able to get route data</div>
  const { from, fromLoc, to, toLoc } = routeData

  const companiesData = await getMongoTaxis({ city: fromLoc })
  if (!companiesData) return <div>Not able to get companies data</div>

  return (
    <>
      <div>
        <Directions from={from} to={to} />
        <MapList from={from} to={to} companies={companiesData} />
      </div>
    </>
  )
}

export async function generateStaticParams() {
  const routes = await getMongoKeys()

  if (!routes) return

  return routes.map((route: string) => ({
    rid: route,
  }))
}
