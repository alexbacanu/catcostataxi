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
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  })

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
      // DO EMAIL HERE
      await transporter.sendMail({
        to: `CatCostaTaxi < ${process.env.CCT_EMAIL} >`,
        subject: `Contact Form: ${firstName}, ${lastName}`,
        text: `${email} - ${message}`,
      })
      // Return 200 if everything is successful
      return NextResponse.json(response)
    }
    return new NextResponse("Unprocessable request, invalid captcha code", { status: 400 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Something went wrong", { status: 400 })
  }
}
