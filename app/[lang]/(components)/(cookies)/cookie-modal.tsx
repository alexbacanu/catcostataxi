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
  // const pathname = usePathname()

  useEffect(() => {
    // if (pathname === "/en/privacy" || pathname === "/ro/privacy") {
    // return
    // } else {
    run(pluginConfig)
    setLanguage(props.lang)
    // }
  }, [run, setLanguage, props.lang]) // pathname

  return null
}

export default CookieModal
