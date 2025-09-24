"use client";

import Link from "next/link";

// Type
import { Country } from "@/types";

// Util
import { transformCountryCode } from "@/utils";
import { memo } from "react";

function CountryItemComponent({ country, idx }: { country: Country; idx: number }) {
  return (
    <li key={`${country.code}${idx}`}>
      <Link
        href={`/countries/${country.code}`}
        className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm
                      transition-transform duration-200 ease-in-out
                      hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
      >
        <span className="text-lg">{transformCountryCode(country.code)} </span>
        <span>
          ({country?.name}, {country.code})
        </span>
      </Link>
    </li>
  );
}

const CountryItem = memo(CountryItemComponent, (prev, next) => prev.country === next.country);
export default CountryItem;
