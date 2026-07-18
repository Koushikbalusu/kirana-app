import Link from "next/link";
import { getCustomerSession } from "@/actions/customer";
import { listOrdersForCustomer } from "@/actions/orders";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const customer = await getCustomerSession();
  const orders = customer ? await listOrdersForCustomer(customer.id) : [];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">My Orders</h1>
      {!customer && (
        <p className="text-neutral-500">
          Enter your phone number at checkout to see your order history here.
        </p>
      )}
      {customer && orders.length === 0 && <p className="text-neutral-500">No orders yet.</p>}
      <div className="space-y-3">
        {orders.map((o) => (
          <Link key={o.id} href={`/orders/${o.id}`}>
            <Card className="transition-colors hover:border-neutral-400 dark:hover:border-neutral-600">
              <CardBody className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">#{o.id.slice(0, 8)}</p>
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
