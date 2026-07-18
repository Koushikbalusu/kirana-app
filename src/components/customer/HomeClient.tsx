"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/customer/ProductCard";
import { useTranslation } from "@/i18n";
import { cn } from "@/lib/utils/cn";
import { Search } from "lucide-react";
import type { Product, Category } from "@/lib/data/mock";

export function HomeClient({ products, categories }: { products: Product[]; categories: Category[] }) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    return products
      .filter((p) => p.status !== "HIDDEN")
      .filter((p) => activeCategory === "all" || p.category_id === activeCategory)
      .filter((p) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          p.name_en.toLowerCase().includes(q) ||
          p.name_te_transliteration.toLowerCase().includes(q) ||
          p.name_te_script.includes(query)
        );
      });
  }, [products, activeCategory, query]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold sm:text-2xl">{t.home.tagline}</h1>
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — dal, pappu, కంది..."
            className="w-full rounded-md border border-neutral-300 bg-white py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:ring-neutral-100"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-sm",
            activeCategory === "all"
              ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
              : "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm",
              activeCategory === c.id
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
            )}
          >
            {c.name_en}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {visible.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-neutral-500">
            {products.length === 0 ? "No products yet." : "No products match your search."}
          </p>
        )}
      </div>
    </div>
  );
}
