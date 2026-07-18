import { pgTable, text, boolean, doublePrecision, uuid } from "drizzle-orm/pg-core";
import { customers } from "./customers";

export const addresses = pgTable("addresses", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").references(() => customers.id).notNull(),
  label: text("label"),
  houseNumber: text("house_number"),
  area: text("area"),
  landmark: text("landmark"),
  notes: text("notes"),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
  isDefault: boolean("is_default").notNull().default(false),
});
