import hashPair from "@/helpers/hasher"
import { submitRoute } from "@/helpers/mongo"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const {
    id,
    tripData,
    captchaCode,
  }: {
    id: string
    tripData: {
      fromAddress: string
      fromLoc?: string
      toAddress: string
      toLoc?: string
    }
    captchaCode: string
  } = await request.json()

  if (!captchaCode) {
    return new NextResponse("Please pass captcha test", { status: 422 })
  }

  if (!id || !tripData.fromAddress || !tripData.toAddress) {
    return new NextResponse("ID or Trip Data cannot be empty", { status: 400 })
  }

  if (id.length !== 8) {
    return new NextResponse("Wrong ID", { status: 400 })
  }

  if (hashPair(tripData.fromAddress, tripData.toAddress) !== id) {
    return new NextResponse("ID does not match Trip Data", { status: 400 })
  }

  try {
    // Ping the hcaptcha verify API to verify the captcha code you received
    const response = await fetch(`https://hcaptcha.com/siteverify`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: `response=${captchaCode}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
      method: "POST",
    })
    const captchaValidation = await response.json()
    /**
     * {
     *    "success": true|false,     // is the passcode valid, and does it meet security criteria you specified, e.g. sitekey?
     *    "challenge_ts": timestamp, // timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
     *    "hostname": string,        // the hostname of the site where the challenge was solved
     *    "credit": true|false,      // optional: whether the response will be credited
     *    "error-codes": [...]       // optional: any error codes
     *    "score": float,            // ENTERPRISE feature: a score denoting malicious activity.
     *    "score_reason": [...]      // ENTERPRISE feature: reason(s) for score. See BotStop.com for details.
     *  }
     */

    if (captchaValidation.success) {
      const response = await submitRoute(id, tripData)
      // Return 200 if everything is successful
      return NextResponse.json(response)
    }
    return new NextResponse("Unprocessable request, invalid capcha code", { status: 400 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Something went wrong", { status: 400 })
  }
}
