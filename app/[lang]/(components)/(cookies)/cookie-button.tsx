"use client"

import * as CookieConsentApi from "vanilla-cookieconsent"
import "vanilla-cookieconsent/dist/cookieconsent.css"
import CookieModal from "./cookie-modal"

type Props = {
  lang: string
}

export default function CookieButton({ lang }: Props) {
  return (
    <>
      <CookieModal lang={lang} CookieConsentApi={CookieConsentApi} />
    </>
  )
}
