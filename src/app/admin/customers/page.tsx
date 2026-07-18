import { listCustomersWithStats } from "@/actions/orders";
import { formatPrice } from "@/lib/utils/format";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await listCustomersWithStats();

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
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-neutral-100 dark:border-neutral-900">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2 text-neutral-500">{c.phone}</td>
                <td className="px-4 py-2">{c.orderCount}</td>
                <td className="px-4 py-2">{formatPrice(c.lifetimeValue)}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-neutral-500">
                  No customers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
