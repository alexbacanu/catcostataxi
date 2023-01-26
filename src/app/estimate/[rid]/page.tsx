import { getMongoKeys, getMongoValue } from "@/lib/helpers/mongodb"
import Directions from "@/ui/Estimate/Directions"
import MapSection from "@/ui/Estimate/MapSection"

type Props = {
  params: {
    rid: string
  }
}

export default async function PIDPage({ params }: Props) {
  const routeData = await getMongoValue(params.rid)

  // TODO: Make skeleton
  if (!routeData) return <div>Not able to get route data</div>

  const { from, to } = routeData

  return (
    <>
      <Directions from={from} to={to} />
      <MapSection from={from} to={to} />
    </>
  )
}

export async function generateStaticParams() {
  const routes = await getMongoKeys()

  return routes.map((route: string) => ({
    rid: route,
  }))
}
