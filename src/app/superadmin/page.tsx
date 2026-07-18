import { listStores } from "@/actions/stores";
import { listProducts } from "@/actions/products";
import { Card, CardBody } from "@/components/ui/card";
import { isDbConfigured } from "@/lib/db";

export default async function SuperadminDashboard() {
  const [stores, products] = await Promise.all([listStores(), listProducts()]);

  const platformStats = [
    { label: "Total Stores", value: stores.length },
    { label: "Active Stores", value: stores.filter((s) => s.active).length },
    { label: "Total Products", value: products.length },
    { label: "Database", value: isDbConfigured ? "Live (Neon)" : "Not configured" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Platform Dashboard</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((s) => (
          <Card key={s.label}>
            <CardBody>
              <p className="text-xs text-neutral-500">{s.label}</p>
              <p className="mt-1 text-lg font-semibold">{s.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
