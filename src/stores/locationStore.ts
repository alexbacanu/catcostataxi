import type { Company } from "@/helpers/mongo"
import { create } from "zustand"

export interface LocationState {
  location: string
  companies: Company[]
}

const useLocationStore = create<LocationState>(() => ({
  location: "",
  companies: [],
}))

export default useLocationStore
