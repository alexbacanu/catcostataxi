import AddCompanyCard from "@/components/Home/AddCompanyCard"
import RecentsCard from "@/components/Home/RecentsCard"
import SearchCard from "@/components/Home/SearchCard"
import { fetchRecentRoutes } from "@/helpers/mongo"

export default async function HomePage() {
  const recentRoutes = await fetchRecentRoutes()

  return (
    <>
      {/* !TODO: Modify SearchCard to use Zustand */}
      {/* !TODO: Get directions on the server side */}
      {/* !TODO: Convert @react-google-maps/api to Javascript Google Maps API */}
      <SearchCard />
      <RecentsCard recentRoutes={recentRoutes} />
      <AddCompanyCard />
    </>
  )
}
