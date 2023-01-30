"use client"

import type { TaxiCompanies } from "@/lib/helpers/mongodb"
import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import Prices from "./Prices"

type Props = {
  from: string
  to: string
  companies: TaxiCompanies[]
}

export default function MapList({ from, to, companies }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    libraries: ["places"],
  })

  const [mapDirections, setMapDirections] = useState<google.maps.DirectionsResult>()

  async function calculateRoute(origin: string, destination: string) {
    const directionsService = new google.maps.DirectionsService()
    const route = await directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(),
      },
    })
    setMapDirections(route)
  }

  useEffect(() => {
    if (!from || !to) return
    isLoaded && calculateRoute(from, to)
  }, [from, to, isLoaded])

  // TODO: Make skeleton
  if (!isLoaded) return <div>Is not loaded yet</div>

  return (
    <>
      <GoogleMap
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "50vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <>{mapDirections && <DirectionsRenderer directions={mapDirections} />}</>
      </GoogleMap>
      {mapDirections && <Prices mapDirections={mapDirections} companies={companies} />}
    </>
  )
}
