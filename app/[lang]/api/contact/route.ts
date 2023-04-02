import sendgrid from "@sendgrid/mail"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const {
    firstName,
    lastName,
    email,
    message,
    terms,
    hcaptcha,
  }: {
    firstName: string
    lastName: string
    email: string
    message: string
    terms: boolean
    hcaptcha: string
  } = await request.json()

  if (!hcaptcha) {
    return new NextResponse("Please pass captcha test", { status: 422 })
  }

  if (!terms) {
    return new NextResponse("Please accept the terms and conditions and privacy policy", {
      status: 400,
    })
  }

  if (!firstName || !lastName || !email || !message) {
    return new NextResponse("Please provide any required fields", { status: 400 })
  }

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "")

  try {
    // Ping the hcaptcha verify API to verify the captcha code you received
    const response = await fetch(`https://hcaptcha.com/siteverify`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: `response=${hcaptcha}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
      method: "POST",
    })
    const captchaValidation = await response.json()

    if (captchaValidation.success) {
      const mail = {
        to: "hey@catcostataxi.ro", // Change to your recipient
        from: "hey@catcostataxi.ro", // Change to your verified sender
        subject: `Contact Form: ${email}`,
        text: `Name: ${firstName} ${lastName}
Email: ${email}
Captcha validation: ${captchaValidation.success ? "Success" : "Fail"}
Privacy policy, Terms and conditions: ${terms ? "Agreed" : "Not agreed"}

Message: ${message}`,
      }

      await sendgrid.send(mail)
      // Return 200 if everything is successful
      return NextResponse.json(response)
    }
    return new NextResponse("Unprocessable request, invalid captcha code", { status: 400 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Something went wrong", { status: 400 })
  }
}
