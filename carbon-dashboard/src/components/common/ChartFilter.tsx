"use client";

// Hook
import { useFilteredEmissions } from "@/hooks/useFilteredEmissions";

// Type
import { Company } from "@/types";

const PERIODS = [1, 3, 6, 12];

type ChartFilterProps = {
  companies?: Company[];
  company?: Company;
};

export default function ChartFilter({ companies, company }: ChartFilterProps) {
  const { period, setPeriod } = company ? useFilteredEmissions({ company }) : useFilteredEmissions({ companies });
  return (
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
  );
}
