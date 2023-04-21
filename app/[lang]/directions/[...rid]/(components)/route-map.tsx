"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Script from "next/script"
import { useState, useEffect, useRef, useCallback } from "react"
import usePlacesAutocomplete from "use-places-autocomplete"
import { Dictionary } from "@/lib/locale/get-dictionary"
import useRoutesStore from "@/lib/stores/route-store"
import type { Route } from "@/lib/helpers/mongo"

type RouteMapProps = {
  lang: string
  dictionary: Dictionary
  route: Route
}

const GoogleMap = dynamic(() => import("@react-google-maps/api").then((m) => m.GoogleMap), {
  ssr: false,
})

const DirectionsRenderer = dynamic(
  () => import("@react-google-maps/api").then((m) => m.DirectionsRenderer),
  {
    ssr: false,
  }
)

export default function RouteMap({ lang, dictionary, route }: RouteMapProps) {
  function initializeMap() {
    return (
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=\${process.env.NEXT_PUBLIC_GMAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onReady={initRef.current}
      />
    )
  }

  function isValidRoute() {
    return route.selectedFrom.description && route.selectedTo.description
  }

  function updateRoute() {
    if (ready && isValidRoute()) {
      calculateRoute(route.selectedFrom.description, route.selectedTo.description)
    }
  }

  const [mapDirections, setMapDirections] = useState<google.maps.DirectionsResult>()

  const { init, ready } = usePlacesAutocomplete({
    debounce: 400,
    initOnMount: false,
  })

  const calculateRoute = useCallback(async (origin: string, destination: string) => {
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
  }, [])

  useEffect(() => {
    updateRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {initializeMap()}
      <section className="layout-mx">
        {ready ? (
          <>
            <a href="https://www.jdoqocy.com/click-100816067-13255402">
              <Image
                src={`https://www.rentalcars.com/partners/integrations/banners/300--600/car-winding-road/${lang}.jpg`}
                alt="Rent a car"
                className="mr-8 hidden h-[50vh] w-auto rounded-lg object-contain sm:block"
                width={300}
                height={600}
              />
              <Image
                src={`https://www.rentalcars.com/partners/integrations/banners/160--600/car-winding-road/${lang}.jpg`}
                alt="Rent a car"
                className="mr-8 block h-[50vh] w-auto rounded-lg object-contain sm:hidden"
                width={161}
                height={600}
              />
            </a>
            <GoogleMap
              zoom={10}
              mapContainerClassName="card-base grow h-[50vh]"
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {mapDirections && <DirectionsRenderer directions={mapDirections} />}
            </GoogleMap>
          </>
        ) : (
          <div className="card-base flex h-[50vh] w-full items-center justify-center">
            {dictionary.directions.route_map.loading}
          </div>
        )}
      </section>
    </>
  )
}
