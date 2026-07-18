import { Suspense } from "react";
import { UnifiedLoginClient } from "@/components/shared/UnifiedLoginClient";

export default function LoginPage() {
  return (
    <Suspense>
      <UnifiedLoginClient />
    </Suspense>
  );
}
