import { RoleShell } from "@/components/shared/RoleShell";

const navLinks = [
  { href: "/superadmin", label: "Dashboard" },
  { href: "/superadmin/stores", label: "Stores" },
];

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell role="Superadmin" navLinks={navLinks}>
      {children}
    </RoleShell>
  );
}
