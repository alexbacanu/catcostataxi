import hashPair from "@/helpers/hasher"
import { submitRoute } from "@/helpers/mongo"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const {
    id,
    selectedFrom,
    selectedTo,
  }: {
    id: string
    selectedFrom: google.maps.places.AutocompletePrediction
    selectedTo: google.maps.places.AutocompletePrediction
  } = await request.json()

  if (!id || !selectedFrom.place_id || !selectedTo.place_id) {
    return new NextResponse("ID or Trip Data cannot be empty", {
      status: 400,
      statusText: "ID or Trip Data cannot be empty",
    })
  }

  if (id.length !== 8) {
    return new NextResponse("Wrong ID", { status: 400, statusText: "Wrong ID" })
  }

  if (hashPair(selectedFrom.description, selectedTo.description) !== id) {
    return new NextResponse("ID does not match Trip Data", {
      status: 400,
      statusText: "ID does not match Trip Data",
    })
  }

  try {
    const response = await submitRoute(id, selectedFrom, selectedTo)
    return NextResponse.json(response)
  } catch (error) {
    console.error(error)
    return new NextResponse("Something went wrong", { status: 400 })
  }
}
