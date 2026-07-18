"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { deliveryPartners as seedPartners, type DeliveryPartner } from "@/lib/data/mock";

interface PartnerState {
  partners: DeliveryPartner[];
  addPartner: (partner: DeliveryPartner) => void;
  removePartner: (id: string) => void;
}

export const usePartnerStore = create<PartnerState>()(
  persist(
    (set) => ({
      partners: seedPartners,
      addPartner: (partner) => set((state) => ({ partners: [...state.partners, partner] })),
      removePartner: (id) =>
        set((state) => ({ partners: state.partners.filter((p) => p.id !== id) })),
    }),
    { name: "kirana-partners" }
  )
);
