import { RoleShell } from "@/components/shared/RoleShell";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/delivery", label: "Delivery" },
  { href: "/admin/customers", label: "Customers" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell role="Admin" navLinks={navLinks}>
      {children}
    </RoleShell>
  );
}
