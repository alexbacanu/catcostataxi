import "server-only"
import { i18n } from "./i18n-config"
import type { Locale } from "./i18n-config"

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries: { [key: string]: () => Promise<{ [key: string]: { [key: string]: string } }> } = {
  ro: () => import("@/lib/dictionaries/ro.json").then((module) => module.default),
  en: () => import("@/lib/dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]()
