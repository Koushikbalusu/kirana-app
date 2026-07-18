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

/**
 * Reconciles a browser's cached (localStorage) orders with the current
 * seed data. Zustand's persist middleware otherwise restores exactly what
 * was cached and never re-applies new seed fields (e.g. lat/lng added
 * after someone already visited the site) -- this patches missing fields
 * from seed data by id, and appends any seed orders the cache predates.
 */
function reconcileWithSeed(persistedOrders: Order[]): Order[] {
  const seedById = new Map(seedOrders.map((o) => [o.id, o]));
  const merged = persistedOrders.map((o) => {
    const seed = seedById.get(o.id);
    if (!seed) return o;
    return {
      ...o,
      lat: o.lat ?? seed.lat,
      lng: o.lng ?? seed.lng,
    };
  });
  for (const seed of seedOrders) {
    if (!merged.some((o) => o.id === seed.id)) merged.push(seed);
  }
  return merged;
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
    {
      name: "kirana-orders",
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<OrderState> | undefined;
        return {
          ...currentState,
          orders: reconcileWithSeed(persisted?.orders ?? []),
        };
      },
    }
  )
);
