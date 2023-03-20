"use client"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconHourglassEmpty, IconSend } from "@tabler/icons-react"
import Link from "next/link"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "react-hot-toast"
import { z } from "zod"

export default function ContactForm() {
  // Zod
  const zodSchema = z.object({
    firstName: z.string().min(1, { message: "Câmp obligatoriu" }),
    lastName: z.string().min(1, { message: "Câmp obligatoriu" }),
    email: z.string().min(1, { message: "Câmp obligatoriu" }).email({
      message: "Vă rog introduceți un e-mail valid",
    }),
    message: z.string().min(1, { message: "Câmp obligatoriu" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "Acordul dvs. este necesar pentru a trimite mesajul",
    }),
    hcaptcha: z.string().min(1, { message: "Câmp obligatoriu" }),
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

      // Reset captcha
      captchaRef.current?.resetCaptcha()

      // Reset form
      reset()
      toast.success("E-mail trimis cu succes!")
    } catch (error) {
      toast.error("E-mailul nu a fost trimis, vă rugăm încercați mai târziu.")
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
          <div className="flex w-full flex-col">
            <div>
              <input id="terms" className="h-4 w-4" type="checkbox" {...register("terms")} />
              <span className="w-auto px-2">
                Sunt de acord cu{" "}
                <Link className="text-amber-500" href="/privacy">
                  Politica de confidențialitate
                </Link>{" "}
                si{" "}
                <Link className="text-amber-500" href="/terms">
                  Termeni și condiții
                </Link>
              </span>
              {errors.terms && <span className="text-xs italic text-red-500">{errors.terms.message}</span>}
            </div>
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
          {isSubmitting ? (
            <>
              <IconHourglassEmpty />
              <span>Se trimite...</span>
            </>
          ) : (
            <>
              <IconSend />
              <span>Trimite</span>
            </>
          )}
        </button>
      </div>
      <Toaster />
    </form>
  )
}
