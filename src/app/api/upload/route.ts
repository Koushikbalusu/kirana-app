import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { processProductImage, generateThumbnail } from "@/lib/storage/sharp";
import { uploadToBunny, isBunnyConfigured } from "@/lib/storage/bunny";
import { uploadLimiter, checkLimit } from "@/lib/redis/ratelimit";
import { requireStaffSession } from "@/lib/auth/authorize";

export async function POST(request: Request) {
  try {
    await requireStaffSession();
  } catch {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed } = await checkLimit(uploadLimiter, `upload:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many uploads. Try again shortly." }, { status: 429 });
  }

  if (!isBunnyConfigured) {
    return NextResponse.json(
      { error: "Image storage isn't configured yet (Bunny keys pending). Try again once it's set up." },
      { status: 503 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  const type = String(form.get("type") || "product");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const baseName = `${type}-${Date.now()}`;

  const mainBuffer = await processProductImage(buffer);
  const imageUrl = await uploadToBunny(mainBuffer, `${baseName}.webp`, type);

  let thumbnailUrl: string | null = null;
  if (type === "product" || type === "category") {
    const thumbBuffer = await generateThumbnail(buffer);
    thumbnailUrl = await uploadToBunny(thumbBuffer, `${baseName}-thumb.webp`, `${type}/thumbnails`);
  }

  if (!imageUrl) {
    return NextResponse.json({ error: "Upload to storage failed" }, { status: 502 });
  }

  return NextResponse.json({ imageUrl, thumbnailUrl });
}
