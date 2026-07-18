"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { createCategory } from "@/actions/categories";

export function CategoryForm() {
  const router = useRouter();
  const [nameEn, setNameEn] = useState("");
  const [nameTeTranslit, setNameTeTranslit] = useState("");
  const [nameTeScript, setNameTeScript] = useState("");
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleTranslate = async () => {
    let field: "en" | "teScript" | "teTransliteration";
    let value: string;
    if (nameEn.trim()) {
      field = "en";
      value = nameEn.trim();
    } else if (nameTeScript.trim()) {
      field = "teScript";
      value = nameTeScript.trim();
    } else if (nameTeTranslit.trim()) {
      field = "teTransliteration";
      value = nameTeTranslit.trim();
    } else {
      setTranslateError("Enter at least one of English name, Telugu script, or transliteration first.");
      return;
    }

    setTranslating(true);
    setTranslateError(null);
    try {
      const res = await fetch(`/api/translate?field=${field}&text=${encodeURIComponent(value)}`);
      const data = await res.json();
      if (!res.ok) {
        setTranslateError(data.error || "Translation failed.");
        return;
      }
      setNameEn(data.en);
      setNameTeScript(data.script);
      setNameTeTranslit(data.transliteration);
    } catch {
      setTranslateError("Translation failed — check your connection.");
    } finally {
      setTranslating(false);
    }
  };

  const submit = async () => {
    if (!nameEn.trim()) return;
    setSubmitting(true);
    try {
      await createCategory({
        name_en: nameEn.trim(),
        name_te_transliteration: nameTeTranslit.trim(),
        name_te_script: nameTeScript.trim(),
      });
      setNameEn("");
      setNameTeTranslit("");
      setNameTeScript("");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardBody className="space-y-3">
        <p className="text-sm font-medium">Add a category</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Name (English)" />
          <Input
            value={nameTeTranslit}
            onChange={(e) => setNameTeTranslit(e.target.value)}
            placeholder="Telugu transliteration"
          />
          <Input
            value={nameTeScript}
            onChange={(e) => setNameTeScript(e.target.value)}
            placeholder="Telugu script"
          />
        </div>
        <div>
          <Button type="button" size="sm" variant="outline" onClick={handleTranslate} disabled={translating}>
            <Languages className="mr-1.5 h-3.5 w-3.5" />
            {translating ? "Translating…" : "Fill all name fields"}
          </Button>
          {translateError && <p className="mt-1 text-xs text-red-600">{translateError}</p>}
        </div>
        <Button onClick={submit} disabled={submitting || !nameEn.trim()}>
          {submitting ? "Adding…" : "Add category"}
        </Button>
      </CardBody>
    </Card>
  );
}
