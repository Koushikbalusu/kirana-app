"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { orders as seedOrders, type Order, type OrderStatus } from "@/lib/data/mock";

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: OrderStatus) => void;
  assignPartner: (id: string, partnerId: string) => void;
  markPaid: (id: string) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: seedOrders,
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      assignPartner: (id, partnerId) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, partner_id: partnerId } : o)),
        })),
      markPaid: (id) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, payment_status: "PAID" } : o)),
        })),
    }),
    { name: "kirana-orders" }
  )
);
