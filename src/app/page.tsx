import { getMongoList } from "@/lib/helpers/mongodb"
import Estimator from "@/ui/Home/Estimator"
import Recents from "@/ui/Home/Recents"
import Taxi from "@/ui/Home/Taxi"

export default async function HomePage() {
  const recentSearches = await getMongoList()

  return (
    <>
      <Estimator />
      <Recents recentSearches={recentSearches} />
      <Taxi />
    </>
  )
}
