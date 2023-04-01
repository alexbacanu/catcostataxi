import { NextResponse } from "next/server"
import { fetchAvailableLocations, fetchCompaniesByLoc } from "@/lib/helpers/mongo"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const {
    location,
  }: {
    location: string
  } = await request.json()

  if (!location) {
    return new NextResponse("Location cannot be empty", {
      status: 400,
      statusText: "Location cannot be empty",
    })
  }

  const locations = await fetchAvailableLocations()
  if (!locations.includes(location)) {
    return new NextResponse("Location not correct", {
      status: 400,
      statusText: "Location not correct",
    })
  }

  try {
    const companies = await fetchCompaniesByLoc(location)
    return NextResponse.json(companies)
  } catch (error) {
    console.error(error)
    return new NextResponse("Something went wrong", { status: 400 })
  }
}
