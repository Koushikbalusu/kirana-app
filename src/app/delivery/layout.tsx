import { RoleShell } from "@/components/shared/RoleShell";
import { getSession } from "@/lib/auth/session";

const navLinks = [{ href: "/delivery", label: "My Deliveries" }];

export default async function DeliveryLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <RoleShell role="Delivery Partner" navLinks={navLinks} userName={session?.name}>
      {children}
    </RoleShell>
  );
}
