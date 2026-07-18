"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categories as seedCategories, type Category } from "@/lib/data/mock";

interface CategoryState {
  categories: Category[];
  addCategory: (category: Category) => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: seedCategories,
      addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
    }),
    { name: "kirana-categories" }
  )
);
