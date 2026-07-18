import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Degrades gracefully: if DATABASE_URL isn't set yet (e.g. during early
 * bring-up before Neon is provisioned), `db` is null and callers should
 * fall back to src/lib/data/mock.ts instead of crashing.
 */
export const db = process.env.DATABASE_URL
  ? drizzle(neon(process.env.DATABASE_URL), { schema })
  : null;

export const isDbConfigured = Boolean(process.env.DATABASE_URL);
