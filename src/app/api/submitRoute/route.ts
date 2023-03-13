import hashPair from "@/helpers/hasher"
import { submitRoute } from "@/helpers/mongo"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const {
    id,
    tripData,
  }: {
    id: string
    tripData: {
      fromAddress: string
      fromLoc?: string
      toAddress: string
      toLoc?: string
    }
  } = await request.json()

  if (!id || !tripData.fromAddress || !tripData.toAddress) {
    return new NextResponse("ID or Trip Data cannot be empty", { status: 400 })
  }

  if (id.length !== 8) {
    return new NextResponse("Wrong ID", { status: 400 })
  }

  if (hashPair(tripData.fromAddress, tripData.toAddress) !== id) {
    return new NextResponse("ID does not match Trip Data", { status: 400 })
  }

  const response = await submitRoute(id, tripData)

  return NextResponse.json(response)
}
