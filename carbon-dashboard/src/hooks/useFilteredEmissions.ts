"use client";

import { usePeriodStore } from "@/store/period";
import { Company } from "@/types";
import { COUNTRY_MAP, generateYearMonthRangeFromData } from "@/utils";
import { useMemo } from "react";

type UseFilteredEmissionsProps =
  | { company: Company; companies?: never } // 상세 페이지
  | { companies: Company[] | undefined; company?: never }; // 메인 대시보드

export const useFilteredEmissions = ({ company, companies }: UseFilteredEmissionsProps) => {
  const { period, setPeriod } = usePeriodStore();

  const filteredData = useMemo(() => {
    if (company) {
      // ✅ 상세 페이지: 단일 회사 데이터
      const months = generateYearMonthRangeFromData([company], period);

      const map: Record<string, any> = {};
      months.forEach((ym) => {
        map[ym] = { yearMonth: ym, 배출량: 0 };
      });

      company.emissions.forEach((e) => {
        if (map[e.yearMonth]) {
          map[e.yearMonth].배출량 = e.emissions;
        }
      });

      return Object.values(map);
    }

    if (companies && companies.length > 0) {
      // ✅ 메인 페이지: 여러 회사 데이터
      const months = generateYearMonthRangeFromData(companies, period);

      const merged: Record<string, any> = {};
      months.forEach((ym) => {
        merged[ym] = { yearMonth: ym };
        companies.forEach((c) => {
          const label = `${c.name} (${COUNTRY_MAP[c.country] ?? c.country})`;
          merged[ym][label] = 0;
        });
      });

      companies.forEach((c) => {
        const label = `${c.name} (${COUNTRY_MAP[c.country] ?? c.country})`;
        c.emissions.forEach((e) => {
          if (merged[e.yearMonth]) {
            merged[e.yearMonth][label] = e.emissions;
          }
        });
      });

      return Object.values(merged);
    }

    return [];
  }, [company, companies, period]);

  const keys = useMemo(() => {
    if (company) return ["배출량"];
    if (companies) return companies.map((c) => `${c.name} (${COUNTRY_MAP[c.country] ?? c.country})`);
    return [];
  }, [company, companies]);

  return { period, setPeriod, filteredData, keys };
};
