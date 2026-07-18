"use client";

import { useState } from "react";
import type { Product } from "@/lib/data/mock";
import { formatPrice, formatQty } from "@/lib/utils/format";
import { clampLooseQuantity, clampPackCount } from "@/lib/utils/quantity";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { useCartStore } from "@/stores/cartStore";
import { useTranslation } from "@/i18n";

// A LOOSE product with variants can still be bought as a raw quantity of
// its base unit ("500g", "1kg", ...are just convenience presets) -- offer
// that as an explicit option alongside the presets. PACKAGED products are
// always discrete packs, so no loose/custom quantity option for them.
const LOOSE_CUSTOM_VALUE = "__custom__";

export function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const offersCustomLooseQty = product.type === "LOOSE";
  const [variantId, setVariantId] = useState<string | null>(product.variants[0]?.id ?? null);
  const [qty, setQty] = useState(product.variants[0] ? 1 : product.min_qty);

  const activeVariant = product.variants.find((v) => v.id === variantId);
  const isLooseMode = offersCustomLooseQty && !activeVariant;
  const looseConstraint = { min: product.min_qty, step: product.step_size, max: product.max_qty };
  const price = activeVariant?.price ?? product.base_price;
  const outOfStock = product.status === "OUT_OF_STOCK";

  const handleVariantChange = (value: string) => {
    if (value === LOOSE_CUSTOM_VALUE) {
      setVariantId(null);
      setQty(product.min_qty);
    } else {
      setVariantId(value);
      setQty(1);
    }
  };

  const handleQtyChange = (raw: number) => {
    setQty(isLooseMode ? clampLooseQuantity(raw, looseConstraint) : clampPackCount(raw));
  };

  const displayName =
    lang === "te" ? product.name_te_script : product.name_en;
  const subName = lang === "te" ? product.name_en : product.name_te_transliteration;

  return (
    <Card className="flex flex-col">
      <CardBody className="flex flex-1 flex-col gap-3">
        <div className="flex h-24 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-600">
          {product.thumbnail_url || product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.thumbnail_url || product.image_url || ""}
              alt={product.name_en}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xs">No image yet</span>
          )}
        </div>

        <div>
          <p className="font-medium text-neutral-900 dark:text-neutral-100">{displayName}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{subName}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">
            {formatPrice(price)}
            {isLooseMode && <span className="font-normal text-neutral-500"> / {product.unit}</span>}
          </span>
          <Badge tone={outOfStock ? "outline" : "default"}>
            {outOfStock ? t.common.outOfStock : t.common.inStock}
          </Badge>
        </div>

        {product.variants.length > 0 && (
          <Select value={variantId ?? LOOSE_CUSTOM_VALUE} onChange={(e) => handleVariantChange(e.target.value)}>
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
            {offersCustomLooseQty && (
              <option value={LOOSE_CUSTOM_VALUE}>Custom quantity ({product.unit})</option>
            )}
          </Select>
        )}

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={isLooseMode ? product.min_qty : 1}
            max={isLooseMode ? product.max_qty ?? undefined : undefined}
            step={isLooseMode ? product.step_size : 1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            onBlur={(e) => handleQtyChange(Number(e.target.value))}
            className="w-20 rounded-md border border-neutral-300 px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950"
          />
          <span className="text-xs text-neutral-500">
            {isLooseMode ? product.unit : "pack(s)"}
          </span>
        </div>
        {isLooseMode && (
          <p className="text-xs text-neutral-500">
            Min {formatQty(product.min_qty, product.unit)}, steps of {formatQty(product.step_size, product.unit)}
            {product.max_qty != null && `, max ${formatQty(product.max_qty, product.unit)}`}
          </p>
        )}

        <Button
          size="sm"
          disabled={outOfStock}
          onClick={() => {
            const finalQty = isLooseMode ? clampLooseQuantity(qty, looseConstraint) : clampPackCount(qty);
            addItem({
              productId: product.id,
              variantId,
              nameEn: activeVariant ? `${product.name_en} (${activeVariant.label})` : product.name_en,
              unitPrice: price,
              quantity: finalQty,
              unit: isLooseMode ? product.unit : "pack",
              minQty: isLooseMode ? product.min_qty : 1,
              stepSize: isLooseMode ? product.step_size : 1,
              maxQty: isLooseMode ? product.max_qty : null,
            });
          }}
        >
          {t.common.addToCart}
        </Button>
      </CardBody>
    </Card>
  );
}
