import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { Role } from "./users";

const SESSION_COOKIE = "kirana_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecret(): string {
  return process.env.BETTER_AUTH_SECRET || "dev-only-insecure-secret-change-me";
}

export interface SessionPayload {
  userId: string;
  role: Role;
  name: string;
  email: string;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function encode(session: SessionPayload): string {
  const json = Buffer.from(JSON.stringify(session)).toString("base64url");
  const sig = sign(json);
  return `${json}.${sig}`;
}

function decode(token: string): SessionPayload | null {
  const [json, sig] = token.split(".");
  if (!json || !sig) return null;
  const expected = sign(json);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(json, "base64url").toString("utf-8"));
  } catch {
    return null;
  }
}

export async function createSession(session: SessionPayload) {
  const store = await cookies();
  store.set(SESSION_COOKIE, encode(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decode(token);
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;

/** Edge-safe variant for middleware (no next/headers import). */
export function decodeSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  return decode(token);
}
