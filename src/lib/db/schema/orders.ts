import { pgTable, text, integer, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { stores } from "./stores";
import { customers } from "./customers";
import { addresses } from "./addresses";

export const orderTypeEnum = pgEnum("order_type", ["DELIVERY", "PICKUP"]);
export const orderStatusEnum = pgEnum("order_status", [
  "PLACED",
  "IN_TRANSIT",
  "DELIVERED",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "CANCELLED",
]);
export const paymentModeEnum = pgEnum("payment_mode", ["CASH", "UPI", "BANK_TRANSFER"]);
export const paymentStatusEnum = pgEnum("payment_status", ["PENDING", "PAID"]);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id).notNull(),
  customerId: uuid("customer_id").references(() => customers.id).notNull(),
  type: orderTypeEnum("type").notNull(),
  status: orderStatusEnum("status").notNull().default("PLACED"),
  addressId: uuid("address_id").references(() => addresses.id),
  subtotal: integer("subtotal").notNull(),
  deliveryCharge: integer("delivery_charge").notNull().default(0),
  bagCharge: integer("bag_charge").notNull().default(0),
  discount: integer("discount").notNull().default(0),
  total: integer("total").notNull(),
  paymentMode: paymentModeEnum("payment_mode").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").notNull().default("PENDING"),
  customerNotes: text("customer_notes"),
  billingNotes: text("billing_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
