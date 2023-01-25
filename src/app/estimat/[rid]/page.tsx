import { getRedisKeys, getRedisValue } from "@/lib/helpers/redis"
import Header from "@/ui/Estimate/Header"
import Map from "@/ui/Estimate/Map"
import Taxis from "@/ui/Estimate/Taxis"

type Props = {
  params: {
    rid: string
  }
}

export default async function PIDPage({ params }: Props) {
  const routeData = await getRedisValue(params.rid)

  // TODO: Make skeleton
  if (!routeData) return <div>Not able to get route data</div>

  const { from, to } = JSON.parse(routeData)

  return (
    <div className="mx-auto">
      <Header from={from} to={to} />
      <Map from={from} to={to} />
      <Taxis />
    </div>
  )
}

export async function generateStaticParams() {
  const routes = await getRedisKeys("*")

  return routes.map((route: string) => ({
    rid: route,
  }))
}
