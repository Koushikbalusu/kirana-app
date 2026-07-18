import { pgTable, text, integer, doublePrecision, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { stores } from "./stores";
import { categories } from "./categories";

export const productTypeEnum = pgEnum("product_type", ["PACKAGED", "LOOSE"]);
export const productStatusEnum = pgEnum("product_status", [
  "IN_STOCK",
  "OUT_OF_STOCK",
  "HIDDEN",
]);

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id).notNull(),
  categoryId: uuid("category_id").references(() => categories.id),
  nameEn: text("name_en").notNull(),
  nameTeTransliteration: text("name_te_transliteration"),
  nameTeScript: text("name_te_script"),
  description: text("description"),
  type: productTypeEnum("type").notNull(),
  unit: text("unit").notNull(),
  minQty: doublePrecision("min_qty").notNull().default(1),
  stepSize: doublePrecision("step_size").notNull().default(1),
  maxQty: doublePrecision("max_qty"),
  basePrice: integer("base_price").notNull(),
  status: productStatusEnum("status").notNull().default("IN_STOCK"),
  imageUrl: text("image_url"),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
