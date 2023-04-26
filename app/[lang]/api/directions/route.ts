import { NextResponse } from "next/server"
import hashPair from "@/lib/helpers/hasher"
import { preload, submitRoute } from "@/lib/helpers/mongo"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const {
    hash,
    selectedFrom,
    selectedTo,
  }: {
    hash: string
    selectedFrom: google.maps.places.AutocompletePrediction
    selectedTo: google.maps.places.AutocompletePrediction
  } = await request.json()

  if (!hash || !selectedFrom.place_id || !selectedTo.place_id) {
    return new NextResponse("ID or Trip Data cannot be empty", {
      status: 400,
      statusText: "ID or Trip Data cannot be empty",
    })
  }

  if (hash.length !== 8) {
    return new NextResponse("Wrong ID", { status: 400, statusText: "Wrong ID" })
  }

  preload(hash, selectedFrom, selectedTo)

  if (hashPair(selectedFrom.description, selectedTo.description) !== hash) {
    return new NextResponse("ID does not match Trip Data", {
      status: 400,
      statusText: "ID does not match Trip Data",
    })
  }

  try {
    const response = await submitRoute(hash, selectedFrom, selectedTo)
    return NextResponse.json(response)
  } catch (error) {
    console.error(error)
    return new NextResponse("Something went wrong", { status: 400 })
  }
}
