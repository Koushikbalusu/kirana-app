import { NextResponse } from "next/server";
import { transliterateTeluguToLatin } from "@/lib/i18n/telugu-transliterate";
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
  // Only the curated glossary can resolve this direction; anything else
  // needs the English or Telugu-script field filled instead.
  return NextResponse.json(
    {
      error:
        "Can't reliably reverse-translate from Latin/transliteration text for unlisted items — try filling in the English name or Telugu script instead.",
    },
    { status: 422 }
  );
}
