"use client";

import { useEffect } from "react";
import { useUiStore } from "@/stores/uiStore";

export function ThemeProvider() {
  const theme = useUiStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
}
