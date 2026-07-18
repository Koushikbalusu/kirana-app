import { RoleShell } from "@/components/shared/RoleShell";

const navLinks = [{ href: "/delivery", label: "My Deliveries" }];

export default function DeliveryLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleShell role="Delivery Partner" navLinks={navLinks}>
      {children}
    </RoleShell>
  );
}
