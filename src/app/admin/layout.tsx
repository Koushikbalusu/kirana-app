import { RoleShell } from "@/components/shared/RoleShell";
import { getSession } from "@/lib/auth/session";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/delivery", label: "Delivery" },
  { href: "/admin/delivery/partners", label: "Delivery Partners" },
  { href: "/admin/customers", label: "Customers" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <RoleShell role="Admin" navLinks={navLinks} userName={session?.name}>
      {children}
    </RoleShell>
  );
}
