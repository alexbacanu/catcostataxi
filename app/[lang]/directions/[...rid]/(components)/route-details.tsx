import { Dictionary } from "@/lib/locale/get-dictionary";
import type { Route } from "@/lib/helpers/mongo";

type RouteDetailsProps = {
  dictionary: Dictionary;
  route: Route;
};

export default function RouteDetails({ dictionary, route }: RouteDetailsProps) {
  function replacePlaceholders(text: string, routeFrom: string, routeTo: string) {
    return text.replace("{routeFrom}", routeFrom).replace("{routeTo}", routeTo);
  }

  return (
    <section className="bg-gradient-to-b from-amber-400 to-amber-500 text-neutral-800 shadow-md transition">
      <div className="layout-mx mb-6 flex-col items-start gap-x-6 gap-y-2 pt-0 md:flex-row">
        <h1 className="sr-only">
          {replacePlaceholders(
            dictionary.directions.meta.description,
            route.selectedFrom.structured_formatting.main_text,
            route.selectedTo.structured_formatting.main_text,
          )}
        </h1>

        <RouteInfo
          title={dictionary.directions.route_details.from}
          main_text={route.selectedFrom.structured_formatting.main_text}
          secondary_text={route.selectedFrom.structured_formatting.secondary_text}
        />
        <RouteInfo
          title={dictionary.directions.route_details.to}
          main_text={route.selectedTo.structured_formatting.main_text}
          secondary_text={route.selectedTo.structured_formatting.secondary_text}
        />
      </div>
    </section>
  );
}

type RouteInfoProps = {
  title: string;
  main_text: string;
  secondary_text: string;
};

export const RouteInfo = ({ title, main_text, secondary_text }: RouteInfoProps) => {
  return (
    <div className="space-y-2 text-lg">
      <h2 className="text-3xl font-extrabold tracking-tighter md:text-4xl">{title}</h2>
      <div className="line-clamp-2 border border-dashed border-neutral-800/80 px-2 py-1 font-bold leading-tight shadow-md">
        {main_text}
        <span className="pl-1 text-sm font-normal italic">{secondary_text}</span>
      </div>
    </div>
  );
};
