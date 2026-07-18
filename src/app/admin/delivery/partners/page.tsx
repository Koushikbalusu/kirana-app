"use client";

import { useState } from "react";
import { usePartnerStore } from "@/stores/partnerStore";
import { Card, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeliveryPartnersPage() {
  const { partners, addPartner, removePartner } = usePartnerStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = () => {
    if (!name.trim() || phone.trim().length < 10) return;
    addPartner({ id: `dp-${Date.now()}`, name: name.trim(), phone: phone.trim() });
    setName("");
    setPhone("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Delivery Partners</h1>

      <Card>
        <CardBody className="space-y-3">
          <p className="text-sm font-medium">Add a new delivery partner</p>
          <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
            <Button onClick={submit}>Add partner</Button>
          </div>
        </CardBody>
      </Card>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Phone</th>
              <th className="px-4 py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-t border-neutral-100 dark:border-neutral-900">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2 text-neutral-500">{p.phone}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => removePartner(p.id)}
                    className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    aria-label="Remove partner"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
