"use client"

import { Switch } from "@headlessui/react"
import { IconSend } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

export default function Contact() {
  const [agreed, setAgreed] = useState(false)

  return (
    <form action="#" method="POST" className="w-full space-y-6">
      <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="last-name"
            className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
          >
            Nume
          </label>
          <div className="mt-1">
            <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="input-base pl-2" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
          >
            Email
          </label>
          <div className="mt-1">
            <input type="email" name="email" id="email" autoComplete="email" className="input-base pl-2" />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold leading-6 text-neutral-800 dark:text-neutral-200"
          >
            Mesaj
          </label>
          <div className="mt-1">
            <textarea name="message" id="message" rows={4} className="input-base h-auto py-2 pl-2" defaultValue={""} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-2 text-sm">
        <Switch
          checked={agreed}
          onChange={setAgreed}
          className={`${
            agreed ? "bg-indigo-500" : "bg-white/10"
          } relative mx-1 inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              agreed ? "translate-x-[22px]" : "translate-x-1"
            } inline-block h-4 w-4 rounded-full bg-white transition`}
          />
        </Switch>
        <span className="w-full">
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
      <p className="text-sm">
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
      </p>
      <div>
        <button
          type="submit"
          disabled={!agreed}
          className="button-base button-primary flex w-full items-center gap-x-2 disabled:cursor-not-allowed"
        >
          <IconSend />
          Trimite
        </button>
      </div>
    </form>
  )
}
