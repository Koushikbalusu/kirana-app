import { neon } from "@neondatabase/serverless";
import fs from "fs";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf-8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx), l.slice(idx + 1).replace(/^"|"$/g, "")];
    })
);

const sql = neon(env.DATABASE_URL);

// Clears only transactional/demo-prone data. Explicitly does NOT touch
// products, categories, variants, stores, or users -- those are real
// catalog/account data, not per-session junk.
async function main() {
  await sql`TRUNCATE TABLE payment_proofs, order_items, deliveries, orders, addresses, customers RESTART IDENTITY CASCADE`;
  console.log("Truncated: payment_proofs, order_items, deliveries, orders, addresses, customers");

  const counts = await sql`select
    (select count(*)::int from customers) as customers,
    (select count(*)::int from addresses) as addresses,
    (select count(*)::int from orders) as orders,
    (select count(*)::int from order_items) as order_items,
    (select count(*)::int from deliveries) as deliveries,
    (select count(*)::int from payment_proofs) as payment_proofs,
    (select count(*)::int from products) as products,
    (select count(*)::int from categories) as categories,
    (select count(*)::int from users) as users
  `;
  console.log("Counts after reset:", counts[0]);
}

main().catch((e) => console.error("ERROR", e.message));
