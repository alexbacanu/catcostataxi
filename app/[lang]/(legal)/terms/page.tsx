import { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { fetchLegal } from "@/lib/helpers/mongo";
import { getDictionary } from "@/lib/locale/get-dictionary";
import type { Locale } from "@/lib/locale/i18n-config";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);

  return {
    title: dictionary.root.footer.terms,
  };
}

export const revalidate = 43200; // 12 hours

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function TermsPage({ params }: Props) {
  const dictionary = await getDictionary(params.lang);
  const legal = await fetchLegal("terms", params.lang);
  const lang = params.lang === "ro" ? "ro-RO" : "en-GB";

  const currentDocument = legal[0];

  return (
    <section className="layout-mx flex-col items-start gap-y-4">
      <ul className="flex space-x-1 text-xs font-normal leading-4 text-gray-500">
        <li>{dictionary.legal.version}</li>
        <li>{currentDocument.version}</li>
        <li>&middot;</li>
        <li>{dictionary.legal.modified}</li>
        <li>{new Date(currentDocument.modified).toLocaleDateString(lang)}</li>
        <li>&middot;</li>
        <li>
          <Link href={`/${params.lang}/terms/history`}>{dictionary.legal.history}</Link>
        </li>
      </ul>
      <MDXRemote source={currentDocument.markdown} />
    </section>
  );
}
