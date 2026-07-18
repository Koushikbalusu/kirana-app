import { RoleShell } from "@/components/shared/RoleShell";
import { getSession } from "@/lib/auth/session";

const navLinks = [
  { href: "/superadmin", label: "Dashboard" },
  { href: "/superadmin/stores", label: "Stores" },
];

export default async function SuperadminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <RoleShell role="Superadmin" navLinks={navLinks} userName={session?.name}>
      {children}
    </RoleShell>
  );
}
