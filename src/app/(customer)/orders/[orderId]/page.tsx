import Link from "next/link";
import { getOrder } from "@/actions/orders";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate, formatQty } from "@/lib/utils/format";
import { LinkButton } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const order = await getOrder(orderId);

  if (!order) {
    return (
      <div className="py-16 text-center">
        <p className="text-neutral-500">Order not found.</p>
        <LinkButton href="/orders" className="mt-4 inline-flex">
          Back to orders
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div>
        <p className="text-xs text-neutral-500">Order confirmed</p>
        <h1 className="text-xl font-semibold">#{order.id.slice(0, 8)}</h1>
        <p className="text-sm text-neutral-500">{formatDate(order.created_at)}</p>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <span className="text-sm font-medium">{order.type === "DELIVERY" ? "Home Delivery" : "Store Pickup"}</span>
          <Badge>{order.status.replaceAll("_", " ")}</Badge>
        </CardHeader>
        <CardBody className="space-y-2 text-sm">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>
                {item.name_en} × {formatQty(item.quantity, item.unit)}
              </span>
              <span>{formatPrice(item.unit_price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-neutral-200 pt-2 dark:border-neutral-800">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{formatPrice(order.delivery_charge)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
          <div className="flex justify-between pt-2 text-neutral-500">
            <span>Payment</span>
            <span>{order.payment_mode} · {order.payment_status}</span>
          </div>
          {order.address_label && (
            <div className="pt-2 text-neutral-500">Address: {order.address_label}</div>
          )}
        </CardBody>
      </Card>

      <Link href="/" className="block text-center text-sm text-neutral-600 underline dark:text-neutral-400">
        Continue shopping
      </Link>
    </div>
  );
}
