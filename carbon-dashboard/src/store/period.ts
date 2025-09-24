import { create } from "zustand";

type PeriodState = {
  period: number;
  setPeriod: (value: number) => void;
};

export const usePeriodStore = create<PeriodState>((set) => ({
  period: 12,
  setPeriod: (value) => set({ period: value }),
}));
