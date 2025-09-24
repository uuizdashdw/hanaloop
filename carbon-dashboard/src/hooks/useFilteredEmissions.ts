"use client";

import { usePeriodStore } from "@/store/period";
import { Company } from "@/types";
import { COUNTRY_MAP, generateYearMonthRangeFromData } from "@/utils";
import { useMemo, useState } from "react";

type UseFilteredEmissionsProps =
  | { company: Company; companies?: never } // 상세 페이지
  | { companies: Company[] | undefined; company?: never }; // 메인 대시보드

export const useFilteredEmissions = ({ company, companies }: UseFilteredEmissionsProps) => {
  const { period, setPeriod } = usePeriodStore();

  const filteredData = useMemo(() => {
    // 단일 회사
    if (company) {
      const months = generateYearMonthRangeFromData([company], period);

      return months.map((ym) => {
        const emission = company.emissions.find((e) => e.yearMonth === ym);
        return { yearMonth: ym, 배출량: emission ? emission.emissions : 0 };
      });
    }

    // 여러 회사
    if (companies && companies.length > 0) {
      const months = generateYearMonthRangeFromData(companies, period);

      return months.map((ym) => {
        const row: Record<string, any> = { yearMonth: ym };

        companies.forEach((c) => {
          const label = `${c.name} (${COUNTRY_MAP[c.country] ?? c.country})`;
          const emission = c.emissions.find((e) => e.yearMonth === ym);
          row[label] = emission ? emission.emissions : 0;
        });

        return row;
      });
    }

    return null;
  }, [company, companies, period]);

  const keys = useMemo(() => {
    if (company) return ["배출량"];
    if (companies) return companies.map((c) => `${c.name} (${COUNTRY_MAP[c.country] ?? c.country})`);
    return [];
  }, [company, companies]);

  return { period, setPeriod, filteredData, keys };
};
