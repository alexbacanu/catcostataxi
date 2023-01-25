import redis from "@/lib/clients/redis"
import hashPair from "@/lib/helpers/hash"
import { NextApiRequest, NextApiResponse } from "next"

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

  const requestedRoute = await redis.get(id)

  if (!requestedRoute) {
    await redis.set(id, JSON.stringify(tripData))
  }

  return res.status(200).json({
    body: "Success",
  })
}
