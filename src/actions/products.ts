"use server";

import { eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { products as productsTable, variants as variantsTable } from "@/lib/db/schema";
import { DEFAULT_STORE_ID } from "@/lib/constants";
import { requireStaffSession } from "@/lib/auth/authorize";
import type { Product, Variant, ProductType, ProductStatus } from "@/lib/data/mock";

type ProductRow = typeof productsTable.$inferSelect;
type VariantRow = typeof variantsTable.$inferSelect;

function toVariant(row: VariantRow): Variant {
  return {
    id: row.id,
    label: row.label,
    price: row.price,
    stock_status: row.stockStatus as ProductStatus,
  };
}

function toProduct(row: ProductRow, variantRows: VariantRow[]): Product {
  return {
    id: row.id,
    category_id: row.categoryId ?? "",
    name_en: row.nameEn,
    name_te_transliteration: row.nameTeTransliteration ?? "",
    name_te_script: row.nameTeScript ?? "",
    type: row.type as ProductType,
    unit: row.unit,
    min_qty: row.minQty,
    step_size: row.stepSize,
    max_qty: row.maxQty,
    base_price: row.basePrice,
    status: row.status as ProductStatus,
    variants: variantRows.filter((v) => v.productId === row.id).map(toVariant),
    image_url: row.imageUrl,
    thumbnail_url: row.thumbnailUrl,
  };
}

export async function listProducts(): Promise<Product[]> {
  if (!db) return [];
  const productRows = await db.select().from(productsTable).where(eq(productsTable.storeId, DEFAULT_STORE_ID));
  if (productRows.length === 0) return [];
  const variantRows = await db
    .select()
    .from(variantsTable)
    .where(
      inArray(
        variantsTable.productId,
        productRows.map((p) => p.id)
      )
    );
  return productRows.map((row) => toProduct(row, variantRows));
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!db) return null;
  const rows = await db.select().from(productsTable).where(eq(productsTable.id, id)).limit(1);
  if (rows.length === 0) return null;
  const variantRows = await db.select().from(variantsTable).where(eq(variantsTable.productId, id));
  return toProduct(rows[0], variantRows);
}

export interface ProductInput {
  name_en: string;
  name_te_transliteration: string;
  name_te_script: string;
  category_id: string;
  type: ProductType;
  unit: string;
  min_qty: number;
  step_size: number;
  base_price: number;
  status: ProductStatus;
  image_url: string | null;
  thumbnail_url: string | null;
  variants: { label: string; price: number }[];
}

export async function createProduct(input: ProductInput): Promise<Product | null> {
  await requireStaffSession();
  if (!db) return null;
  const inserted = await db
    .insert(productsTable)
    .values({
      storeId: DEFAULT_STORE_ID,
      categoryId: input.category_id,
      nameEn: input.name_en,
      nameTeTransliteration: input.name_te_transliteration || null,
      nameTeScript: input.name_te_script || null,
      type: input.type,
      unit: input.unit,
      minQty: input.min_qty,
      stepSize: input.step_size,
      basePrice: input.base_price,
      status: input.status,
      imageUrl: input.image_url,
      thumbnailUrl: input.thumbnail_url,
    })
    .returning();

  const product = inserted[0];

  let variantRows: VariantRow[] = [];
  if (input.variants.length > 0) {
    variantRows = await db
      .insert(variantsTable)
      .values(input.variants.map((v) => ({ productId: product.id, label: v.label, price: v.price })))
      .returning();
  }

  return toProduct(product, variantRows);
}

export async function updateProduct(id: string, input: ProductInput): Promise<Product | null> {
  await requireStaffSession();
  if (!db) return null;
  const updated = await db
    .update(productsTable)
    .set({
      categoryId: input.category_id,
      nameEn: input.name_en,
      nameTeTransliteration: input.name_te_transliteration || null,
      nameTeScript: input.name_te_script || null,
      type: input.type,
      unit: input.unit,
      minQty: input.min_qty,
      stepSize: input.step_size,
      basePrice: input.base_price,
      status: input.status,
      imageUrl: input.image_url,
      thumbnailUrl: input.thumbnail_url,
    })
    .where(eq(productsTable.id, id))
    .returning();

  const product = updated[0];

  await db.delete(variantsTable).where(eq(variantsTable.productId, id));
  let variantRows: VariantRow[] = [];
  if (input.variants.length > 0) {
    variantRows = await db
      .insert(variantsTable)
      .values(input.variants.map((v) => ({ productId: id, label: v.label, price: v.price })))
      .returning();
  }

  return toProduct(product, variantRows);
}
