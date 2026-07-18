"use client";

import { useUiStore } from "@/stores/uiStore";
import en from "./en";
import te from "./te";

const dictionaries = { en, te };

export function useTranslation() {
  const lang = useUiStore((s) => s.lang);
  return { t: dictionaries[lang], lang };
}
