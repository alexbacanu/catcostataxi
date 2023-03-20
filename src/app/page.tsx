import AddressForm from "@/components/Home/01_AddressForm"
import PopularRoutesAirplane from "@/components/Home/02_PopularRoutesAirplane"
import PopularRoutesTrain from "@/components/Home/03_PopularRoutesTrain"
import AddTaxiPrompt from "@/components/Home/04_AddTaxiPrompt"

export default async function HomePage() {
  // const recentRoutes = await fetchRecentRoutes()

  return (
    <>
      {/* !TODO: Modify SearchCard to use Zustand */}
      {/* !TODO: Get directions on the server side */}
      {/* !TODO: Convert @react-google-maps/api to Javascript Google Maps API */}
      <AddressForm />
      <PopularRoutesAirplane />
      <PopularRoutesTrain />
      <AddTaxiPrompt />
    </>
  )
}
