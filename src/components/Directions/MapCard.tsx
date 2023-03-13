"use client"

import type { Route } from "@/helpers/mongo"
import useDirectionsStore from "@/stores/directionsStore"
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import usePlacesAutocomplete from "use-places-autocomplete"

type Props = {
  route: Route
}

export default function MapCard({ route }: Props) {
  const [mapDirections, setMapDirections] = useState<google.maps.DirectionsResult>()

  const { init, ready } = usePlacesAutocomplete({
    debounce: 400,
    initOnMount: false,
  })

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
    if (!route.fromAddress || !route.toAddress) return
    ready && calculateRoute(route.fromAddress, route.toAddress)
  }, [route.fromAddress, route.toAddress, ready])

  const initRef = useRef(init)

  useEffect(() => {
    if (!mapDirections) return
    useDirectionsStore.setState({ mapDirections })
  }, [mapDirections])

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = init
    }
  }, [init])

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onReady={initRef.current}
      />
      <section className="layout-mx">
        {ready ? (
          <GoogleMap
            zoom={10}
            mapContainerClassName="card-base w-full h-[50vh]"
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {mapDirections && <DirectionsRenderer directions={mapDirections} />}
          </GoogleMap>
        ) : (
          <div className="card-base flex h-[50vh] w-full items-center justify-center">Se incarca harta...</div>
        )}
      </section>
    </>
  )
}
