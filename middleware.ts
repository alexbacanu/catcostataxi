import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

import { NextResponse } from "next/server"
import { i18n } from "@/lib/locale/i18n-config"
import type { NextRequest } from "next/server"

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locales: string[] = i18n.locales
  return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  const allowedPathnamePattern = new RegExp(
    "^/(" +
      [
        "favicon\\.ico",
        "taxi-(black|yellow)\\.png",
        "logo\\.svg",
        "taxi_driver_two_color\\.svg",
        "undraw_(airport|duplicate|exploring|right_direction|subway)\\.svg",
        "robots\\.txt",
        "sitemap(-\\d+)?\\.xml",
      ].join("|") +
      ")$"
  )

  if (allowedPathnamePattern.test(pathname)) {
    return
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }

  return
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image).*)"],
}
