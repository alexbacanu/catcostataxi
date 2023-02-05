import clientPromise from "@/lib/clients/mongoClient"
import hashPair from "@/lib/helpers/hash"
import type { Recents, Routes } from "@/lib/helpers/mongodb"
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

  const { from, fromLoc, to, toLoc } = tripData
  const hashedId = hashPair(from, to)

  if (hashedId !== id) {
    res.status(400).json({
      error: "Wrong ID or locations",
    })
    return
  }

  const client = await clientPromise
  const db = client.db(process.env.MONGODB_NAME ?? "")

  const requestedRoute = await db.collection("routes").findOne<Routes>({ id })

  if (!requestedRoute) {
    const searchData = { id, from, fromLoc, to, toLoc }
    await db.collection("routes").insertOne(searchData)

    const recentList = await db.collection("recents").findOne<Recents>()

    if (recentList) {
      await db.collection("recents").updateOne({ _id: recentList._id }, { $push: { recents: searchData } })
      const popped = await db.collection("recents").findOne<Recents>()

      if (popped && popped.recents.length > 10) {
        await db.collection("recents").updateOne({ _id: popped._id }, { $pop: { recents: -1 } })
      }
    } else {
      await db.collection("recents").insertOne({ recents: [searchData] })
    }
  }

  // client.close()

  return res.status(200).json({
    body: "Success",
  })
}
