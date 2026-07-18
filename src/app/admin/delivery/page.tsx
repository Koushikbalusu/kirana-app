"use client";

import { useEffect, useState } from "react";
import { useOrderStore } from "@/stores/orderStore";
import { listDeliveryPartners, type UserRecord } from "@/actions/users";
import { DynamicDeliveryMap } from "@/components/admin/DynamicDeliveryMap";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/input";

export default function AdminDeliveryPage() {
  const { orders, assignPartner } = useOrderStore();
  const [partners, setPartners] = useState<UserRecord[]>([]);

  useEffect(() => {
    listDeliveryPartners().then(setPartners);
  }, []);

  const pending = orders.filter(
    (o) => o.type === "DELIVERY" && o.status !== "DELIVERED" && o.status !== "CANCELLED"
  );

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Delivery Management</h1>
        <p className="text-sm text-neutral-500">
          Pending delivery addresses plotted with Leaflet + OpenStreetMap.
          Assign a partner below each pin.
        </p>
      </div>

      <DynamicDeliveryMap orders={pending} />

      <div className="space-y-3">
        {pending.map((o) => (
          <Card key={o.id}>
            <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">#{o.id} — {o.customer_name}</p>
                <p className="text-xs text-neutral-500">{o.address_label}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone="outline">{o.status.replaceAll("_", " ")}</Badge>
                <Select
                  value={o.partner_id ?? ""}
                  onChange={(e) => assignPartner(o.id, e.target.value)}
                  className="w-44"
                >
                  <option value="">Assign partner…</option>
                  {partners.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </Select>
              </div>
            </CardBody>
          </Card>
        ))}
        {pending.length === 0 && (
          <p className="text-neutral-500">No pending deliveries.</p>
        )}
        {partners.length === 0 && (
          <p className="text-xs text-neutral-500">
            No delivery partners yet — add one under Delivery Partners first.
          </p>
        )}
      </div>
    </div>
  );
}
