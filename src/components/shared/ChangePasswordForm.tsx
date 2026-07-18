"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changeOwnPassword } from "@/actions/users";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setMessage(null);
    if (newPassword !== confirmPassword) {
      setMessage({ text: "New password and confirmation don't match.", error: true });
      return;
    }
    setSubmitting(true);
    try {
      const result = await changeOwnPassword(currentPassword, newPassword);
      if (result.error) {
        setMessage({ text: result.error, error: true });
      } else {
        setMessage({ text: "Password updated.", error: false });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-md">
      <CardBody className="space-y-3">
        <p className="text-sm font-medium">Change password</p>
        <Input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current password"
        />
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password (min 6 chars)"
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
        {message && (
          <p className={`text-xs ${message.error ? "text-red-600" : "text-green-600"}`}>{message.text}</p>
        )}
        <Button onClick={submit} disabled={submitting || !currentPassword || !newPassword}>
          {submitting ? "Saving…" : "Update password"}
        </Button>
      </CardBody>
    </Card>
  );
}
