"use client";

import { IconList, IconPhone } from "@tabler/icons-react";
import Image from "next/image";
import { Dictionary } from "@/lib/locale/get-dictionary";
import useLocationStore from "@/lib/stores/location-store";
import type { Company } from "@/lib/helpers/mongo";

type Props = {
  dictionary: Dictionary;
  initialCompanies?: Company[];
};

export default function TaxiTable({ dictionary, initialCompanies }: Props) {
  const companiesArray = useLocationStore((state) => state.companies);
  const fetchedCompanies = companiesArray.length !== 0 ? companiesArray : initialCompanies;

  return (
    <section className="layout-mx flex flex-col">
      <div className="card-base flex w-full flex-col justify-between gap-y-2 px-6 py-4">
        {/* Title */}
        <div className="flex items-center">
          <IconList />
          <span className="pl-2">{dictionary.directions.taxi_table.taxi_list}</span>
        </div>

        {/* List */}
        <div className="flex flex-col gap-y-2">
          {fetchedCompanies?.some((item) => item.placeholder === false) ? (
            fetchedCompanies
              .filter((item) => item.placeholder === false)
              .map((company, index) => (
                <div key={index} className="flex items-center gap-x-2 py-1">
                  <div className="hidden md:block">
                    <Image src="/taxi_driver_two_color.svg" alt="Taxi driver" width={80} height={60} />
                  </div>
                  <div className="flex-auto">
                    <div className="whitespace-nowrap capitalize tracking-tighter">{company.name}</div>
                    <div className="text-sm italic">
                      @<span className="pl-1">{company.city}</span>
                    </div>
                  </div>
                  <button className="button-base button-primary flex">
                    <span className="pr-1">{company.phone}</span>
                    <IconPhone />
                  </button>
                </div>
              ))
          ) : (
            <div className="flex items-center gap-x-2 py-1 italic">
              {dictionary.directions.taxi_table.no_taxi_found}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
