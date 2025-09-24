"use client";

import { usePostsStore } from "@/store/post";
import { Company } from "@/types";
import Link from "next/link";
import { useMemo } from "react";

type PostPageFilter = {
  companies: Company[];
  companyMap: {
    [key: string]: string;
  };
};

export default function PostPageFilter({ companies, companyMap }: PostPageFilter) {
  const { setSelectedCompany, setSelectedCountry, selectedMonth, setSelectedMonth, postList } = usePostsStore();

  const countries = useMemo(() => {
    return Array.from(new Set(companies.map((c) => c.country)));
  }, [companies]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <ul className="flex justify-between">
      <li>
        <Link href="/posts/new" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md">
          새 보고서 작성
        </Link>
      </li>
      <li className="flex items-center gap-4">
        <select value={selectedMonth ?? ""} onChange={(e) => setSelectedMonth(e.target.value || null)} className="border rounded px-2 py-1">
          <option value="">월별 보기</option>
          {months.map((m) => (
            <option key={m} value={m.toString().padStart(2, "0")}>
              {m}월
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedCompany(e.target.value || null)} className="border rounded px-2 py-1 outline-0 ring-0">
          <option value="">회사별 보기</option>
          {Object.entries(companyMap).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSelectedCountry(e.target.value || null)} className="border rounded px-2 py-1 outline-0 ring-0">
          <option value="">국가별 보기</option>
          {countries.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </li>
    </ul>
  );
}
