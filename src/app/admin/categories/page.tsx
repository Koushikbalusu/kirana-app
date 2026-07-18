import { listCategories } from "@/actions/categories";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { Card, CardBody } from "@/components/ui/card";

export default async function CategoriesPage() {
  const categories = await listCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Categories</h1>

      <CategoryForm />

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.id}>
            <CardBody>
              <p className="font-medium">{c.name_en}</p>
              <p className="text-sm text-neutral-500">{c.name_te_script}</p>
              {c.name_te_transliteration && (
                <p className="text-xs text-neutral-400">{c.name_te_transliteration}</p>
              )}
            </CardBody>
          </Card>
        ))}
        {categories.length === 0 && (
          <p className="col-span-full text-neutral-500">No categories yet — add one above.</p>
        )}
      </div>
    </div>
  );
}
