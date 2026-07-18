import { listOrders } from "@/actions/orders";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Orders</h1>
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-2 font-medium">Order</th>
              <th className="px-4 py-2 font-medium">Customer</th>
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium">Total</th>
              <th className="px-4 py-2 font-medium">Payment</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Placed</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-neutral-100 dark:border-neutral-900">
                <td className="px-4 py-2 font-medium">#{o.id.slice(0, 8)}</td>
                <td className="px-4 py-2">
                  <div>{o.customer_name}</div>
                  <div className="text-xs text-neutral-500">{o.customer_phone}</div>
                </td>
                <td className="px-4 py-2 text-neutral-500">{o.type}</td>
                <td className="px-4 py-2">{formatPrice(o.total)}</td>
                <td className="px-4 py-2 text-neutral-500">
                  {o.payment_mode} · {o.payment_status}
                </td>
                <td className="px-4 py-2">
                  <Badge tone="outline">{o.status.replaceAll("_", " ")}</Badge>
                </td>
                <td className="px-4 py-2 text-neutral-500">{formatDate(o.created_at)}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-neutral-500">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
