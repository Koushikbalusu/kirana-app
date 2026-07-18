"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { formatPrice } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card, CardBody } from "@/components/ui/card";
import { useTranslation } from "@/i18n";
import { LocationPicker, type ConfirmedAddress } from "@/components/customer/LocationPicker";
import { PhoneEntry } from "@/components/customer/PhoneEntry";
import type { IdentifyResult } from "@/actions/customer";
import type { Order, PaymentMode } from "@/lib/data/mock";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { lines, orderType, setOrderType, subtotal, clearCart } = useCartStore();
  const addOrder = useOrderStore((s) => s.addOrder);

  const [customer, setCustomer] = useState<IdentifyResult | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState<ConfirmedAddress | null>(null);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("CASH");
  const [notes, setNotes] = useState("");

  const deliveryCharge = orderType === "DELIVERY" ? 2000 : 0;
  const total = subtotal() + deliveryCharge;

  const canSubmit = lines.length > 0 && customer !== null && (orderType === "PICKUP" || address !== null);

  const placeOrder = () => {
    if (!customer) return;
    const addressLabel = address
      ? [address.houseNumber, address.area, address.label, address.landmark].filter(Boolean).join(", ")
      : null;

    const order: Order = {
      id: `ord-${Date.now()}`,
      store_id: "store-1",
      customer_name: name || customer.name || "Guest Customer",
      customer_phone: customer.phone,
      type: orderType,
      status: "PLACED",
      address_label: orderType === "DELIVERY" ? addressLabel : null,
      lat: orderType === "DELIVERY" ? address?.lat : undefined,
      lng: orderType === "DELIVERY" ? address?.lng : undefined,
      items: lines.map((l) => ({
        product_id: l.productId,
        variant_id: l.variantId,
        name_en: l.nameEn,
        quantity: l.quantity,
        unit_price: l.unitPrice,
        item_notes: l.notes,
      })),
      subtotal: subtotal(),
      delivery_charge: deliveryCharge,
      discount: 0,
      total,
      payment_mode: paymentMode,
      payment_status: "PENDING",
      customer_notes: notes || undefined,
      created_at: new Date(2026, 0, 1).toISOString(),
    };
    addOrder(order);
    clearCart();
    router.push(`/orders/${order.id}`);
  };

  if (lines.length === 0) {
    return <p className="py-16 text-center text-neutral-500">Your cart is empty.</p>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-xl font-semibold">{t.checkout.title}</h1>

      {!customer ? (
        <PhoneEntry
          onIdentified={(result) => {
            setCustomer(result);
            if (result.name) setName(result.name);
          }}
        />
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
              <label className="mb-1 block text-sm font-medium">Name (optional)</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
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

      <Button size="lg" className="w-full" disabled={!canSubmit} onClick={placeOrder}>
        {t.checkout.place}
      </Button>
    </div>
  );
}
