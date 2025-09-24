"use client";

import { memo } from "react";

// Type
import { Company } from "@/types";

// Component
import ChartSkeleton from "../common/ChartSkeleton";
import ChartFilter from "../common/ChartFilter";

// Dynamic
import dynamic from "next/dynamic";

// Util
import { transformCountryCode } from "@/utils";

// Hooks
import { useFilteredEmissions } from "@/hooks/useFilteredEmissions";

const BaseLineChart = dynamic(() => import("@/components/common/BaseLineChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

function DetailCompanyInfoComponent({ company }: { company: Company }) {
  const { filteredData, keys } = useFilteredEmissions({ company });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        {company?.name} <span className="text-base">({transformCountryCode(company?.country)})</span>
      </h1>
      {/* 차트 필터 영역 */}
      <ChartFilter />

      {/* 차트 영역 */}
      <BaseLineChart data={filteredData} keys={keys} colors={["#3b82f6"]} />
    </>
  );
}

const DetailCompanyInfo = memo(DetailCompanyInfoComponent, (prev, next) => prev.company.id === next.company.id);

export default DetailCompanyInfo;
