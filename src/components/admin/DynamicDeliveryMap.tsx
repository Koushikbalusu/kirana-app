"use client";

import dynamic from "next/dynamic";

export const DynamicDeliveryMap = dynamic(
  () => import("./DeliveryMap").then((m) => m.DeliveryMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] items-center justify-center rounded-md border border-neutral-200 text-sm text-neutral-400 dark:border-neutral-800">
        Loading map…
      </div>
    ),
  }
);
