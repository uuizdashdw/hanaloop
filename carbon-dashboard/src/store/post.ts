import { Company, Country, Post } from "@/types";
import { create } from "zustand";

type PostsState = {
  postList: Post[];
  setPosts: (value: Post[]) => void;
  addPost: (value: Post) => void;

  selectedCompany: string | null;
  setSelectedCompany: (id: string | null) => void;

  selectedCountry: string | null;
  setSelectedCountry: (id: string | null) => void;

  selectedMonth: string | null;
  setSelectedMonth: (month: string | null) => void;

  getFilteredPosts: (companies: Company[]) => Post[];
};

export const usePostsStore = create<PostsState>((set, get) => ({
  postList: [],
  setPosts: (value) =>
    set((state) => {
      const ids = new Set(state.postList.map((p) => p.id));
      const merged = [...state.postList];

      value.forEach((p) => {
        if (!ids.has(p.id)) merged.push(p);
      });

      return { postList: [...merged] };
    }),

  addPost: (value) =>
    set((state) => ({
      postList: [...state.postList, value],
    })),

  selectedCompany: null,
  setSelectedCompany: (value) => set({ selectedCompany: value }),

  selectedCountry: null,
  setSelectedCountry: (value) => set({ selectedCountry: value }),

  selectedMonth: null,
  setSelectedMonth: (value) => set({ selectedMonth: value }),

  getFilteredPosts: (companies) => {
    const { postList, selectedCompany, selectedCountry, selectedMonth } = get();

    return postList
      .filter((p) => {
        if (selectedCompany && p.resourceUid !== selectedCompany) return false;

        if (selectedCountry) {
          const company = companies.find((c) => c.id === p.resourceUid);
          if (!company || company.country !== selectedCountry) return false;
        }

        if (selectedMonth) {
          const month = p.dateTime.split("-")[1];
          if (month !== selectedMonth) return false;
        }

        return true;
      })
      .reverse();
  },
}));
