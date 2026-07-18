"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card, CardBody } from "@/components/ui/card";
import { useTranslation } from "@/i18n";
import { LocationPicker, type ConfirmedAddress } from "@/components/customer/LocationPicker";
import { PhoneEntry } from "@/components/customer/PhoneEntry";
import { placeOrder } from "@/actions/orders";
import type { IdentifyResult } from "@/actions/customer";
import type { PaymentMode } from "@/lib/data/mock";
import { DELIVERY_CHARGE } from "@/lib/constants";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { lines, orderType, setOrderType, subtotal, clearCart } = useCartStore();

  const [customer, setCustomer] = useState<IdentifyResult | null>(null);
  const [address, setAddress] = useState<ConfirmedAddress | null>(null);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("CASH");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryCharge = orderType === "DELIVERY" ? DELIVERY_CHARGE : 0;
  const total = subtotal() + deliveryCharge;

  const canSubmit = lines.length > 0 && customer !== null && (orderType === "PICKUP" || address !== null);

  const submit = async () => {
    if (!customer || customer.id.startsWith("local-")) {
      setError("Database isn't configured yet — checkout needs a live customer record.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = await placeOrder({
        customerId: customer.id,
        type: orderType,
        address:
          orderType === "DELIVERY" && address
            ? {
                label: address.label,
                houseNumber: address.houseNumber,
                area: address.area,
                landmark: address.landmark,
                notes: address.notes,
                lat: address.lat,
                lng: address.lng,
              }
            : undefined,
        items: lines.map((l) => ({
          productId: l.productId,
          variantId: l.variantId,
          quantity: l.quantity,
          notes: l.notes,
        })),
        paymentMode,
        customerNotes: notes || undefined,
      });

      if (result.error || !result.order) {
        setError(result.error || "Something went wrong placing your order.");
        return;
      }

      clearCart();
      router.push(`/orders/${result.order.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (lines.length === 0) {
    return <p className="py-16 text-center text-neutral-500">Your cart is empty.</p>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-xl font-semibold">{t.checkout.title}</h1>

      {!customer ? (
        <PhoneEntry onIdentified={setCustomer} />
      ) : (
        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-neutral-500" />
                {customer.phone}
                {customer.isNew ? " (new customer)" : " (welcome back)"}
              </span>
              <button className="text-xs underline" onClick={() => setCustomer(null)}>
                Change
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">{t.checkout.orderType}</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setOrderType("DELIVERY")}
                  className={`flex-1 rounded-md border px-3 py-2 text-sm ${orderType === "DELIVERY" ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900" : "border-neutral-300 dark:border-neutral-700"}`}
                >
                  {t.checkout.delivery}
                </button>
                <button
                  onClick={() => setOrderType("PICKUP")}
                  className={`flex-1 rounded-md border px-3 py-2 text-sm ${orderType === "PICKUP" ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900" : "border-neutral-300 dark:border-neutral-700"}`}
                >
                  {t.checkout.pickup}
                </button>
              </div>
            </div>

            {orderType === "DELIVERY" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">{t.checkout.address}</label>
                {address ? (
                  <div className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-800">
                    <span>{[address.houseNumber, address.area, address.label].filter(Boolean).join(", ")}</span>
                    <button className="text-xs underline" onClick={() => setAddress(null)}>
                      Change
                    </button>
                  </div>
                ) : (
                  <LocationPicker onConfirm={setAddress} />
                )}
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium">{t.checkout.payment}</label>
              <Select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value as PaymentMode)}>
                <option value="CASH">Cash</option>
                <option value="UPI">UPI</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Order notes (optional)</label>
              <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. fine grind, call before delivery" />
            </div>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardBody className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal())}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery charge</span>
            <span>{formatPrice(deliveryCharge)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-200 pt-1 font-semibold dark:border-neutral-800">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </CardBody>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button size="lg" className="w-full" disabled={!canSubmit || submitting} onClick={submit}>
        {submitting ? "Placing order…" : t.checkout.place}
      </Button>
    </div>
  );
}
