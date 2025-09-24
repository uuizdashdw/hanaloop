"use client";

import { memo, useEffect, useMemo } from "react";

// Type
import { Country } from "@/types";

// Component
import CountryItem from "./CountryItem";
import SearchBar from "../common/SearchBar";
import { useSearchStore } from "@/store/search";
import { transformCountryCode } from "@/utils";
import NoItems from "../common/NoItems";

function CountryListComponent({ countries }: { countries: Country[] }) {
  const { search, setSearch } = useSearchStore();

  const filtered = useMemo(() => {
    if (!search) return countries;
    const lower = search.toLowerCase();
    return countries.filter((c) => c.name.toLowerCase().includes(lower) || transformCountryCode(c.code).toLowerCase().includes(lower));
  }, [countries, search]);

  return (
    <div className="h-full">
      {/* 검색바 영역 */}
      <SearchBar />

      {filtered?.length > 0 && (
        <ul className="space-y-4">
          {filtered?.map((country, idx) => (
            <CountryItem key={idx} country={country} idx={idx} />
          ))}
        </ul>
      )}

      {filtered?.length === 0 && <NoItems message="해당하는 국가가 없습니다." color="text-gray-400" />}
    </div>
  );
}

const CountryList = memo(CountryListComponent, (prev, next) => prev.countries === next.countries);
export default CountryList;
