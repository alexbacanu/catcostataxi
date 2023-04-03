import { MongoClient } from "mongodb"

const MONGO_URI = process.env.MONGO_URI ?? ""
const NODE_ENV = process.env.NODE_ENV ?? ""

if (!MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (NODE_ENV === "development") {
  // Instantiate a client and store its promise globally for future usages.
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGO_URI, {})
    global._mongoClientPromise = client.connect()
  }

  // In development mode, use the global value
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, instantiate a new client directly.
  client = new MongoClient(MONGO_URI, {})
  clientPromise = client.connect()
}

export default clientPromise
