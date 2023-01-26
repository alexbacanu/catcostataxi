import clientPromise from "@/lib/clients/mongoClient"
import hashPair from "@/lib/helpers/hash"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function submitRoute(req: NextApiRequest, res: NextApiResponse) {
  const { id, tripData } = req.body

  if (!id || !tripData) {
    res.status(400).json({
      error: "ID or trip data cannot be empty",
    })
    return
  }

  if (id.length > 8) {
    res.status(400).json({
      error: "Wrong ID",
    })
    return
  }

  const { from, to } = tripData
  const hashedId = hashPair(from, to)

  if (hashedId !== id) {
    res.status(400).json({
      error: "Wrong ID or locations",
    })
    return
  }

  const client = await clientPromise
  const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB_NAME ?? "")

  const requestedRoute = await db.collection("routes").findOne({ id })
  const searchData = { id, from, to }

  if (!requestedRoute) {
    await db.collection("routes").insertOne({ id, from, to })

    const recentList = await db.collection("recent").findOne()

    if (recentList) {
      await db.collection("recent").updateOne({ _id: recentList._id }, { $push: { recent: searchData } })
      const recent = await db.collection("recent").findOne()

      if (recent && recent.recent.length > 10) {
        await db.collection("recent").updateOne({ _id: recent._id }, { $pop: { recent: -1 } })
      }
    } else {
      await db.collection("recent").insertOne({ recent: [searchData] })
    }
  }

  // client.close()

  return res.status(200).json({
    body: "Success",
  })
}
