import { listDeliveryPartners } from "@/actions/users";
import { DeliveryPartnerForm } from "@/components/admin/DeliveryPartnerForm";
import { DeliveryPartnerRow } from "@/components/admin/DeliveryPartnerRow";

export const dynamic = "force-dynamic";

export default async function DeliveryPartnersPage() {
  const partners = await listDeliveryPartners();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Delivery Partners</h1>

      <DeliveryPartnerForm />

      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Phone</th>
              <th className="px-4 py-2 font-medium">Login (Email / Username)</th>
              <th className="px-4 py-2 font-medium">Password</th>
              <th className="px-4 py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <DeliveryPartnerRow key={p.id} partner={p} />
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                  No delivery partners yet — add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
