"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(error));
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div>
        <p className="text-lg font-semibold">Something went wrong</p>
        <p className="mt-1 text-sm text-neutral-500">
          మీరు మళ్ళీ ప్రయత్నించవచ్చు, లేదా హోమ్‌కు వెళ్ళండి. (Please try again, or go back home.)
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}
