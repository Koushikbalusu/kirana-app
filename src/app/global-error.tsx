"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(error));
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-white text-center text-neutral-900">
        <p className="text-lg font-semibold">Something went wrong</p>
        <p className="mt-1 text-sm text-neutral-500">Please refresh the page.</p>
      </body>
    </html>
  );
}
