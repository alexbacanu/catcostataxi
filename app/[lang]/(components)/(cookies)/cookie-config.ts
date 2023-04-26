import type { CookieConsentConfig } from "vanilla-cookieconsent"

const pluginConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "cloud",
      position: "bottom center",
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
    },
  },

  // onFirstConsent: function () {
  //   console.log("onFirstAction fired")
  // },

  // onConsent: function () {
  //   console.log("onConsent fired ...")
  // },

  // onChange: function () {
  //   console.log("onChange fired ...")
  // },

  cookie: {
    expiresAfterDays: 356,
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      readOnly: false,
      enabled: true,
      autoClear: {
        cookies: [
          {
            name: /^(_ga)/,
          },
        ],
        reloadPage: false,
      },
    },
    advertising: {
      readOnly: false,
      enabled: true,
      autoClear: {
        cookies: [
          {
            name: /^(__gads|__gpi)/,
          },
        ],
        reloadPage: false,
      },
    },
  },

  // disablePageInteraction: true,

  language: {
    default: "en",

    translations: {
      en: {
        consentModal: {
          title: "We care that your personal data remains confidential!",
          description:
            'We use cookies to personalise content and ads and to analyse our traffic. We also share information about your use of the website with our advertising and analytics partners. You may read more about any purposes or vendors that we use by clicking <a href="#" data-cc="show-preferencesModal">Cookie preferences</a>. This preference center is accessible at any time through the <a href="#" data-cc="show-preferencesModal">Cookie settings</a> button located on every page.',
          acceptAllBtn: "Accept",
          // acceptNecessaryBtn: "Accept only necesary",
          showPreferencesBtn: "Cookie preferences",
          footer: `<a href="/en/privacy">Privacy Policy</a>`,
        },
        preferencesModal: {
          title: "Cookie preferences",
          acceptNecessaryBtn: "Accept only necessary",
          acceptAllBtn: "Accept all",
          savePreferencesBtn: "Accept selected",
          closeIconLabel: "Close",
          sections: [
            {
              title: "Cookie Usage",
              description:
                'We use cookies to personalise content and ads and to analyse our traffic. We also share information about your use of the website with our advertising and analytics partners. You may read more about any purposes or vendors that we use by clicking <a href="#" data-cc="show-preferencesModal">Cookie preferences</a>. This preference center is accessible at any time through the <a href="#" data-cc="show-preferencesModal">Cookie settings</a> button located on every page.',
            },
            {
              title: "Strictly necessary cookies",
              description:
                "Necessary cookies are essential for the proper functioning of a website and cannot be deactivated. These cookies do not store any personally identifiable information and are used solely for technical purposes, such as maintaining session information and facilitating navigation.",
              linkedCategory: "necessary",
              cookieTable: {
                headers: {
                  name: "Name",
                  domain: "Service",
                  description: "Description",
                  expiration: "Expiration",
                },
                body: [
                  {
                    name: "cc_cookie",
                    domain: "Cookie Consent",
                    description:
                      'Cookie set by <a href="https://cookieconsent.orestbida.com/">Cookie Consent v3</a>.',
                    expiration: "Expires after 12 months",
                  },
                ],
              },
            },
            {
              title: "Performance and analytics cookies",
              description:
                "Performance and analytics cookies are used to track website visitors and their user behavior. This data is then used to improve the way the website works and in turn, used to improve user experience.",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "Name",
                  domain: "Service",
                  description: "Description",
                  expiration: "Expiration",
                },
                body: [
                  {
                    name: "_ga, _ga_*",
                    domain: "Google Analytics",
                    description:
                      'Cookie set by <a href="https://www.google.com/intl/analytics/policies/privacy/">Google Analytics</a>.',
                    expiration: "Expires after 12 months",
                  },
                ],
              },
            },
            {
              title: "Advertising cookies",
              description:
                "Our website uses advertising cookies to display personalized advertisements and promotional content based on your browsing behavior and preferences.",
              linkedCategory: "advertising",
              cookieTable: {
                headers: {
                  name: "Name",
                  domain: "Service",
                  description: "Description",
                  expiration: "Expiration",
                },
                body: [
                  {
                    name: "__gads, __gpi",
                    domain: "Google Adsense",
                    description:
                      'Cookie set by <a href="https://www.google.com/intl/adsense/policies/privacy/">Google Adsense</a>.',
                    expiration: "Expires after 12 months",
                  },
                ],
              },
            },
          ],
        },
      },

      ro: {
        consentModal: {
          title: "Ne pasă ca datele tale personale să rămână confidențiale!",
          description:
            'Folosim cookie-uri pentru a personaliza conținutul site-ului, reclamele și pentru a ne analiza traficul. De asemenea, împărtășim informații despre utilizarea de către dvs. a site-ului web cu partenerii noștri de publicitate și analiză. Puteți citi mai multe despre orice scop sau furnizori pe care îi folosim făcând clic pe <a href="#" data-cc="show-preferencesModal">Preferințe cookie-uri</a>. Acest centru de preferințe este accesibil în orice moment prin intermediul butonului <a href="#" data-cc="show-preferencesModal">Setări cookies</a> situat pe fiecare pagină.',
          // acceptNecessaryBtn: "Acceptă doar necesare",
          acceptAllBtn: "Acceptă",
          showPreferencesBtn: "Preferințe cookie-uri",
          footer: `<a href="/ro/privacy">Politica de confidențialitate</a>`,
        },
        preferencesModal: {
          title: "Preferințe cookie-uri",
          acceptAllBtn: "Acceptă toate",
          acceptNecessaryBtn: "Acceptă doar necesare",
          savePreferencesBtn: "Acceptă selectate",
          closeIconLabel: "Închide",
          sections: [
            {
              title: "Utilizarea cookie-urilor",
              description:
                'Folosim cookie-uri pentru a personaliza conținutul site-ului, reclamele și pentru a ne analiza traficul. De asemenea, împărtășim informații despre utilizarea de către dvs. a site-ului web cu partenerii noștri de publicitate și analiză. Puteți citi mai multe despre orice scop sau furnizori pe care îi folosim făcând clic pe <a href="#" data-cc="show-preferencesModal">Preferințe cookie-uri</a>. Acest centru de preferințe este accesibil în orice moment prin intermediul butonului <a href="#" data-cc="show-preferencesModal">Setări cookies</a> situat pe fiecare pagină.',
            },
            {
              title: "Cookie-uri strict necesare",
              description:
                "Cookie-urile necesare sunt esențiale pentru funcționarea corectă a unui site web și nu pot fi dezactivate. Aceste cookie-uri nu stochează nicio informație de identificare personală și sunt utilizate exclusiv în scopuri tehnice, cum ar fi menținerea informațiilor de sesiune și facilitarea navigării.",
              linkedCategory: "necessary",
              cookieTable: {
                headers: {
                  name: "Nume",
                  domain: "Serviciu",
                  description: "Descriere",
                  expiration: "Expirare",
                },
                body: [
                  {
                    name: "cc_cookie",
                    domain: "Cookie Consent",
                    description:
                      'Cookie setat de <a href="https://cookieconsent.orestbida.com/">Cookie Consent v3</a>.',
                    expiration: "Expiră după 12 luni",
                  },
                ],
              },
            },
            {
              title: "Cookie-uri de performanță și analiză",
              description:
                "Cookie-urile de performanță și analiză sunt utilizate pentru a urmări vizitatorii site-ului web și comportamentul lor de utilizare. Aceste date sunt utilizate pentru a îmbunătăți modul de funcționare a site-ului web și, în consecință, pentru a îmbunătăți experiența utilizatorului.",
              linkedCategory: "analytics",
              cookieTable: {
                headers: {
                  name: "Nume",
                  domain: "Serviciu",
                  description: "Descriere",
                  expiration: "Expirare",
                },
                body: [
                  {
                    name: "_ga, _ga_*",
                    domain: "Google Analytics",
                    description:
                      'Cookie setat de <a href="https://www.google.com/intl/analytics/policies/privacy/">Google Analytics</a>.',
                    expiration: "Expiră după 12 luni",
                  },
                ],
              },
            },
            {
              title: "Cookie-uri de publicitate",
              description:
                "Site-ul nostru web folosește cookie-uri de publicitate pentru a afișa reclame personalizate și conținut promoțional bazat pe comportamentul și preferințele dumneavoastră de navigare.",
              linkedCategory: "advertising",
              cookieTable: {
                headers: {
                  name: "Nume",
                  domain: "Serviciu",
                  description: "Descriere",
                  expiration: "Expirare",
                },
                body: [
                  {
                    name: "__gads, __gpi",
                    domain: "Google Adsense",
                    description:
                      'Cookie setat de <a href="https://www.google.com/intl/adsense/policies/privacy/">Google Adsense</a>.',
                    expiration: "Expiră după 12 luni",
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
}

export default pluginConfig
