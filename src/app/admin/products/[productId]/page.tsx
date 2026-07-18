"use client";

import { use } from "react";
import { useProductStore } from "@/stores/productStore";
import { ProductForm } from "@/components/admin/ProductForm";
import { LinkButton } from "@/components/ui/button";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const product = useProductStore((s) => s.products.find((p) => p.id === productId));

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
      <ProductForm existing={product} />
    </div>
  );
}
