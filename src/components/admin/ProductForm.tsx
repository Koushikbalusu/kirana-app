"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import type { Product } from "@/lib/data/mock";
import { Trash2, Plus } from "lucide-react";
import { ImageUpload } from "@/components/shared/ImageUpload";

const variantSchema = z.object({
  label: z.string().min(1, "Required"),
  price: z.coerce.number().min(1, "Required"),
});

const schema = z.object({
  name_en: z.string().min(1, "Required"),
  name_te_transliteration: z.string().optional(),
  name_te_script: z.string().optional(),
  category_id: z.string().min(1, "Required"),
  type: z.enum(["PACKAGED", "LOOSE"]),
  unit: z.string().min(1, "Required"),
  min_qty: z.coerce.number().min(0.01),
  step_size: z.coerce.number().min(0.01),
  base_price: z.coerce.number().min(1, "Required"),
  status: z.enum(["IN_STOCK", "OUT_OF_STOCK", "HIDDEN"]),
  variants: z.array(variantSchema),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function ProductForm({ existing }: { existing?: Product }) {
  const router = useRouter();
  const categories = useCategoryStore((s) => s.categories);
  const { addProduct, updateProduct } = useProductStore();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(existing?.image_url ?? null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(existing?.thumbnail_url ?? null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: existing
      ? {
          name_en: existing.name_en,
          name_te_transliteration: existing.name_te_transliteration,
          name_te_script: existing.name_te_script,
          category_id: existing.category_id,
          type: existing.type,
          unit: existing.unit,
          min_qty: existing.min_qty,
          step_size: existing.step_size,
          base_price: existing.base_price,
          status: existing.status,
          variants: existing.variants.map((v) => ({ label: v.label, price: v.price })),
        }
      : {
          type: "PACKAGED",
          unit: "Packet",
          min_qty: 1,
          step_size: 1,
          status: "IN_STOCK",
          variants: [],
        },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "variants" });

  const onSubmit = (values: FormValues) => {
    setSubmitError(null);
    const common = {
      ...values,
      name_te_transliteration: values.name_te_transliteration ?? "",
      name_te_script: values.name_te_script ?? "",
      image_url: imageUrl,
      thumbnail_url: thumbnailUrl,
    };
    try {
      if (existing) {
        updateProduct(existing.id, {
          ...common,
          max_qty: existing.max_qty,
          variants: values.variants.map((v, i) => ({
            id: existing.variants[i]?.id ?? `v-${Date.now()}-${i}`,
            label: v.label,
            price: v.price,
            stock_status: existing.variants[i]?.stock_status ?? "IN_STOCK",
          })),
        });
        router.push("/admin/products");
      } else {
        addProduct({
          id: `prod-${Date.now()}`,
          ...common,
          max_qty: null,
          variants: values.variants.map((v, i) => ({
            id: `v-${Date.now()}-${i}`,
            label: v.label,
            price: v.price,
            stock_status: "IN_STOCK",
          })),
        });
        router.push("/admin/products");
      }
    } catch {
      setSubmitError("Something went wrong saving the product.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
      <Card>
        <CardBody className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Product image</label>
            <ImageUpload
              type="product"
              onUploaded={({ imageUrl: u, thumbnailUrl: t }) => {
                setImageUrl(u);
                setThumbnailUrl(t);
              }}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Name (English)</label>
              <Input {...register("name_en")} />
              {errors.name_en && <p className="mt-1 text-xs text-red-600">{errors.name_en.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <Select {...register("category_id")}>
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name_en}
                  </option>
                ))}
              </Select>
              {errors.category_id && <p className="mt-1 text-xs text-red-600">{errors.category_id.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Telugu transliteration</label>
              <Input {...register("name_te_transliteration")} placeholder="e.g. Kandi Pappu" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Telugu script</label>
              <Input {...register("name_te_script")} placeholder="e.g. కందిపప్పు" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Type</label>
              <Select {...register("type")}>
                <option value="PACKAGED">Packaged</option>
                <option value="LOOSE">Loose</option>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Unit</label>
              <Input {...register("unit")} placeholder="KG, Packet, Liter…" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Min quantity</label>
              <Input type="number" step="0.01" {...register("min_qty")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Step size</label>
              <Input type="number" step="0.01" {...register("step_size")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Base price (paise)</label>
              <Input type="number" {...register("base_price")} />
              {errors.base_price && <p className="mt-1 text-xs text-red-600">{errors.base_price.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <Select {...register("status")}>
                <option value="IN_STOCK">In Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
                <option value="HIDDEN">Hidden</option>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Variants (optional)</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => append({ label: "", price: 0 })}
            >
              <Plus className="mr-1 h-3.5 w-3.5" /> Add variant
            </Button>
          </div>
          {fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input {...register(`variants.${i}.label`)} placeholder="Label e.g. 1kg" />
              <Input type="number" {...register(`variants.${i}.price`)} placeholder="Price (paise)" />
              <button type="button" onClick={() => remove(i)} className="p-2 text-neutral-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </CardBody>
      </Card>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {existing ? "Save changes" : "Create product"}
      </Button>
    </form>
  );
}
