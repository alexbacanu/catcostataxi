import clientPromise from "@/lib/clients/mongoClient"

export async function getMongoKeys() {
  const client = await clientPromise

  const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB_NAME ?? "")
  const keys = await db.collection("routes").find({}).toArray()
  const ids = keys.map((object) => object.id)

  return ids
}

export async function getMongoValue(key: string) {
  const client = await clientPromise

  const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB_NAME ?? "")
  const value = await db.collection("routes").findOne({ id: key })

  return value
}

export async function getMongoList() {
  const client = await clientPromise

  const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB_NAME ?? "")
  const list = await db.collection("recent").findOne()
  const { recent } = list

  // client.close()
  return recent
}
