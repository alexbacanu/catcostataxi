"use client"

import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api"
import Script from "next/script"
import { useState, useEffect, useRef } from "react"
import usePlacesAutocomplete from "use-places-autocomplete"
import useRoutesStore from "@/lib/stores/route-store"
import type { Route } from "@/lib/helpers/mongo"

type Props = {
  dictionary: {
    [key: string]: {
      [key: string]: string
    }
  }
  route: Route
}

export default function RouteMap({ dictionary, route }: Props) {
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
    if (!route.selectedFrom.description || !route.selectedTo.description) return
    ready && calculateRoute(route.selectedFrom.description, route.selectedTo.description)
  }, [route.selectedFrom.description, route.selectedTo.description, ready])

  const initRef = useRef(init)

  useEffect(() => {
    if (!mapDirections) return
    useRoutesStore.setState({ mapDirections })
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
          <div className="card-base flex h-[50vh] w-full items-center justify-center">Se încarcă harta...</div>
        )}
      </section>
    </>
  )
}
