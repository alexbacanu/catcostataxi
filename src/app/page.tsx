import { getMongoList } from "@/lib/helpers/mongodb"
import Directions from "@/ui/Home/Directions"
import Locations from "@/ui/Home/Locations"

export default async function HomePage() {
  const recentSearches = await getMongoList()

  return (
    <>
      <Directions />
      <Locations recentSearches={recentSearches} />
    </>
  )
}
