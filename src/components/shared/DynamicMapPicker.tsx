"use client";

import dynamic from "next/dynamic";

export const DynamicMapPicker = dynamic(
  () => import("./MapPicker").then((m) => m.MapPicker),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[260px] items-center justify-center rounded-md border border-neutral-200 text-sm text-neutral-400 dark:border-neutral-800">
        Loading map…
      </div>
    ),
  }
);
