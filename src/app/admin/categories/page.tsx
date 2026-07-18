"use client";

import { useState } from "react";
import { useCategoryStore } from "@/stores/categoryStore";
import { Card, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CategoriesPage() {
  const { categories, addCategory } = useCategoryStore();
  const [nameEn, setNameEn] = useState("");
  const [nameTe, setNameTe] = useState("");

  const submit = () => {
    if (!nameEn.trim()) return;
    addCategory({
      id: `cat-${Date.now()}`,
      name_en: nameEn.trim(),
      name_te: nameTe.trim(),
      parent_id: null,
    });
    setNameEn("");
    setNameTe("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Categories</h1>

      <Card>
        <CardBody className="space-y-3">
          <p className="text-sm font-medium">Add a category</p>
          <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Name (English)" />
            <Input value={nameTe} onChange={(e) => setNameTe(e.target.value)} placeholder="Name (Telugu)" />
            <Button onClick={submit}>Add</Button>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.id}>
            <CardBody>
              <p className="font-medium">{c.name_en}</p>
              <p className="text-sm text-neutral-500">{c.name_te}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
