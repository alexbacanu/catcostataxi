import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { fetchLegal, fetchSingleLegal } from "@/lib/helpers/mongo";
import { getDictionary } from "@/lib/locale/get-dictionary";
import type { Locale } from "@/lib/locale/i18n-config";

export async function generateStaticParams({ params }: Props) {
  const legal = await fetchLegal("privacy", params.lang);
  return legal.map((document) => ({ version: document.version }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: dictionary.root.footer.privacy,
  };
}

type Props = {
  params: {
    lang: Locale;
    version: string;
  };
};

export default async function PrivacyHistoryVersionPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang);
  const legal = await fetchSingleLegal("privacy", params.lang, params.version);
  const lang = params.lang === "ro" ? "ro-RO" : "en-GB";

  if (!legal) return <section className="layout-mx flex-col items-start gap-y-4">{dictionary.legal.not_found}</section>;

  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <ul className="flex space-x-1 text-xs font-normal leading-4 text-gray-500">
        <li>{dictionary.legal.version}</li>
        <li>{legal.version}</li>
        <li>&middot;</li>
        <li>{dictionary.legal.modified}</li>
        <li>{new Date(legal.modified).toLocaleDateString(lang)}</li>
      </ul>
      <MDXRemote source={legal.markdown} />
    </section>
  );
}
