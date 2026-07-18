"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { verifyPassword, type Role } from "@/lib/auth/users";
import { getUserByEmail } from "@/actions/users";
import { createSession, destroySession } from "@/lib/auth/session";
import { phoneIdentifyLimiter, checkLimit } from "@/lib/redis/ratelimit";

const ROLE_HOME: Record<Role, string> = {
  ADMIN: "/admin",
  STAFF: "/admin",
  DELIVERY_PARTNER: "/delivery",
  SUPERADMIN: "/superadmin",
};

export interface LoginState {
  error?: string;
}

export async function login(
  expectedRoles: Role[],
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed } = await checkLimit(phoneIdentifyLimiter, `login:${ip}`);
  if (!allowed) {
    return { error: "Too many login attempts. Please wait a minute and try again." };
  }

  const user = await getUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid email or password." };
  }
  if (!expectedRoles.includes(user.role)) {
    return { error: "This account doesn't have access to this login." };
  }

  await createSession({ userId: user.id, role: user.role, name: user.name, email: user.email });
  redirect(ROLE_HOME[user.role]);
}

export async function logout() {
  await destroySession();
  redirect("/");
}
