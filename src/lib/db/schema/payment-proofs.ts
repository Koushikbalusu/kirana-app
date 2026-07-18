import { pgTable, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const paymentProofs = pgTable("payment_proofs", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id).notNull(),
  imageUrl: text("image_url").notNull(),
  uploadedByRole: text("uploaded_by_role").notNull(),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
