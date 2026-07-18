import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export type Role = "ADMIN" | "STAFF" | "DELIVERY_PARTNER" | "SUPERADMIN";

export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string; // "salt:hash"
  role: Role;
  name: string;
}

function hashPassword(password: string, salt = randomBytes(16).toString("hex")): string {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const attempt = scryptSync(password, salt, 64);
  const original = Buffer.from(hash, "hex");
  return attempt.length === original.length && timingSafeEqual(attempt, original);
}

/**
 * Seed users for MVP demo — no live DB required yet.
 * Once DATABASE_URL is live, replace with a `users` table lookup
 * (see src/lib/db/schema/users.ts) and swap Better Auth in properly.
 * Demo password for every seed account: "kirana123"
 */
const DEMO_PASSWORD_HASH = hashPassword("kirana123", "d3f4u17s417");

export const seedUsers: AuthUser[] = [
  { id: "u-admin", email: "admin@kirana.app", passwordHash: DEMO_PASSWORD_HASH, role: "ADMIN", name: "Store Admin" },
  { id: "u-delivery", email: "delivery@kirana.app", passwordHash: DEMO_PASSWORD_HASH, role: "DELIVERY_PARTNER", name: "Ramesh Kumar" },
  { id: "u-superadmin", email: "super@kirana.app", passwordHash: DEMO_PASSWORD_HASH, role: "SUPERADMIN", name: "Platform Owner" },
];

export function findUserByEmail(email: string): AuthUser | undefined {
  return seedUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
}
