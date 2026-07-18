"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface UiState {
  lang: "en" | "te";
  setLang: (lang: "en" | "te") => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "kirana-ui" }
  )
);
