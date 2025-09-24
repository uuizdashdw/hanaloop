"use client";

// API
import { fetchCompanies } from "@/lib/api";

// Tanstack Query
import { useQuery } from "@tanstack/react-query";

// Components
import ErrorModal from "../common/ErrorModal";

// Type
import { Company } from "@/types";

// Dynamic Import
import dynamic from "next/dynamic";

// Utils
import { generateColors } from "@/utils";
import { useFilteredEmissions } from "@/hooks/useFilteredEmissions";
import ChartFilter from "../common/ChartFilter";
import ChartSkeleton from "../common/ChartSkeleton";
import NoItems from "../common/NoItems";

const BaseLineChart = dynamic(() => import("@/components/common/BaseLineChart"), { ssr: false, loading: () => <ChartSkeleton /> });

export default function CompanyChart() {
  const {
    data: companies,
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery<Company[], Error>({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    retry: 1,
  });

  const { filteredData, keys } = useFilteredEmissions({ companies });
  return (
    <>
      <section>
        {/* 차트 필터 영역 */}
        <ChartFilter />

        {/* 차트 영역 */}
        <div className="relative overflow-hidden min-h-[300px]">
          {/* 데이터 있음 */}
          {filteredData && filteredData?.length > 0 && <BaseLineChart data={filteredData} colors={generateColors(filteredData?.length)} keys={keys} />}

          {/* 데이터 없음 */}
          {!isLoading && (!filteredData || filteredData?.length === 0) && <NoItems message="데이터가 없습니다." color="text-gray-400" />}
        </div>
      </section>
      {error && isError && <ErrorModal message={error.message} onClose={refetch} />}
    </>
  );
}
