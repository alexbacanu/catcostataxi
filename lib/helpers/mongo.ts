import { cache } from "react"
import clientPromise from "./mongo-client"
import type { Condition, ObjectId } from "mongodb"

export type Legal = {
  _id?: Condition<ObjectId>
  type: string
  lang: string
  modified: Date
  version: string
  markdown: string
}

export type Route = {
  _id?: Condition<ObjectId>
  hash: string
  selectedFrom: google.maps.places.AutocompletePrediction
  selectedTo: google.maps.places.AutocompletePrediction
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

export const fetchLegal = cache(async (type: string, lang: string) => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const legal = db.collection("legal")

  const allLegal = await legal
    .find({ type, lang })
    .project<Legal>({ _id: 0 })
    .sort({ version: -1 })
    .toArray()

  if (allLegal.length == 0)
    console.warn(`😱 Warning: No legal documents found with this type: ${type}`)

  const newArray = allLegal.map((legalDoc) => {
    return {
      ...legalDoc,
      modified: legalDoc.modified.toISOString(),
    }
  })

  return newArray
})

export const fetchSingleLegal = cache(async (type: string, lang: string, version?: string) => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const legal = db.collection("legal")

  const singleLegal = await legal.findOne({ type, lang, version }, { projection: { _id: 0 } })

  if (!singleLegal)
    console.warn(
      `😱 Warning: No legal documents found with this type: ${type} and version: ${version}`
    )

  return singleLegal
})

export const fetchCompaniesByLoc = cache(async (city: string) => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const companies = db.collection("companies")

  const allCompanies = await companies
    .find({ $text: { $search: city } })
    .project<Company>({ _id: 0, dateAdded: 0, dateUpdated: 0 })
    .toArray()
  if (allCompanies.length == 0)
    console.warn(`😱 Warning: No taxi companies found in this city: ${city}`)

  return allCompanies
})

export const fetchAvailableLocations = cache(async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const companies = db.collection("companies")

  const allLocations = await companies.find({}).project<Company>({ _id: 0, city: 1 }).toArray()
  if (allLocations.length == 0) console.warn(`😱 Warning: No locations found`)

  const uniqueLocations = await companies.distinct("city")

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

  const allRoutes = await routes
    .find({})
    .sort("createdAt", -1)
    .project<Route>({ _id: 0, hash: 1, selectedFrom: 1, selectedTo: 1 })
    .toArray()
  if (allRoutes.length == 0) console.warn("😱 Warning: No routes found")

  return allRoutes
})

export const fetchSingleRoute = cache(async (hash: string) => {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const routes = db.collection("routes")

  const singleRoute = await routes.findOne<Route>(
    { hash },
    { projection: { _id: 0, createdAt: 0 } }
  )
  if (!singleRoute) console.warn(`😱 Warning: No route found with hash: ${hash}`)

  return singleRoute
})

async function findOrCreateRoute(
  hash: string,
  selectedFrom: google.maps.places.AutocompletePrediction,
  selectedTo: google.maps.places.AutocompletePrediction
) {
  const client = await clientPromise
  const db = client.db(process.env.MONGO_DB ?? "")
  const routes = db.collection("routes")

  const requestedRoute = await routes.findOne<Route>(
    { hash },
    { projection: { _id: 0, createdAt: 0 } }
  )

  if (!requestedRoute) {
    const newRoute = { hash, selectedFrom, selectedTo, createdAt: new Date() }
    await routes.insertOne(newRoute)
    return newRoute
  }

  return requestedRoute
}

export const submitRoute = cache(findOrCreateRoute)

export const preload = (
  hash: string,
  selectedFrom: google.maps.places.AutocompletePrediction,
  selectedTo: google.maps.places.AutocompletePrediction
) => {
  void findOrCreateRoute(hash, selectedFrom, selectedTo)
}
