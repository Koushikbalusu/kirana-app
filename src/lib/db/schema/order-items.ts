import { pgTable, text, integer, doublePrecision, uuid } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { products } from "./products";
import { variants } from "./variants";

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id).notNull(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  variantId: uuid("variant_id").references(() => variants.id),
  quantity: doublePrecision("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(),
  itemDiscount: integer("item_discount").notNull().default(0),
  itemNotes: text("item_notes"),
});
