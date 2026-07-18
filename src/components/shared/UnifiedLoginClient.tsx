"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/shared/LoginForm";
import { login } from "@/actions/auth";
import { cn } from "@/lib/utils/cn";

type UserType = "admin" | "delivery";

const DEMO_IDENTIFIER: Record<UserType, string> = {
  admin: "admin",
  delivery: "ramesh",
};

export function UnifiedLoginClient() {
  const params = useSearchParams();
  const initial: UserType = params.get("role") === "delivery" ? "delivery" : "admin";
  const [userType, setUserType] = useState<UserType>(initial);

  const boundLogin = useMemo(
    () => login.bind(null, userType === "admin" ? ["ADMIN", "STAFF"] : ["DELIVERY_PARTNER"]),
    [userType]
  );

  return (
    <LoginForm
      title={userType === "admin" ? "Admin / Staff Login" : "Delivery Partner Login"}
      demoIdentifier={DEMO_IDENTIFIER[userType]}
      action={boundLogin}
      footer={
        <div className="inline-flex w-full rounded-md border border-neutral-300 p-1 text-sm dark:border-neutral-700">
          {(["admin", "delivery"] as UserType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              className={cn(
                "flex-1 rounded px-3 py-1.5 capitalize transition-colors",
                userType === type
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-600 dark:text-neutral-400"
              )}
            >
              {type === "admin" ? "Admin" : "Delivery"}
            </button>
          ))}
        </div>
      }
    />
  );
}
