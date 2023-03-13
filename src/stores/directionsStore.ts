import { create } from "zustand"

const initialDirections: google.maps.DirectionsResult = {
  available_travel_modes: [],
  geocoded_waypoints: [],
  routes: [],
}

export interface DirectionsState {
  mapDirections: google.maps.DirectionsResult
}

const useDirectionsStore = create<DirectionsState>(() => ({
  mapDirections: initialDirections,
}))

export default useDirectionsStore
