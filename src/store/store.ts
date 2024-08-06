import { create } from "zustand";
import { SearchStoreType } from "../types/global";

export const useSearchStore = create<SearchStoreType>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
}));
