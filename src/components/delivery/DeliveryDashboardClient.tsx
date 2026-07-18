"use client";

import { useEffect, useState } from "react";
import { listOrdersForPartner, updateOrderStatus, markPaid as markPaidAction } from "@/actions/orders";
import { DynamicMapPicker } from "@/components/shared/DynamicMapPicker";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/format";
import type { Order } from "@/lib/data/mock";

function navigate(lat: number | undefined, lng: number | undefined, label: string | null) {
  const url =
    lat != null && lng != null
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(label ?? "kirana store")}`;
  window.open(url, "_blank");
}

export function DeliveryDashboardClient({ partnerId, partnerName }: { partnerId: string; partnerName: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    listOrdersForPartner(partnerId).then((o) => {
      setOrders(o);
      setLoading(false);
    });
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerId]);

  const mine = orders.filter((o) => o.status !== "DELIVERED" && o.status !== "CANCELLED");

  const onUpdateStatus = async (orderId: string, status: "IN_TRANSIT" | "DELIVERED") => {
    await updateOrderStatus(orderId, status);
    refresh();
  };

  const onMarkPaid = async (orderId: string) => {
    await markPaidAction(orderId);
    refresh();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">My Deliveries — {partnerName}</h1>
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
                  <Button size="sm" onClick={() => onUpdateStatus(o.id, "IN_TRANSIT")}>
                    Mark In Transit
                  </Button>
                )}
                {o.status === "IN_TRANSIT" && (
                  <Button size="sm" onClick={() => onUpdateStatus(o.id, "DELIVERED")}>
                    Mark Delivered
                  </Button>
                )}
                {o.payment_status === "PENDING" && o.payment_mode === "CASH" && (
                  <Button size="sm" variant="secondary" onClick={() => onMarkPaid(o.id)}>
                    Confirm COD Collected
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        ))}
        {!loading && mine.length === 0 && <p className="text-neutral-500">No deliveries assigned right now.</p>}
      </div>
    </div>
  );
}
