"use client";

import { DirectionsRenderer, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

type Props = {};

export default function Estimat({}: Props) {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "" });
  const [mapDirections, setMapDirections] = useState<google.maps.DirectionsResult>();

  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const [fromCoords, setFromCoords] = useState({ lat: 0, lng: 0 });
  const [toCoords, setToCoords] = useState({ lat: 0, lng: 0 });

  async function requestRoutes(origin: string, destination: string) {
    const directionsService = new google.maps.DirectionsService();
    return await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });
  }

  function handleOpenMap(origin: string, destination: string) {
    requestRoutes(origin, destination).then((result) => {
      setMapDirections(result);
    });
  }

  useEffect(() => {
    async function fetchCoords() {
      const fromResults = await getGeocode({ address: from });
      const fromLatLng = await getLatLng(fromResults[0]);
      setFromCoords(fromLatLng);

      const toResults = await getGeocode({ address: to });
      const toLatLng = await getLatLng(toResults[0]);
      setToCoords(toLatLng);
    }
    fetchCoords();
  }, [from, to]);

  useEffect(() => {
    if (!from) return;
    if (!to) return;

    handleOpenMap(from, to);
  }, [from, to]);

  //   useEffect(() => {
  //     console.log(isLoaded);
  //     console.log(from);
  //     console.log(to);
  //   }, [isLoaded, from, to]);

  const products = [
    {
      id: 1,
      name: "UberX",
      initialFee: "4.50$",
      rideTime: "5.20$",
      distance: "31.94$",
      total: "41.64$",
      imageSrc:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_341,h_192/v1597151255/assets/af/a978c2-d3de-4b6b-a80e-001ef05370ff/original/UberX.jpg",
    },
    {
      id: 2,
      name: "UberXL",
      initialFee: "4.50$",
      rideTime: "5.20$",
      distance: "31.94$",
      total: "41.64$",
      imageSrc:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_343,h_193/v1597151268/assets/63/1ac810-8fe1-40ad-933f-6cb8570db48b/original/UberXL.jpg",
    },
    {
      id: 3,
      name: "UberSelect",
      initialFee: "4.50$",
      rideTime: "5.20$",
      distance: "31.94$",
      total: "41.64$",
      imageSrc:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_343,h_193/v1597151125/assets/cb/c5b75b-5b9e-4ba9-9708-d10f27e7242a/original/Comfort.jpg",
    },
  ];

  return (
    <>
      <div className="mx-auto">
        <section className="dark:border-white/10 dark:bg-emerald-600/60 dark:group-hover:border-white/20 border-y bg-emerald-600/90 transition group-hover:border-zinc-900/10">
          <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="dark:text-zinc-100 pb-1 text-2xl font-semibold leading-loose tracking-tight text-zinc-800">
              Pret <span className="bg-black px-2 py-1 text-white">Uber</span> de la{" "}
              <span className="whitespace-nowrap border border-dashed border-zinc-900/80 px-2 py-1 shadow-lg">
                {from}
              </span>
              catre{" "}
              <span className="whitespace-nowrap border border-dashed border-zinc-900/80 px-2 py-1 shadow-lg">
                {to}
              </span>
            </h2>
          </div>
        </section>
        {isLoaded && (
          <GoogleMap
            zoom={10}
            mapContainerStyle={{ width: "100%", height: "50vh", backgroundColor: "hsla(0, 0%, 0%, 0)" }}
          >
            {mapDirections && <DirectionsRenderer directions={mapDirections} />}
          </GoogleMap>
        )}
        <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className=" dark:border-zinc-700/40 w-2/5 rounded-md border border-zinc-100 p-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-white/10">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-white/10">
                      <img src={product.imageSrc} className="h-full w-full object-cover object-center" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="dark:text-zinc-100 flex justify-between text-base font-medium tracking-tight text-zinc-800 transition">
                          <h3>{product.name}</h3>
                        </div>
                        <p className="mt-1 text-sm text-zinc-200">Initial fee: {product.initialFee}</p>
                        <p className="mt-1 text-sm text-zinc-200">Ride time: {product.rideTime}</p>
                        <p className="mt-1 text-sm text-zinc-200">Distance: {product.distance}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center justify-between text-sm">
                      <p className="px-2 py-1 text-lg text-zinc-100">Total {product.total}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
