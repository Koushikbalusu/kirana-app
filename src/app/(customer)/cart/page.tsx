"use client";

import { useCartStore } from "@/stores/cartStore";
import { formatPrice, formatQty } from "@/lib/utils/format";
import { clampLooseQuantity } from "@/lib/utils/quantity";
import { LinkButton, Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { useTranslation } from "@/i18n";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { t } = useTranslation();
  const { lines, updateQuantity, removeItem, subtotal } = useCartStore();

  if (lines.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-neutral-500">{t.cart.empty}</p>
        <LinkButton href="/" className="mt-4 inline-flex">
          {t.home.browse}
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">{t.cart.title}</h1>

      <div className="space-y-3">
        {lines.map((l) => (
          <Card key={`${l.productId}-${l.variantId}`}>
            <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{l.nameEn}</p>
                <p className="text-sm text-neutral-500">{formatPrice(l.unitPrice)} / {l.unit}</p>
                <p className="text-xs text-neutral-400">
                  Min {formatQty(l.minQty, l.unit)}, steps of {formatQty(l.stepSize, l.unit)}
                  {l.maxQty != null && `, max ${formatQty(l.maxQty, l.unit)}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={l.quantity}
                  min={l.minQty}
                  max={l.maxQty ?? undefined}
                  step={l.stepSize}
                  onChange={(e) => updateQuantity(l.productId, l.variantId, Number(e.target.value))}
                  onBlur={(e) =>
                    updateQuantity(
                      l.productId,
                      l.variantId,
                      clampLooseQuantity(Number(e.target.value), { min: l.minQty, step: l.stepSize, max: l.maxQty })
                    )
                  }
                  className="w-20 rounded-md border border-neutral-300 px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950"
                />
                <span className="w-24 text-right font-medium">
                  {formatPrice(l.unitPrice * l.quantity)}
                </span>
                <button
                  onClick={() => removeItem(l.productId, l.variantId)}
                  className="rounded-md p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-stretch gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold">
          {t.cart.subtotal}: {formatPrice(subtotal())}
        </p>
        <LinkButton href="/checkout" size="lg">
          {t.cart.checkout}
        </LinkButton>
      </div>
    </div>
  );
}
