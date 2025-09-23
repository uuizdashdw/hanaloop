"use client";

// API
import { fetchCompanies } from "@/lib/api";

// Tanstack Query
import { useQuery } from "@tanstack/react-query";

// Components
import Loading from "../common/Loading";
import ErrorModal from "../common/ErrorModal";

// Type
import { Company } from "@/types";

// React Hooks
import { useMemo, useState } from "react";

// Dynamic Import
import dynamic from "next/dynamic";

// Utils
import { COUNTRY_MAP, generateColors, generateYearMonthRangeFromData } from "@/utils";
import { useFilteredEmissions } from "@/hooks/useFilteredEmissions";

const BaseLineChart = dynamic(() => import("@/components/common/BaseLineChart"), { ssr: false });

const PERIODS = [1, 3, 6, 12];

export default function CompanyChart() {
  const {
    data: companies,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Company[], Error>({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    retry: 1,
  });

  const { filteredData, keys, period, setPeriod } = useFilteredEmissions({ companies });
  return (
    <>
      <section>
        <div className="mb-10">
          <ul className="flex gap-2 mb-4">
            {PERIODS.map((p) => (
              <li
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-md border text-sm transition-colors cursor-pointer ${
                  period === p ? "bg-blue-500 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <p>{`최근 ${p}개월 추이`}</p>
              </li>
            ))}
          </ul>

          <p className="text-gray-500 text-sm mb-4">데이터 기준으로 최근 {period}개월 동안의 배출량 변화를 확인할 수 있습니다.</p>
        </div>

        {/* 차트 영역 */}
        {companies && companies.length > 0 && <BaseLineChart data={filteredData} colors={generateColors(companies?.length)} keys={keys} />}
      </section>
      {isLoading && <Loading />}
      {error && isError && <ErrorModal message={error.message} onClose={refetch} />}
    </>
  );
}
