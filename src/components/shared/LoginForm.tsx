"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import type { LoginState } from "@/actions/auth";

export function LoginForm({
  title,
  demoIdentifier,
  action,
  footer,
}: {
  title: string;
  demoIdentifier: string;
  action: (prevState: LoginState, formData: FormData) => Promise<LoginState>;
  footer?: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <Card>
        <CardBody className="space-y-4">
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="mt-1 text-xs text-neutral-500">
              Demo login — email or username <code>{demoIdentifier}</code>,
              password <code>kirana123</code>
            </p>
          </div>
          {footer && <div>{footer}</div>}
          <form action={formAction} className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Email or Username</label>
              <Input name="identifier" required defaultValue={demoIdentifier} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <Input name="password" type="password" required defaultValue="kirana123" />
            </div>
            {state?.error && (
              <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
