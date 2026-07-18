import { stores } from "@/lib/data/mock";
import { Badge } from "@/components/ui/badge";

export default function SuperadminStoresPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Stores</h1>
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Slug</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((s) => (
              <tr key={s.id} className="border-t border-neutral-100 dark:border-neutral-900">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2 text-neutral-500">{s.slug}</td>
                <td className="px-4 py-2">
                  <Badge tone={s.active ? "default" : "outline"}>{s.active ? "Active" : "Inactive"}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
