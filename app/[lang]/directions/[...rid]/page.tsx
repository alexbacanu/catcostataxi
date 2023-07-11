import { notFound } from "next/navigation";
import { fetchAllRoutesIds, fetchAvailableLocations, fetchCompaniesByLoc, fetchSingleRoute } from "@/lib/helpers/mongo";
import { normalizeString } from "@/lib/helpers/normalize-string";
import { getDictionary } from "@/lib/locale/get-dictionary";
import RouteDetails from "./(components)/route-details";
import RouteMap from "./(components)/route-map";
import TaxiPrices from "./(components)/taxi-prices";
import TaxiTable from "./(components)/taxi-table";
import type { Locale } from "@/lib/locale/i18n-config";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return process.env.CUSTOM_ENV === "production"
    ? (await fetchAllRoutesIds()).map(({ hash, selectedFrom, selectedTo }) => ({
        rid: [
          hash,
          normalizeString(selectedFrom.structured_formatting.main_text),
          normalizeString(selectedTo.structured_formatting.main_text),
        ],
      }))
    : [];
}

function replacePlaceholders(text: string, routeFrom: string, routeTo: string, shorten: boolean) {
  if (shorten) {
    routeFrom = routeFrom.slice(0, 18) + "..";
    routeTo = routeTo.slice(0, 18) + "..";
  }

  return text.replace("{routeFrom}", routeFrom).replace("{routeTo}", routeTo);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  const hash = params.rid[0];
  const siteUrl = process.env.SITE_URL || "";

  const { selectedFrom, selectedTo } = (await fetchSingleRoute(hash)) || {};
  const routeFrom = selectedFrom?.structured_formatting.main_text || "";
  const routeTo = selectedTo?.structured_formatting.main_text || "";

  const title = replacePlaceholders(dictionary.directions.meta.title, routeFrom, routeTo, true);
  const description = replacePlaceholders(dictionary.directions.meta.description, routeFrom, routeTo, true);
  const imageUrl = replacePlaceholders(
    dictionary.directions.meta.imageUrl.replace("{siteUrl}", siteUrl),
    routeFrom,
    routeTo,
    false,
  );
  const keywords = dictionary.directions.meta.keywords.map((keyword) =>
    replacePlaceholders(keyword, routeFrom, routeTo, false),
  );
  const url = dictionary.directions.meta.url
    .replace("{siteUrl}", siteUrl)
    .replace("{hash}", hash)
    .replace("{params.rid[1]}", params.rid[1])
    .replace("{params.rid[2]}", params.rid[2]);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 400,
        },
      ],
      siteName: "CatCostaTaxi",
      locale: params.lang === "ro" ? "ro_RO" : "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

type Props = {
  params: {
    lang: Locale;
    rid: string[];
  };
};

export default async function DirectionsPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang);

  if (params.rid[0].length !== 8 && typeof params.rid[0] !== "string") {
    notFound();
  }

  const [route, availableCities] = await Promise.all([fetchSingleRoute(params.rid[0]), fetchAvailableLocations()]);

  if (!route) {
    notFound();
  }

  let initialCompanies = await fetchCompaniesByLoc(route.selectedFrom.structured_formatting.secondary_text);
  if (initialCompanies?.length === 0 && route.selectedTo.structured_formatting.secondary_text) {
    initialCompanies = await fetchCompaniesByLoc(route.selectedTo.structured_formatting.secondary_text);
  }

  const initialCity = initialCompanies?.[0]?.city ?? "";

  return (
    <>
      <RouteDetails dictionary={dictionary} route={route} />
      <RouteMap dictionary={dictionary} route={route} lang={params.lang} />
      <TaxiPrices
        dictionary={dictionary}
        initialCompanies={initialCompanies}
        initialCity={initialCity}
        availableCities={availableCities}
      />
      <TaxiTable dictionary={dictionary} initialCompanies={initialCompanies} />
    </>
  );
}
