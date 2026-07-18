"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  lang: "en" | "te";
  setLang: (lang: "en" | "te") => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    { name: "kirana-ui" }
  )
);
