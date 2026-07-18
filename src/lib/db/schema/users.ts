import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { stores } from "./stores";

export const userRoleEnum = pgEnum("user_role", [
  "ADMIN",
  "STAFF",
  "DELIVERY_PARTNER",
  "SUPERADMIN",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
