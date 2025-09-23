import { Company } from "@/types";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const jitter = () => 200 + Math.random() * 600;
export const maybeFail = () => Math.random() < 0.15;

// 색상을 동적으로 생성합니다.
export const generateColors = (count: number): string[] => {
  return Array.from({ length: count }, (_, idx) => {
    return `oklch(70% 0.2 ${idx * (360 / count)})`;
  });
};

export const generateYearMonthRangeFromData = (companies: Company[], months: number) => {
  const allDates = companies.flatMap((c) => c.emissions.map((e) => e.yearMonth));
  const sorted = allDates.sort(); // "2024-01" ~ "2025-09"
  const end = sorted[sorted.length - 1]; // 최신 연월
  const endDate = new Date(end + "-01");

  const result: string[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(endDate);
    d.setMonth(d.getMonth() - i);
    result.push(d.toISOString().slice(0, 7)); // "YYYY-MM"
  }
  return result;
};
