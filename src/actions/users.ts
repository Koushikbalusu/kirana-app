"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users as usersTable } from "@/lib/db/schema";
import { hashPassword, verifyPassword, type Role } from "@/lib/auth/users";
import { getSession } from "@/lib/auth/session";
import { requireStaffSession } from "@/lib/auth/authorize";
import { DEFAULT_STORE_ID } from "@/lib/constants";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
}

function toUserRecord(row: typeof usersTable.$inferSelect): UserRecord {
  return { id: row.id, name: row.name, email: row.email, phone: row.phone, role: row.role as Role };
}

export async function getUserByEmail(email: string): Promise<
  (UserRecord & { passwordHash: string }) | null
> {
  if (!db) return null;
  const rows = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase())).limit(1);
  if (rows.length === 0) return null;
  return { ...toUserRecord(rows[0]), passwordHash: rows[0].passwordHash };
}

export interface CreateDeliveryPartnerResult {
  user?: UserRecord;
  error?: string;
}

export async function createDeliveryPartner(input: {
  name: string;
  phone: string;
  email: string;
  password: string;
}): Promise<CreateDeliveryPartnerResult> {
  await requireStaffSession();
  if (!db) return { error: "Database isn't configured yet." };

  const email = input.email.trim().toLowerCase();
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
    return { error: "An account with this email already exists." };
  }
  if (input.password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const inserted = await db
    .insert(usersTable)
    .values({
      storeId: DEFAULT_STORE_ID,
      name: input.name.trim(),
      phone: input.phone.trim(),
      email,
      passwordHash: hashPassword(input.password),
      role: "DELIVERY_PARTNER",
    })
    .returning();

  return { user: toUserRecord(inserted[0]) };
}

export async function listDeliveryPartners(): Promise<UserRecord[]> {
  if (!db) return [];
  const rows = await db.select().from(usersTable).where(eq(usersTable.role, "DELIVERY_PARTNER"));
  return rows.map(toUserRecord);
}

export async function removeDeliveryPartner(id: string): Promise<{ error?: string }> {
  await requireStaffSession();
  if (!db) return { error: "Database isn't configured yet." };
  await db.delete(usersTable).where(eq(usersTable.id, id));
  return {};
}

export async function adminResetPassword(
  userId: string,
  newPassword: string
): Promise<{ error?: string }> {
  await requireStaffSession();
  if (!db) return { error: "Database isn't configured yet." };
  if (newPassword.length < 6) return { error: "Password must be at least 6 characters." };

  await db.update(usersTable).set({ passwordHash: hashPassword(newPassword) }).where(eq(usersTable.id, userId));
  return {};
}

export async function changeOwnPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ error?: string; success?: boolean }> {
  const session = await getSession();
  if (!session) return { error: "Not signed in." };
  if (!db) return { error: "Database isn't configured yet." };
  if (newPassword.length < 6) return { error: "New password must be at least 6 characters." };

  const rows = await db.select().from(usersTable).where(eq(usersTable.id, session.userId)).limit(1);
  if (rows.length === 0) return { error: "Account not found." };

  if (!verifyPassword(currentPassword, rows[0].passwordHash)) {
    return { error: "Current password is incorrect." };
  }

  await db
    .update(usersTable)
    .set({ passwordHash: hashPassword(newPassword) })
    .where(eq(usersTable.id, session.userId));
  return { success: true };
}
