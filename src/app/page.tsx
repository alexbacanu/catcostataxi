import AddressForm from "@/components/Home/01_AddressForm"
import PopularRoutesAirplane from "@/components/Home/02_PopularRoutesAirplane"
import PopularRoutesTrain from "@/components/Home/03_PopularRoutesTrain"
import AddTaxiPrompt from "@/components/Home/04_AddTaxiPrompt"

export default async function HomePage() {
  return (
    <>
      <AddressForm />
      <PopularRoutesAirplane />
      <PopularRoutesTrain />
      <AddTaxiPrompt />
    </>
  )
}
