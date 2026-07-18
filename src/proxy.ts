import { NextResponse, type NextRequest } from "next/server";
import { decodeSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import type { Role } from "@/lib/auth/users";

// Proxy always runs on the Node.js runtime, which is what lets us use the
// `crypto` module here to verify the session signature.
export const config = {
  matcher: ["/admin/:path*", "/delivery/:path*", "/superadmin/:path*"],
};

// Superadmin can access every admin page too -- superadmin is a superset
// of admin capability, scoped to a single store for now (see
// docs/CURRENT_STATE.md for the multi-store follow-up).
const ROLES_BY_PREFIX: { prefix: string; roles: Role[]; loginPath: string }[] = [
  { prefix: "/admin", roles: ["ADMIN", "STAFF", "SUPERADMIN"], loginPath: "/admin/login" },
  { prefix: "/delivery", roles: ["DELIVERY_PARTNER"], loginPath: "/delivery/login" },
  { prefix: "/superadmin", roles: ["SUPERADMIN"], loginPath: "/superadmin/login" },
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = ROLES_BY_PREFIX.find((r) => pathname.startsWith(r.prefix));
  if (!match) return NextResponse.next();
  if (pathname === match.loginPath) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = decodeSessionToken(token);

  if (!session || !match.roles.includes(session.role)) {
    const loginUrl = new URL(match.loginPath, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
