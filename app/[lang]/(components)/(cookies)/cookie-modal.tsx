"use client"

// import { usePathname } from "next/navigation"
import { useEffect } from "react"
import pluginConfig from "./cookie-config"
import type CookieConsent from "vanilla-cookieconsent"

interface Props {
  CookieConsentApi: typeof CookieConsent
  lang: string
}

const CookieModal = (props: Props) => {
  const { run, setLanguage } = props.CookieConsentApi

  useEffect(() => {
    run(pluginConfig)
    setLanguage(props.lang)
  }, [run, setLanguage, props.lang])

  return null
}

export default CookieModal
