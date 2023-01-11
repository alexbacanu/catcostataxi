interface FooterItem {
  label: string;
  arialabel: string;
  href: string;
  icon: string;
}

export const FOOTER_ITEMS: Array<FooterItem> = [
  {
    label: "Contact us",
    arialabel: "Contact us page",
    href: "/contact",
    icon: "",
  },
  {
    label: "Terms and conditions",
    arialabel: "Terms and conditions page",
    href: "/legal/terms",
    icon: "",
  },
  {
    label: "Privacy policy",
    arialabel: "Privacy policy page",
    href: "/legal/privacy",
    icon: "",
  },
  {
    label: "Cookies",
    arialabel: "Cookies usage page",
    href: "/legal/cookies",
    icon: "",
  },
  {
    label: "GDPR",
    arialabel: "GDPR page",
    href: "/legal/gdpr",
    icon: "",
  },
];
