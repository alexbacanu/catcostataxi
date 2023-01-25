"use client"

import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useEffect, useState } from "react"

type Props = {
  from: string
  to: string
}

export default function Map({ from, to }: Props) {
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
    <section>
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
        {mapDirections && <DirectionsRenderer directions={mapDirections} />}
      </GoogleMap>
    </section>
  )
}
