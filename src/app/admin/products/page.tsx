import Link from "next/link";
import { listProducts } from "@/actions/products";
import { listCategories } from "@/actions/categories";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/admin/ProductsTable";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([listProducts(), listCategories()]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Products</h1>
        <Link href="/admin/products/new">
          <Button size="sm">New Product</Button>
        </Link>
      </div>
      <ProductsTable products={products} categories={categories} />
    </div>
  );
}
