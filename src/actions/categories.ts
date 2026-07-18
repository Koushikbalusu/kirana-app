"use server";

import { eq, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { categories as categoriesTable } from "@/lib/db/schema";
import { DEFAULT_STORE_ID } from "@/lib/constants";
import type { Category } from "@/lib/data/mock";

function toCategory(row: typeof categoriesTable.$inferSelect): Category {
  return {
    id: row.id,
    name_en: row.nameEn,
    name_te_transliteration: row.nameTeTransliteration ?? "",
    name_te_script: row.nameTeScript ?? "",
    parent_id: row.parentId,
  };
}

export async function listCategories(): Promise<Category[]> {
  if (!db) return [];
  const rows = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.storeId, DEFAULT_STORE_ID))
    .orderBy(asc(categoriesTable.sortOrder));
  return rows.map(toCategory);
}

export async function createCategory(input: {
  name_en: string;
  name_te_transliteration: string;
  name_te_script: string;
}): Promise<Category | null> {
  if (!db) return null;
  const inserted = await db
    .insert(categoriesTable)
    .values({
      storeId: DEFAULT_STORE_ID,
      nameEn: input.name_en,
      nameTeTransliteration: input.name_te_transliteration || null,
      nameTeScript: input.name_te_script || null,
    })
    .returning();
  return toCategory(inserted[0]);
}
