"use client";

import { useCallback, useEffect } from "react";

// Hook
import { useSearchStore } from "@/store/search";
import { usePathname } from "next/navigation";

export default function SearchBar() {
  const { setSearch, query, setQuery } = useSearchStore();
  const pathname = usePathname();

  const handleSearch = useCallback(() => {
    if (!query) {
      alert("검색어를 입력해주세요.");
      return;
    }

    setSearch(query.trim());
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    handleSearch();
  };

  useEffect(() => {
    setSearch("");
    setQuery("");
  }, [pathname]);

  return (
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
  );
}
