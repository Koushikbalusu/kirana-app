import { neon } from "@neondatabase/serverless";
import { scryptSync, randomBytes } from "crypto";
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
const STORE_ID = "b3daf19b-f618-4942-8b68-b861e806cf50";

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const DEMO_PASSWORD_HASH = hashPassword("kirana123");

const DEMO_USERS = [
  { name: "Store Admin", email: "admin@kirana.app", role: "ADMIN", phone: null },
  { name: "Ramesh Kumar", email: "delivery@kirana.app", role: "DELIVERY_PARTNER", phone: "9876543210" },
  { name: "Platform Owner", email: "super@kirana.app", role: "SUPERADMIN", phone: null },
];

async function main() {
  for (const u of DEMO_USERS) {
    const existing = await sql`select id from users where email = ${u.email}`;
    if (existing.length > 0) {
      console.log(`Already exists: ${u.email}`);
      continue;
    }
    await sql`
      insert into users (store_id, name, email, phone, password_hash, role)
      values (${STORE_ID}, ${u.name}, ${u.email}, ${u.phone}, ${DEMO_PASSWORD_HASH}, ${u.role})
    `;
    console.log(`Created: ${u.email} (${u.role})`);
  }

  const count = await sql`select count(*)::int as count from users`;
  console.log("Total users in DB:", count[0].count);
}

main().catch((e) => console.error("SEED ERROR", e.message));
