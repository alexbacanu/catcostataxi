import { create } from "zustand";

const initialRoute: google.maps.DirectionsResult = {
  available_travel_modes: [],
  geocoded_waypoints: [],
  routes: [],
};

export interface RoutesState {
  mapDirections: google.maps.DirectionsResult;
}

const useRoutesStore = create<RoutesState>(() => ({
  mapDirections: initialRoute,
}));

export default useRoutesStore;
