import { getSession, type SessionPayload } from "./session";
import type { Role } from "./users";

const STAFF_ROLES: Role[] = ["ADMIN", "STAFF", "SUPERADMIN"];

/**
 * Guards Server Actions / API routes that mutate store data. UI-level
 * route gating (src/proxy.ts) only protects page navigation -- Server
 * Actions are directly callable endpoints regardless of which page
 * rendered them, so every mutating action needs its own check.
 */
export async function requireStaffSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session || !STAFF_ROLES.includes(session.role)) {
    throw new Error("Not authorized.");
  }
  return session;
}
