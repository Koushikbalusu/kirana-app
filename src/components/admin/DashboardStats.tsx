"use client";

import { useOrderStore } from "@/stores/orderStore";
import { Card, CardBody } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils/format";

export function DashboardStats({ activeProductCount }: { activeProductCount: number }) {
  const orders = useOrderStore((s) => s.orders);

  const totalOrders = orders.length;
  const pendingDeliveries = orders.filter(
    (o) => o.type === "DELIVERY" && o.status !== "DELIVERED" && o.status !== "CANCELLED"
  ).length;
  const deliveryCount = orders.filter((o) => o.type === "DELIVERY").length;
  const pickupCount = orders.filter((o) => o.type === "PICKUP").length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { label: "Total Orders", value: totalOrders },
    { label: "Pending Deliveries", value: pendingDeliveries },
    { label: "Delivery vs Pickup", value: `${deliveryCount} / ${pickupCount}` },
    { label: "Total Revenue", value: formatPrice(revenue) },
    { label: "Active Products", value: activeProductCount },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardBody>
            <p className="text-xs text-neutral-500">{s.label}</p>
            <p className="mt-1 text-lg font-semibold">{s.value}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
