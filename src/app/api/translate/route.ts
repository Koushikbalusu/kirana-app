import { NextResponse } from "next/server";
import { transliterateTeluguToLatin } from "@/lib/i18n/telugu-transliterate";
import { transliterateLatinToTelugu } from "@/lib/i18n/latin-to-telugu";
import { lookupGlossary } from "@/lib/i18n/grocery-glossary";

type Field = "en" | "teScript" | "teTransliteration";

async function googleTranslate(text: string, from: string, to: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const joined: string = data?.[0]?.map((seg: [string]) => seg[0]).join("") ?? "";
    return joined || null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text")?.trim();
  const field = (searchParams.get("field") as Field) || "en";

  if (!text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  // Curated grocery glossary wins over generic MT for known items --
  // colloquial Indian grocery names often get mistranslated/transliterated
  // wrong by general translation models (see src/lib/i18n/grocery-glossary.ts).
  const glossaryHit = lookupGlossary(field, text);
  if (glossaryHit) {
    return NextResponse.json({
      en: glossaryHit.en,
      script: glossaryHit.teScript,
      transliteration: glossaryHit.teTransliteration,
      source: "glossary",
    });
  }

  if (field === "en") {
    const script = await googleTranslate(text, "en", "te");
    if (!script) return NextResponse.json({ error: "Translation failed" }, { status: 502 });
    return NextResponse.json({
      en: text,
      script,
      transliteration: transliterateTeluguToLatin(script),
      source: "translate",
    });
  }

  if (field === "teScript") {
    const en = await googleTranslate(text, "te", "en");
    if (!en) return NextResponse.json({ error: "Translation failed" }, { status: 502 });
    return NextResponse.json({
      en,
      script: text,
      transliteration: transliterateTeluguToLatin(text),
      source: "translate",
    });
  }

  // field === "teTransliteration": generic MT cannot reliably reconstruct
  // Telugu script or English from romanized text (verified -- Google's
  // free endpoint just echoes Latin input back unchanged for `sl=te`).
  // Best-effort fallback: reconstruct an approximate Telugu script via a
  // phonetic Latin->Telugu mapping, then translate that to English. Flagged
  // as "approximate" so the UI can tell the admin to double-check it,
  // rather than presenting a guess as ground truth.
  const approximateScript = transliterateLatinToTelugu(text);
  const en = await googleTranslate(approximateScript, "te", "en");
  return NextResponse.json({
    en: en || text,
    script: approximateScript,
    transliteration: text,
    source: "approximate",
  });
}
