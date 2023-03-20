"use client"

import useAddressStore from "@/stores/addressStore"
import Image from "next/image"

export default function PopularRoutesAirplane() {
  const popularRoutes = [
    {
      city: "Arad",
      destination: "Arad (ARW)",
      routeData: {
        description: "Arad International Airport, Aleea Aeroport, Arad, Romania",
        matched_substrings: [],
        place_id: "ChIJm_hDs4KYRUcR2snoxEYE0SM",
        reference: "ChIJm_hDs4KYRUcR2snoxEYE0SM",
        structured_formatting: {
          main_text: "Arad International Airport",
          main_text_matched_substrings: [],
          secondary_text: "Aleea Aeroport, Arad, Romania",
          secondary_text_matched_substrings: [],
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Bacău",
      destination: "George Enescu Bacău (BCM)",
      routeData: {
        description: "George Enescu International Airport, Strada Aeroportului, Bacău, Romania",
        matched_substrings: [],
        place_id: "ChIJJVrzdpBxtUARzrhil8aHd44",
        reference: "ChIJJVrzdpBxtUARzrhil8aHd44",
        structured_formatting: {
          main_text: "George Enescu International Airport",
          main_text_matched_substrings: [],
          secondary_text: "Strada Aeroportului, Bacău, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Baia Mare",
      destination: "Maramureș Baia Mare (BAY)",
      routeData: {
        description: "Aeroportul Internațional Maramureş Baia Mare, Tăuții-Măgherăuș, Romania",
        matched_substrings: [],
        place_id: "ChIJgbCh3_fdN0cRQ7fb7HMSRjw",
        reference: "ChIJgbCh3_fdN0cRQ7fb7HMSRjw",
        structured_formatting: {
          main_text: "Aeroportul Internațional Maramureş Baia Mare",
          main_text_matched_substrings: [],
          secondary_text: "Tăuții-Măgherăuș, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "București",
      destination: "Henri Coandă București (OTP)",
      routeData: {
        description: "Aeroportul Internațional Henri Coandă (OTP), Calea Bucureştilor, Otopeni, Romania",
        matched_substrings: [],
        place_id: "ChIJd49YtoEcskARfodtna1dThE",
        reference: "ChIJd49YtoEcskARfodtna1dThE",
        structured_formatting: {
          main_text: "Aeroportul Internațional Henri Coandă (OTP)",
          main_text_matched_substrings: [],
          secondary_text: "Calea Bucureştilor, Otopeni, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Cluj-Napoca",
      destination: "Avram Iancu Cluj (CLJ)",
      routeData: {
        description: "Aeroportul Internațional Avram Iancu Cluj-Napoca (CLJ), Strada Traian Vuia, Cluj-Napoca, Romania",
        matched_substrings: [],
        place_id: "ChIJJXml-WQLSUcRLtn-GiTYiyQ",
        reference: "ChIJJXml-WQLSUcRLtn-GiTYiyQ",
        structured_formatting: {
          main_text: "Aeroportul Internațional Avram Iancu Cluj-Napoca (CLJ)",
          main_text_matched_substrings: [],
          secondary_text: "Strada Traian Vuia, Cluj-Napoca, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Craiova",
      destination: "Craiova (CRA)",
      routeData: {
        description: "Aeroportul Internațional Craiova, Calea București, Craiova, Romania",
        matched_substrings: [],
        place_id: "ChIJacWVAiDUUkcRabz12pg8Tz4",
        reference: "ChIJacWVAiDUUkcRabz12pg8Tz4",
        structured_formatting: {
          main_text: "Aeroportul Internațional Craiova",
          main_text_matched_substrings: [],
          secondary_text: "Calea București, Craiova, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Constanța",
      destination: "Mihail Kogălniceanu Constanța (CND)",
      routeData: {
        description: "Mihail Kogălniceanu International Airport, Strada Tudor Vladimirescu, Romania",
        matched_substrings: [],
        place_id: "ChIJnYMAg_qKukARfxuucKL_SP8",
        reference: "ChIJnYMAg_qKukARfxuucKL_SP8",
        structured_formatting: {
          main_text: "Mihail Kogălniceanu International Airport",
          main_text_matched_substrings: [],
          secondary_text: "Strada Tudor Vladimirescu, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Iași",
      destination: "Iași (IAS)",
      routeData: {
        description: "Aeroportul Internațional Iași, Iași Airport Heliport, Drumul Aeroportului, Iași, Romania",
        matched_substrings: [],
        place_id: "ChIJ-WOHOGT8ykARFqPgceQbDuk",
        reference: "ChIJ-WOHOGT8ykARFqPgceQbDuk",
        structured_formatting: {
          main_text: "Iași Airport Heliport",
          main_text_matched_substrings: [],
          secondary_text: "Aeroportul Internațional Iași, Drumul Aeroportului, Iași, Romania",
          secondary_text_matched_substrings: [],
        },
        terms: [],
        types: ["premise", "airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Oradea",
      destination: "Oradea (OMR)",
      routeData: {
        description: "Aeroportul Internaţional Oradea, Calea Aradului, Oradea, Romania",
        matched_substrings: [],
        place_id: "ChIJTx9pKAtHRkcRc6VtNQzH-UQ",
        reference: "ChIJTx9pKAtHRkcRc6VtNQzH-UQ",
        structured_formatting: {
          main_text: "Aeroportul Internaţional Oradea",
          main_text_matched_substrings: [],
          secondary_text: "Calea Aradului, Oradea, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Satu Mare",
      destination: "Satu Mare (SUJ)",
      routeData: {
        description: "Aeroportul Internațional Satu Mare, Satu Mare, Romania",
        matched_substrings: [],
        place_id: "ChIJ49ub7LAAOEcRgxsK53h2HJE",
        reference: "ChIJ49ub7LAAOEcRgxsK53h2HJE",
        structured_formatting: {
          main_text: "Aeroportul Internațional Satu Mare",
          main_text_matched_substrings: [],
          secondary_text: "Satu Mare, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Sibiu",
      destination: "Sibiu (SBZ)",
      routeData: {
        description: "Aeroportul Internațional Sibiu, SBZ ATCT, Șoseaua Alba Iulia, Sibiu, Romania",
        matched_substrings: [],
        place_id: "ChIJ1YKNva5CTEcR_LgcY69S9nk",
        reference: "ChIJ1YKNva5CTEcR_LgcY69S9nk",
        structured_formatting: {
          main_text: "SBZ ATCT",
          main_text_matched_substrings: [],
          secondary_text: "Aeroportul Internațional Sibiu, Șoseaua Alba Iulia, Sibiu, Romania",
          secondary_text_matched_substrings: [],
        },
        terms: [],
        types: ["premise", "geocode"],
      },
    },
    {
      city: "Suceava",
      destination: "Ștefan cel Mare Suceava (SCV)",
      routeData: {
        description: 'Aeroportul Internațional "Ștefan cel Mare" Suceava, Orașul Salcea, Romania',
        matched_substrings: [],
        place_id: "ChIJmTuwDgb7NEcRHn0JKxGDy44",
        reference: "ChIJmTuwDgb7NEcRHn0JKxGDy44",
        structured_formatting: {
          main_text: 'Aeroportul Internațional "Ștefan cel Mare" Suceava',
          main_text_matched_substrings: [],
          secondary_text: "Orașul Salcea, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Târgu Mureș",
      destination: "Transilvania Târgu Mureș (TGM)",
      routeData: {
        description: "Târgu Mureș Transilvania Airport, DN15, Ungheni, Romania",
        matched_substrings: [],
        place_id: "ChIJV2mbniTHS0cRSqMhdVOSJZk",
        reference: "ChIJV2mbniTHS0cRSqMhdVOSJZk",
        structured_formatting: {
          main_text: "Târgu Mureș Transilvania Airport",
          main_text_matched_substrings: [],
          secondary_text: "DN15, Ungheni, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
    {
      city: "Timişoara",
      destination: "Timişoara (TSR)",
      routeData: {
        description: "Timișoara International Airport, Strada Aeroportului, Timișoara, Romania",
        matched_substrings: [],
        place_id: "ChIJRQFUJVRhRUcR-C4yT1Y4KWk",
        reference: "ChIJRQFUJVRhRUcR-C4yT1Y4KWk",
        structured_formatting: {
          main_text: "Timișoara International Airport",
          main_text_matched_substrings: [],
          secondary_text: "Strada Aeroportului, Timișoara, Romania",
        },
        terms: [],
        types: ["airport", "point_of_interest", "establishment"],
      },
    },
  ]

  return (
    <section className="layout-mx">
      <Image
        src="/undraw_airport.svg"
        alt="Recent routes"
        className="hidden p-6 md:flex"
        width={550 * 0.65}
        height={488.5 * 0.65}
        priority
      />

      <div className="card-base flex">
        <div className="flex flex-col items-center">
          <h2 className="pb-4">Selectează rapid un aeroport</h2>
          <div className="flex flex-wrap justify-center">
            {popularRoutes.map((obj) => (
              <button
                key={obj.city}
                className="button-secondary m-1 cursor-pointer rounded-lg py-2 px-4 text-sm font-medium hover:bg-teal-900 hover:text-neutral-200"
                onClick={() => useAddressStore.setState({ addressFrom: obj.routeData })}
              >
                {obj.destination}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
