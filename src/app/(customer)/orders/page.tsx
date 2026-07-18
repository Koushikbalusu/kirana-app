"use client";

import Link from "next/link";
import { useOrderStore } from "@/stores/orderStore";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils/format";
import { useTranslation } from "@/i18n";

export default function OrdersPage() {
  const { t } = useTranslation();
  const orders = useOrderStore((s) => s.orders);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{t.nav.orders}</h1>
      {orders.length === 0 && <p className="text-neutral-500">No orders yet.</p>}
      <div className="space-y-3">
        {orders.map((o) => (
          <Link key={o.id} href={`/orders/${o.id}`}>
            <Card className="transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
              <CardBody className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">#{o.id}</p>
                  <p className="text-xs text-neutral-500">{formatDate(o.created_at)} · {o.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{formatPrice(o.total)}</span>
                  <Badge tone="outline">{o.status.replaceAll("_", " ")}</Badge>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
