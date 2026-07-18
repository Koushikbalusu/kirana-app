"use server";

import { headers, cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { customers } from "@/lib/db/schema";
import { phoneIdentifyLimiter, checkLimit } from "@/lib/redis/ratelimit";

const CUSTOMER_COOKIE = "kirana_customer";

export interface IdentifyResult {
  id: string;
  phone: string;
  name: string | null;
  isNew: boolean;
  error?: string;
}

/**
 * Frictionless phone identification: no OTP, no password. Silently creates
 * a customer record on first contact, autofills name on return visits.
 * Degrades to a local-only (non-persisted) identity if the DB isn't
 * configured yet, so checkout still works during early bring-up.
 */
export async function identifyCustomer(phone: string, name?: string): Promise<IdentifyResult> {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 10) {
    return { id: "", phone: cleaned, name: null, isNew: false, error: "Enter a valid phone number." };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed } = await checkLimit(phoneIdentifyLimiter, `identify:${ip}`);
  if (!allowed) {
    return { id: "", phone: cleaned, name: null, isNew: false, error: "Too many attempts. Please wait a minute." };
  }

  if (!db) {
    // No live DB yet -- still let checkout proceed with a session-only identity.
    const result = { id: `local-${cleaned}`, phone: cleaned, name: name || null, isNew: true };
    (await cookies()).set(CUSTOMER_COOKIE, JSON.stringify(result), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return result;
  }

  const existing = await db.select().from(customers).where(eq(customers.phone, cleaned)).limit(1);

  let record: { id: string; phone: string; name: string | null };
  let isNew = false;

  if (existing.length > 0) {
    record = existing[0];
  } else {
    const inserted = await db
      .insert(customers)
      .values({ phone: cleaned, name: name || null })
      .returning();
    record = inserted[0];
    isNew = true;
  }

  const result = { id: record.id, phone: record.phone, name: record.name, isNew };
  (await cookies()).set(CUSTOMER_COOKIE, JSON.stringify(result), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return result;
}

export async function getCustomerSession(): Promise<IdentifyResult | null> {
  const raw = (await cookies()).get(CUSTOMER_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
