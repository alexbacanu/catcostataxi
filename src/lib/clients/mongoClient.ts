import type { MongoClientOptions } from "mongodb"
import { MongoClient } from "mongodb"

const MONGO_URI = process.env.NEXT_PUBLIC_MONGODB_URI ?? ""
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV ?? ""

if (!MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"')
}

const uri: string = MONGO_URI
const options: MongoClientOptions = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (NODE_ENV === "development") {
  // In development mode, use a global variable so that the value

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }

  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
