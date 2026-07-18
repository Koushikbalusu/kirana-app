"use client";

import { useState } from "react";
import type { Product } from "@/lib/data/mock";
import { formatPrice } from "@/lib/utils/format";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { useCartStore } from "@/stores/cartStore";
import { useTranslation } from "@/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const [variantId, setVariantId] = useState<string | null>(
    product.variants[0]?.id ?? null
  );
  const [qty, setQty] = useState(product.min_qty);

  const activeVariant = product.variants.find((v) => v.id === variantId);
  const price = activeVariant?.price ?? product.base_price;
  const outOfStock = product.status === "OUT_OF_STOCK";

  const displayName =
    lang === "te" ? product.name_te_script : product.name_en;
  const subName = lang === "te" ? product.name_en : product.name_te_transliteration;

  return (
    <Card className="flex flex-col">
      <CardBody className="flex flex-1 flex-col gap-3">
        <div className="flex h-24 items-center justify-center rounded-md bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-600">
          <span className="text-xs">No image yet</span>
        </div>

        <div>
          <p className="font-medium text-neutral-900 dark:text-neutral-100">{displayName}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{subName}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">{formatPrice(price)}</span>
          <Badge tone={outOfStock ? "outline" : "default"}>
            {outOfStock ? t.common.outOfStock : t.common.inStock}
          </Badge>
        </div>

        {product.variants.length > 0 && (
          <Select value={variantId ?? ""} onChange={(e) => setVariantId(e.target.value)}>
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </Select>
        )}

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={product.min_qty}
            max={product.max_qty ?? undefined}
            step={product.step_size}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-20 rounded-md border border-neutral-300 px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950"
          />
          <span className="text-xs text-neutral-500">{product.unit}</span>
        </div>

        <Button
          size="sm"
          disabled={outOfStock}
          onClick={() =>
            addItem({
              productId: product.id,
              variantId,
              nameEn: activeVariant ? `${product.name_en} (${activeVariant.label})` : product.name_en,
              unitPrice: price,
              quantity: qty,
              unit: product.unit,
            })
          }
        >
          {t.common.addToCart}
        </Button>
      </CardBody>
    </Card>
  );
}
