import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export type Role = "ADMIN" | "STAFF" | "DELIVERY_PARTNER" | "SUPERADMIN";

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")): string {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const attempt = scryptSync(password, salt, 64);
  const original = Buffer.from(hash, "hex");
  return attempt.length === original.length && timingSafeEqual(attempt, original);
}
