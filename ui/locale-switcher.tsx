"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dictionary } from "@/lib/locale/get-dictionary"
import type { Locale } from "@/lib/locale/i18n-config"

type Props = {
  lang: Locale
  dictionary: Dictionary
}

export default function LocaleSwitcher({ lang, dictionary }: Props) {
  const pathName = usePathname()
  const switchLanguage = lang === "ro" ? "en" : "ro"

  const redirectedPathName = () => {
    if (!pathName) return "/"
    const segments = pathName.split("/")
    segments[1] = switchLanguage

    return segments.join("/")
  }

  return (
    <div className="flex items-center gap-x-2 text-xl text-neutral-800">
      <Link href={{ pathname: redirectedPathName() }} aria-label={dictionary.root.header.language}>
        <FlagIcon className="h-8 rounded-md shadow-md" locale={lang} />
      </Link>
    </div>
  )
}

const FlagIcon = ({ className, locale }: { className?: string; locale: Locale }) => {
  if (locale === "ro") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="flag-icons-gb"
        viewBox="0 0 640 480"
        className={className}
      >
        <path fill="#012169" d="M0 0h640v480H0z" />
        <path
          fill="#FFF"
          d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
        />
        <path
          fill="#C8102E"
          d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
        />
        <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
        <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
      </svg>
    )
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="flag-icons-ro"
        viewBox="0 0 640 480"
        className={className}
      >
        <g fillRule="evenodd" strokeWidth="1pt">
          <path fill="#00319c" d="M0 0h213.3v480H0z" />
          <path fill="#ffde00" d="M213.3 0h213.4v480H213.3z" />
          <path fill="#de2110" d="M426.7 0H640v480H426.7z" />
        </g>
      </svg>
    )
  }
}
