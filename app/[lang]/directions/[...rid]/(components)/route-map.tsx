"use client"

import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api"
import Image from "next/image"
import Script from "next/script"
import { useState, useEffect, useRef } from "react"
import usePlacesAutocomplete from "use-places-autocomplete"
import { Dictionary } from "@/lib/locale/get-dictionary"
import useRoutesStore from "@/lib/stores/route-store"
import type { Route } from "@/lib/helpers/mongo"

type Props = {
  lang: string
  dictionary: Dictionary
  route: Route
}

export default function RouteMap({ lang, dictionary, route }: Props) {
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
      {/* <section className="layout-mx"> */}
      {/* <div className="relative flex w-full items-center justify-center rounded-lg">
          <Image
            src="https://www.rentalcars.com/partners/integrations/banners/970--90/car-winding-road/ro.jpg"
            alt="Rent a car"
            className="h-[120px] w-auto rounded-lg object-contain"
            width={970}
            height={120}
          />
        </div> */}
      {/* <div className="relative flex w-full items-center justify-center rounded-lg">
          <Image
            src="https://www.rentalcars.com/partners/integrations/banners/468--60/birds-eye-road/ro.jpg"
            alt="Rent a car"
            className="h-[90px] w-auto rounded-lg object-contain"
            width={468}
            height={60}
          />
        </div> */}
      {/* </section> */}
    </>
  )
}
