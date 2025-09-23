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
import { generateColors, generateYearMonthRangeFromData } from "@/utils";

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

  const [period, setPeriod] = useState(12);

  // 회사별 emissions 를 월 기준으로 데이터를 합칩니다.
  const filteredData = useMemo(() => {
    if (!companies) return [];

    const months = generateYearMonthRangeFromData(companies, period);

    const merged: Record<string, any> = {};
    months.forEach((ym) => {
      merged[ym] = { yearMonth: ym };
      companies.forEach((c) => {
        merged[ym][c.name] = 0; // 회사별 초기값은 0 으로 세팅했습니다.
      });
    });

    companies.forEach((company) => {
      company.emissions.forEach((e) => {
        if (merged[e.yearMonth]) {
          merged[e.yearMonth][company.name] = e.emissions;
        }
      });
    });

    return Object.values(merged);
  }, [companies, period]);

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
        {companies && companies.length > 0 && <BaseLineChart data={filteredData} colors={generateColors(companies?.length)} keys={companies?.map((c) => c.name) ?? []} />}
      </section>
      {isLoading && <Loading />}
      {error && isError && <ErrorModal message={error.message} onClose={refetch} />}
    </>
  );
}
