import clientPromise from "@/lib/clients/mongoClient"

export type Recents = {
  _id: string
  recents: {
    id: string
    from: string
    fromLoc: string
    to: string
    toLoc: string
  }[]
}

export type Routes = {
  _id: string
  id: string
  from: string
  fromLoc: string
  to: string
  toLoc: string
}

export type TaxiCompanies = {
  _id?: string
  name: string
  city: string
  phoneNumber: number
  email?: string
  website?: string
  dayPrice: number
  nightPrice: number
  premiumDayPrice: number
  premiumNightPrice: number
  disabled: boolean
  dateAdded: string
  dateModified: string
}

export async function getMongoKeys() {
  const client = await clientPromise

  const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB_NAME ?? "")
  const keys = await db.collection("routes").find<Routes>({}).toArray()
  const ids = keys.map((object) => object.id)

  if (!ids) return console.log("😱 Error: No routes found")

  return ids
}

export async function getMongoValue(key: string) {
  const client = await clientPromise

  const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB_NAME ?? "")
  const value = await db.collection("routes").findOne<Routes>({ id: key })

  if (!value) return console.log("😱 Error: No route found with that specific id")

  return value
}

export async function getMongoList() {
  const client = await clientPromise

  const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB_NAME ?? "")
  const list = await db.collection("recents").findOne<Recents>()

  if (!list) return console.log("😱 Error: No recent routes found")
  const { recents } = list

  return recents
}

export async function getMongoTaxis(filter: { city: string }) {
  const client = await clientPromise

  const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB_NAME ?? "")
  const companies = await db.collection("taxiCompanies").find<TaxiCompanies>(filter).toArray()

  if (!companies) return console.log("😱 Error: No taxi companies found")
  const curatedObjects = companies.map(({ _id, ...rest }) => rest)

  return curatedObjects
}
