import { ProductForm } from "@/components/admin/ProductForm";
import { listCategories } from "@/actions/categories";

export default async function NewProductPage() {
  const categories = await listCategories();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">New Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
