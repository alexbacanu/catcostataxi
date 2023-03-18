"use client"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconSend } from "@tabler/icons-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function Contact() {
  // Zod
  const zodSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    message: z.string().min(1, { message: "Message is required" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    hcaptcha: z.string().min(1, { message: "Captcha is required" }),
  })

  type ValidationSchema = z.infer<typeof zodSchema>

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(zodSchema),
  })

  // HCaptcha
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)

  const onCaptchaChange = (token: string) => {
    setCaptchaToken(token)
  }

  const onSubmit = async (data: ValidationSchema) => {
    if (!captchaToken) return

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.error(response.status, response.statusText)
        throw new Error("Network response was not ok.")
      }

      captchaRef.current?.resetCaptcha()
      reset()
    } catch (error) {
      alert("Failed to send message, please try again later.")
    }
  }

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
            >
              Prenume
            </label>
            {errors.firstName && <p className="text-xs italic text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="mt-1">
            <input type="text" id="name" autoComplete="name" className="input-base pl-2" {...register("firstName")} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
            >
              Nume
            </label>
            {errors.lastName && <p className="text-xs italic text-red-500">{errors.lastName.message}</p>}
          </div>
          <div className="mt-1">
            <input type="text" id="name" autoComplete="name" className="input-base pl-2" {...register("lastName")} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
            >
              Email
            </label>
            {errors.email && <p className="text-xs italic text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mt-1">
            <input type="email" id="email" autoComplete="email" className="input-base pl-2" {...register("email")} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center gap-x-4">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
            >
              Mesaj
            </label>
            {errors.message && <p className="text-xs italic text-red-500">{errors.message.message}</p>}
          </div>
          <div className="mt-1">
            <textarea
              id="message"
              rows={4}
              className="input-base h-auto py-2 pl-2"
              defaultValue={""}
              {...register("message")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-sm">
        <div className="flex w-full items-center gap-x-2">
          <div className="flex w-full grow flex-col">
            <div>
              <input id="terms" className="h-4 w-4" type="checkbox" {...register("terms")} />
              <span className="w-auto px-2">
                Sunt de acord cu{" "}
                <Link className="text-amber-500" href="/privacy">
                  Politica de confidentialitate
                </Link>{" "}
                si{" "}
                <Link className="text-amber-500" href="/terms">
                  Termeni si conditii
                </Link>
              </span>
            </div>
            {errors.terms && <p className="text-xs italic text-red-500">{errors.terms.message}</p>}
          </div>
          <div className="flex flex-col">
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
              onVerify={(token) => {
                onCaptchaChange(token)
                setValue("hcaptcha", token, { shouldValidate: true })
              }}
              ref={captchaRef}
              theme="dark"
            />
            {errors.hcaptcha && <p className="text-xs italic text-red-500">{errors.hcaptcha.message}</p>}
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        <button
          type="submit"
          className="button-base button-primary flex w-full items-center gap-x-2 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          <IconSend />
          {isSubmitting ? "Se trimite..." : "Trimite"}
        </button>
      </div>
      {/* <p className="text-sm">
        Acest site este protejat de{" "}
        <a className="text-amber-500" href="https://www.hCaptcha.com">
          hCaptcha
        </a>{" "}
        și se aplică{" "}
        <a className="italic text-amber-500" href="https://www.hcaptcha.com/privacy">
          Politica de confidențialitate
        </a>{" "}
        și{" "}
        <a className="italic text-amber-500" href="https://www.hcaptcha.com/terms">
          Termenii și condițiile
        </a>{" "}
        serviciului.
      </p> */}
    </form>
  )
}
