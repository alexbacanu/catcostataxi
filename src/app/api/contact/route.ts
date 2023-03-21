import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

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
    return new NextResponse("Please accept the terms and conditions", { status: 400 })
  }

  if (!firstName || !lastName || !email || !message) {
    return new NextResponse("Please provide any required fields", { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const options = {
    sender: email,
    replyTo: email,
    to: `CatCostaTaxi <${process.env.EMAIL_USERNAME}>`,
    subject: `Contact Form: ${firstName} ${lastName} (${email})`,
    text: message,
  }

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
      transporter.sendMail(options, (error, info) => {
        if (error) console.log(error)
        else console.log(info)
      })
      // Return 200 if everything is successful
      return NextResponse.json(response)
    }
    return new NextResponse("Unprocessable request, invalid captcha code", { status: 400 })
  } catch (error) {
    console.error(error)
    return new NextResponse("Something went wrong", { status: 400 })
  }
}
