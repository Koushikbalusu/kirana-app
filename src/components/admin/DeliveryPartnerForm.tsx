"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createDeliveryPartner } from "@/actions/users";

export function DeliveryPartnerForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setError(null);
    if (!name.trim() || phone.trim().length < 10 || !email.trim() || password.length < 6) {
      setError("Fill in name, a valid phone number, email, and a password of at least 6 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await createDeliveryPartner({ name: name.trim(), phone: phone.trim(), email: email.trim(), password });
      if (result.error) {
        setError(result.error);
        return;
      }
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardBody className="space-y-3">
        <p className="text-sm font-medium">Add a new delivery partner</p>
        <p className="text-xs text-neutral-500">
          This creates a real login account — the partner signs in at{" "}
          <code>/delivery/login</code> with the email and password below.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            type="text"
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <Button onClick={submit} disabled={submitting}>
          {submitting ? "Adding…" : "Add partner"}
        </Button>
      </CardBody>
    </Card>
  );
}
