import AddressForm from "@/components/Home/01_AddressForm"
import PopularRoutes from "@/components/Home/02_PopularRoutes"
import AddTaxiPrompt from "@/components/Home/03_AddTaxiPrompt"
import RecentsCard from "@/components/Home/RecentsCard"
import { fetchRecentRoutes } from "@/helpers/mongo"

export default async function HomePage() {
  const recentRoutes = await fetchRecentRoutes()

  return (
    <>
      {/* !TODO: Modify SearchCard to use Zustand */}
      {/* !TODO: Get directions on the server side */}
      {/* !TODO: Convert @react-google-maps/api to Javascript Google Maps API */}
      <AddressForm />
      <PopularRoutes />
      <RecentsCard recentRoutes={recentRoutes} />
      <AddTaxiPrompt />
    </>
  )
}
