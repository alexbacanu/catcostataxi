export const i18n = {
  defaultLocale: "ro",
  locales: ["ro", "en"],
}

export type Locale = (typeof i18n)["locales"][number]
