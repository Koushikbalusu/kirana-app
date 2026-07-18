"use client";

import { Sun, Moon } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";

export function ThemeToggle() {
  const { theme, setTheme } = useUiStore();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
      aria-label="Toggle theme"
      type="button"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
