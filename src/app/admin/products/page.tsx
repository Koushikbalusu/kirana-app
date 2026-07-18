"use client";

import { useState } from "react";
import Link from "next/link";
import { useProductStore } from "@/stores/productStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/format";
import { Select } from "@/components/ui/input";

export default function AdminProductsPage() {
  const products = useProductStore((s) => s.products);
  const categories = useCategoryStore((s) => s.categories);
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const rows = products.filter(
    (p) =>
      (category === "all" || p.category_id === category) &&
      (status === "all" || p.status === status)
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Products</h1>
        <div className="flex flex-wrap gap-2">
          <Select value={category} onChange={(e) => setCategory(e.target.value)} className="w-40">
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_en}
              </option>
            ))}
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-36">
            <option value="all">All status</option>
            <option value="IN_STOCK">In Stock</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
            <option value="HIDDEN">Hidden</option>
          </Select>
          <Link href="/admin/products/new">
            <Button size="sm">New Product</Button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium">Price</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-neutral-100 dark:border-neutral-900">
                <td className="px-4 py-2">
                  <Link href={`/admin/products/${p.id}`} className="hover:underline">
                    <div>{p.name_en}</div>
                    <div className="text-xs text-neutral-500">{p.name_te_script}</div>
                  </Link>
                </td>
                <td className="px-4 py-2 text-neutral-500">
                  {categories.find((c) => c.id === p.category_id)?.name_en}
                </td>
                <td className="px-4 py-2 text-neutral-500">{p.type}</td>
                <td className="px-4 py-2">{formatPrice(p.base_price)}</td>
                <td className="px-4 py-2">
                  <Badge tone={p.status === "IN_STOCK" ? "default" : "outline"}>
                    {p.status.replaceAll("_", " ")}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
