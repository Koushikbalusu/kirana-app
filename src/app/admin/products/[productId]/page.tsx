import { getProduct } from "@/actions/products";
import { listCategories } from "@/actions/categories";
import { ProductForm } from "@/components/admin/ProductForm";
import { LinkButton } from "@/components/ui/button";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const [product, categories] = await Promise.all([getProduct(productId), listCategories()]);

  if (!product) {
    return (
      <div className="space-y-4">
        <p className="text-neutral-500">Product not found.</p>
        <LinkButton href="/admin/products">Back to products</LinkButton>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Edit — {product.name_en}</h1>
      <ProductForm existing={product} categories={categories} />
    </div>
  );
}
