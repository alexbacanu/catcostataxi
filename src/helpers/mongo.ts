import clientPromise from "@/clients/mongoClient"
import type { Condition, ObjectId } from "mongodb"
import { cache } from "react"

export type Route = {
  _id?: Condition<ObjectId>
  hash: string
  fromAddress: string
  fromLoc: string
  toAddress: string
  toLoc: string
  createdAt?: Date
}

export type Company = {
  _id?: Condition<ObjectId>
  city: string
  dayPrice: number
  nightPrice: number
  dayPricePlus: number
  nightPricePlus: number
  placeholder: boolean
  disabled: boolean
  name?: string
  phone?: string
  email?: string
  website?: string
  dateAdded?: Date
  dateUpdated?: Date
}
export const fetchCompaniesByLoc = cache(async (city: string) => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const companies = db.collection("companies")

  const allCompanies = await companies
    .find({ $text: { $search: city } })
    .project<Company>({ _id: 0, dateAdded: 0, dateUpdated: 0 })
    .toArray()
  if (allCompanies.length == 0) console.warn(`😱 Warning: No taxi companies found in this city: ${city}`)

  return allCompanies
})

export const fetchAvailableLocations = cache(async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const companies = db.collection("companies")

  const allLocations = await companies.find({}).project<Company>({ _id: 0, city: 1 }).toArray()
  if (allLocations.length == 0) console.warn(`😱 Warning: No locations found`)

  const uniqueLocations = allLocations.map((loc) => loc.city)

  return uniqueLocations
})

export const fetchRecentRoutes = cache(async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const routes = db.collection("routes")

  const recentRoutes = await routes
    .find({})
    .sort("createdAt", -1)
    .project<Route>({ _id: 0, createdAt: 0 })
    .limit(10)
    .toArray()
  if (recentRoutes.length == 0) console.warn("😱 Warning: No recent routes found")

  return recentRoutes
})

export const fetchAllRoutesIds = cache(async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const routes = db.collection("routes")

  const allRoutes = await routes.find({}).sort("createdAt", -1).project<Route>({ _id: 0, hash: 1 }).toArray()
  if (allRoutes.length == 0) console.warn("😱 Warning: No routes found")

  const allRoutesIds = allRoutes.map((object) => object.hash)

  return allRoutesIds
})

export const fetchSingleRoute = cache(async (hash: string) => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const routes = db.collection("routes")

  const singleRoute = await routes.findOne<Route>({ hash }, { projection: { _id: 0, createdAt: 0 } })
  if (!singleRoute) console.warn(`😱 Warning: No route found with hash: ${hash}`)

  return singleRoute
})

export const submitRoute = cache(
  async (
    hash: string,
    tripData: {
      fromAddress: string
      fromLoc?: string
      toAddress: string
      toLoc?: string
    }
  ) => {
    const client = await clientPromise
    const db = client.db(process.env.MONGO_DB ?? "")
    const routes = db.collection("routes")

    const requestedRoute = await routes.findOne<Route>({ hash }, { projection: { _id: 0, createdAt: 0 } })

    if (!requestedRoute) {
      await routes.insertOne({ hash, ...tripData, createdAt: new Date() })
    }

    return requestedRoute
  }
)
