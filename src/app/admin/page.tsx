import { listProducts } from "@/actions/products";
import { DashboardStats } from "@/components/admin/DashboardStats";

export default async function AdminDashboard() {
  const products = await listProducts();
  const activeProductCount = products.filter((p) => p.status !== "HIDDEN").length;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
      <DashboardStats activeProductCount={activeProductCount} />
    </div>
  );
}
