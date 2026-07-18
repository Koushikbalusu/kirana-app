"use client";

import { useOrderStore } from "@/stores/orderStore";
import { formatPrice } from "@/lib/utils/format";

export default function AdminCustomersPage() {
  const orders = useOrderStore((s) => s.orders);

  const byPhone = new Map<string, { name: string; phone: string; orders: number; total: number }>();
  for (const o of orders) {
    const existing = byPhone.get(o.customer_phone);
    if (existing) {
      existing.orders += 1;
      existing.total += o.total;
    } else {
      byPhone.set(o.customer_phone, {
        name: o.customer_name,
        phone: o.customer_phone,
        orders: 1,
        total: o.total,
      });
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Customers</h1>
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Phone</th>
              <th className="px-4 py-2 font-medium">Orders</th>
              <th className="px-4 py-2 font-medium">Lifetime Value</th>
            </tr>
          </thead>
          <tbody>
            {[...byPhone.values()].map((c) => (
              <tr key={c.phone} className="border-t border-neutral-100 dark:border-neutral-900">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2 text-neutral-500">{c.phone}</td>
                <td className="px-4 py-2">{c.orders}</td>
                <td className="px-4 py-2">{formatPrice(c.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
