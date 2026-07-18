"use server";

import { db } from "@/lib/db";
import { stores as storesTable } from "@/lib/db/schema";
import type { Store } from "@/lib/data/mock";

export async function listStores(): Promise<Store[]> {
  if (!db) return [];
  const rows = await db.select().from(storesTable);
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    active: row.active,
  }));
}
