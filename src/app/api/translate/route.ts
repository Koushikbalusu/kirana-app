import { NextResponse } from "next/server";
import { transliterateTeluguToLatin } from "@/lib/i18n/telugu-transliterate";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text")?.trim();

  if (!text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=te&dt=t&q=${encodeURIComponent(text)}`
    );
    if (!res.ok) {
      return NextResponse.json({ error: "Translation service unavailable" }, { status: 502 });
    }
    const data = await res.json();
    const script: string = data?.[0]?.map((seg: [string]) => seg[0]).join("") ?? "";
    if (!script) {
      return NextResponse.json({ error: "No translation returned" }, { status: 502 });
    }
    const transliteration = transliterateTeluguToLatin(script);
    return NextResponse.json({ script, transliteration });
  } catch {
    return NextResponse.json({ error: "Translation failed" }, { status: 502 });
  }
}
