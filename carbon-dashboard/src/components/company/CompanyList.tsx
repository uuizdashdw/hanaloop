"use client";

import Link from "next/link";
import { memo, useEffect, useMemo } from "react";

// Type
import { Company } from "@/types";

// Util
import { transformCountryCode } from "@/utils";

// Component
import NoItems from "../common/NoItems";
import SearchBar from "../common/SearchBar";

// Hook
import { useSearchStore } from "@/store/search";

function CompanyListComponent({ companies }: { companies: Company[] }) {
  const { search, setSearch } = useSearchStore();

  const filtered = useMemo(() => {
    if (!search) return companies;
    const lower = search.toLowerCase();
    return companies.filter((c) => c.name.toLowerCase().includes(lower) || transformCountryCode(c.country).toLowerCase().includes(lower));
  }, [companies, search]);

  return (
    <div className="h-full">
      {/* 검색 바 영역 */}
      <SearchBar />

      <h1 className="text-2xl font-bold mb-4">회사 목록</h1>

      {filtered?.length > 0 && (
        <ul className="space-y-4">
          {filtered.map((company) => (
            <li key={company.id}>
              <Link
                href={`/companies/${company.id}`}
                className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm
                      transition-transform duration-200 ease-in-out
                      hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span className="text-lg">{company.name}</span> <span>({transformCountryCode(company.country)})</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {filtered?.length === 0 && <NoItems message="검색 결과가 없습니다" color="text-gray-400" />}
    </div>
  );
}

const CompanyList = memo(CompanyListComponent, (prev, next) => prev.companies === next.companies);

export default CompanyList;
