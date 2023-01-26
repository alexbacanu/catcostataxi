import { getMongoKeys, getMongoValue } from "@/lib/helpers/mongodb"
import Header from "@/ui/Estimate/UIHeader"
import Taxis from "@/ui/Estimate/UITaxis"

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
    <div>
      <Header from={from} to={to} />
      <Taxis />
    </div>
  )
}

export async function generateStaticParams() {
  const routes = await getMongoKeys()

  return routes.map((route: string) => ({
    rid: route,
  }))
}
