import { pgTable, text, integer, uuid } from "drizzle-orm/pg-core";
import { stores } from "./stores";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id).notNull(),
  nameEn: text("name_en").notNull(),
  nameTeTransliteration: text("name_te_transliteration"),
  nameTeScript: text("name_te_script"),
  parentId: uuid("parent_id").references((): AnyPgColumn => categories.id),
  sortOrder: integer("sort_order").notNull().default(0),
});
