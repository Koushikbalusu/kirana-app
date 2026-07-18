"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminResetPassword, removeDeliveryPartner } from "@/actions/users";
import { Trash2, KeyRound } from "lucide-react";
import type { UserRecord } from "@/actions/users";

export function DeliveryPartnerRow({ partner }: { partner: UserRecord }) {
  const router = useRouter();
  const [resetting, setResetting] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const doReset = async () => {
    if (newPassword.length < 6) {
      setStatus("Password must be at least 6 characters.");
      return;
    }
    const result = await adminResetPassword(partner.id, newPassword);
    setStatus(result.error ?? "Password updated.");
    if (!result.error) {
      setNewPassword("");
      setResetting(false);
    }
  };

  const doRemove = async () => {
    await removeDeliveryPartner(partner.id);
    router.refresh();
  };

  return (
    <tr className="border-t border-neutral-100 dark:border-neutral-900 align-top">
      <td className="px-4 py-2">{partner.name}</td>
      <td className="px-4 py-2 text-neutral-500">{partner.phone}</td>
      <td className="px-4 py-2 text-neutral-500">{partner.email}</td>
      <td className="px-4 py-2">
        {resetting ? (
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-36"
            />
            <Button size="sm" onClick={doReset}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setResetting(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setResetting(true)}
            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <KeyRound className="h-3.5 w-3.5" /> Reset password
          </button>
        )}
        {status && <p className="mt-1 text-xs text-neutral-500">{status}</p>}
      </td>
      <td className="px-4 py-2 text-right">
        <button
          onClick={doRemove}
          className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          aria-label="Remove partner"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}
