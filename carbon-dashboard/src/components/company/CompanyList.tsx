"use client";

import Link from "next/link";
import { memo, useCallback, useMemo, useState } from "react";

// Type
import { Company } from "@/types";

// Util
import { transformCountryCode } from "@/utils";

// Component
import NoItems from "../common/NoItems";

function CompanyListComponent({ companies }: { companies: Company[] }) {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(() => {
    if (!query) {
      alert("검색어를 입력해주세요.");
      return;
    }
    setSearchTerm(query.trim());
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  const filtered = useMemo(() => {
    if (!searchTerm) return companies;
    const lower = searchTerm.toLowerCase();
    return companies.filter((c) => c.name.toLowerCase().includes(lower) || transformCountryCode(c.country).toLowerCase().includes(lower));
  }, [companies, searchTerm]);

  return (
    <div className="h-full">
      <div className="flex justify-center items-center gap-8 mb-8">
        <input
          type="text"
          placeholder="회사명 또는 국가 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-6/12 px-3 py-2 border rounded-md outline-0 ring-0 border-gray-300"
        />
        <button type="button" onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600">
          검색
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">회사 목록</h1>

      {filtered?.length > 0 && (
        <ul className="space-y-4">
          {filtered.map((company) => (
            <li key={company.id}>
              <Link href={`/companies/${company.id}`} className="block px-4 py-2 rounded-md border hover:bg-gray-100">
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
