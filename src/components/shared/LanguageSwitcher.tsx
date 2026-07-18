"use client";

import { useUiStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher() {
  const { lang, setLang } = useUiStore();
  return (
    <div className="inline-flex rounded-md border border-neutral-300 dark:border-neutral-700 overflow-hidden text-xs">
      <button
        onClick={() => setLang("en")}
        className={cn(
          "px-2 py-1",
          lang === "en"
            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            : "text-neutral-600 dark:text-neutral-400"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLang("te")}
        className={cn(
          "px-2 py-1",
          lang === "te"
            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            : "text-neutral-600 dark:text-neutral-400"
        )}
      >
        తె
      </button>
    </div>
  );
}
