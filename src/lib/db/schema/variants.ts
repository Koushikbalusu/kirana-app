import { pgTable, text, integer, uuid } from "drizzle-orm/pg-core";
import { products, productStatusEnum } from "./products";

export const variants = pgTable("variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  label: text("label").notNull(),
  price: integer("price").notNull(),
  stockStatus: productStatusEnum("stock_status").notNull().default("IN_STOCK"),
});
