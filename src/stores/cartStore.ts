"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  variantId: string | null;
  nameEn: string;
  unitPrice: number; // paise
  quantity: number;
  unit: string;
  notes?: string;
}

interface CartState {
  lines: CartLine[];
  orderType: "DELIVERY" | "PICKUP";
  addItem: (line: CartLine) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  setNote: (productId: string, variantId: string | null, notes: string) => void;
  setOrderType: (type: "DELIVERY" | "PICKUP") => void;
  clearCart: () => void;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      orderType: "DELIVERY",
      addItem: (line) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === line.productId && l.variantId === line.variantId
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing ? { ...l, quantity: l.quantity + line.quantity } : l
              ),
            };
          }
          return { lines: [...state.lines, line] };
        }),
      removeItem: (productId, variantId) =>
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productId === productId && l.variantId === variantId)
          ),
        })),
      updateQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.productId === productId && l.variantId === variantId
                ? { ...l, quantity }
                : l
            )
            .filter((l) => l.quantity > 0),
        })),
      setNote: (productId, variantId, notes) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.productId === productId && l.variantId === variantId
              ? { ...l, notes }
              : l
          ),
        })),
      setOrderType: (orderType) => set({ orderType }),
      clearCart: () => set({ lines: [] }),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0),
    }),
    { name: "kirana-cart" }
  )
);
