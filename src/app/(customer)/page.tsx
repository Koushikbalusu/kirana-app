import { listProducts } from "@/actions/products";
import { listCategories } from "@/actions/categories";
import { HomeClient } from "@/components/customer/HomeClient";

// Reads live product/category data on every request -- must not be
// statically cached, or newly added products won't show up without a redeploy.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, categories] = await Promise.all([listProducts(), listCategories()]);
  return <HomeClient products={products} categories={categories} />;
}
