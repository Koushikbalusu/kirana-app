"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { identifyCustomer, type IdentifyResult } from "@/actions/customer";

export function PhoneEntry({ onIdentified }: { onIdentified: (result: IdentifyResult) => void }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    const result = await identifyCustomer(phone);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    onIdentified(result);
  };

  return (
    <Card>
      <CardBody className="space-y-3">
        <div>
          <p className="text-sm font-medium">Enter your phone number</p>
          <p className="text-xs text-neutral-500">
            No OTP, no password — we'll recognize you next time automatically.
          </p>
        </div>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="10-digit mobile number"
          inputMode="numeric"
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button className="w-full" onClick={submit} disabled={loading || phone.trim().length < 10}>
          {loading ? "Checking…" : "Continue"}
        </Button>
      </CardBody>
    </Card>
  );
}
