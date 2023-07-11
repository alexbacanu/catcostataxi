import { create } from "zustand";
import type { Company } from "../helpers/mongo";

export interface LocationState {
  location: string;
  companies: Company[];
}

const useLocationStore = create<LocationState>(() => ({
  location: "",
  companies: [],
}));

export default useLocationStore;
