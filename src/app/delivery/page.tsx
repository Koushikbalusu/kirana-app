"use client";

import { useOrderStore } from "@/stores/orderStore";
import { usePartnerStore } from "@/stores/partnerStore";
import { DynamicMapPicker } from "@/components/shared/DynamicMapPicker";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/format";

function navigate(lat: number | undefined, lng: number | undefined, label: string | null) {
  const url =
    lat != null && lng != null
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label ?? "kirana store")}`;
  window.open(url, "_blank");
}

export default function DeliveryDashboard() {
  const { orders, updateStatus, markPaid } = useOrderStore();
  const partners = usePartnerStore((s) => s.partners);
  // Single-delivery-person demo: no per-account partner linkage exists yet,
  // so the first partner on record is treated as "me".
  const currentPartner = partners[0];
  const mine = orders.filter(
    (o) => o.partner_id === currentPartner?.id && o.status !== "DELIVERED" && o.status !== "CANCELLED"
  );

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">My Deliveries — {currentPartner?.name ?? "Partner"}</h1>
      <div className="space-y-3">
        {mine.map((o) => (
          <Card key={o.id}>
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">#{o.id} — {o.customer_name}</p>
                  <p className="text-xs text-neutral-500">{o.customer_phone} · {o.address_label}</p>
                </div>
                <Badge tone="outline">{o.status.replaceAll("_", " ")}</Badge>
              </div>
              {o.lat != null && o.lng != null && (
                <DynamicMapPicker lat={o.lat} lng={o.lng} readOnly height={160} />
              )}
              <p className="text-sm">Total: {formatPrice(o.total)} · {o.payment_mode} ({o.payment_status})</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => navigate(o.lat, o.lng, o.address_label)}>
                  Navigate
                </Button>
                {o.status === "PLACED" && (
                  <Button size="sm" onClick={() => updateStatus(o.id, "IN_TRANSIT")}>
                    Mark In Transit
                  </Button>
                )}
                {o.status === "IN_TRANSIT" && (
                  <Button size="sm" onClick={() => updateStatus(o.id, "DELIVERED")}>
                    Mark Delivered
                  </Button>
                )}
                {o.payment_status === "PENDING" && o.payment_mode === "CASH" && (
                  <Button size="sm" variant="secondary" onClick={() => markPaid(o.id)}>
                    Confirm COD Collected
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
        {mine.length === 0 && <p className="text-neutral-500">No deliveries assigned right now.</p>}
      </div>
    </div>
  );
}
