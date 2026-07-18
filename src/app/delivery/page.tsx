import { getSession } from "@/lib/auth/session";
import { DeliveryDashboardClient } from "@/components/delivery/DeliveryDashboardClient";

export default async function DeliveryDashboard() {
  const session = await getSession();
  return <DeliveryDashboardClient partnerId={session!.userId} partnerName={session!.name} />;
}
