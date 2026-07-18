import { neon } from "@neondatabase/serverless";
import sharp from "sharp";
import fs from "fs";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf-8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx), l.slice(idx + 1).replace(/^"|"$/g, "")];
    })
);

const sql = neon(env.DATABASE_URL);

const BUNNY_STORAGE_API_KEY = env.BUNNY_STORAGE_API_KEY;
const BUNNY_STORAGE_ZONE = env.BUNNY_STORAGE_ZONE;
const BUNNY_STORAGE_ENDPOINT = (env.BUNNY_STORAGE_ENDPOINT || `https://sg.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}`).replace(/\/+$/, "");
const BUNNY_CDN_URL = env.BUNNY_CDN_URL.replace(/\/+$/, "");

// Distinct greyscale-adjacent background per category, matching the app's
// minimalistic palette while keeping products visually distinguishable.
const CATEGORY_COLORS = {
  "Grains & Pulses": "d6d3d1",
  "Oils & Ghee": "e7e5e4",
  "Snacks & Biscuits": "d4d4d4",
  "Daily Essentials": "e5e5e5",
};

async function uploadToBunny(buffer, filename, folder) {
  const path = `${BUNNY_STORAGE_ENDPOINT}/${folder}/${filename}`;
  const res = await fetch(path, {
    method: "PUT",
    headers: { AccessKey: BUNNY_STORAGE_API_KEY, "Content-Type": "application/octet-stream" },
    body: new Uint8Array(buffer),
  });
  if (!res.ok) throw new Error(`Bunny upload failed for ${filename}: ${res.status}`);
  return `${BUNNY_CDN_URL}/${folder}/${filename}`;
}

async function main() {
  const products = await sql`
    select p.id, p.name_en, c.name_en as category_name
    from products p
    left join categories c on c.id = p.category_id
    where p.image_url is null
  `;

  console.log(`Found ${products.length} products without images.`);

  for (const p of products) {
    const bg = CATEGORY_COLORS[p.category_name] || "e5e5e5";
    const label = encodeURIComponent(p.name_en.replace(/\s+/g, "\n"));
    const placeholderUrl = `https://placehold.co/800x800/${bg}/44403c/png?text=${label}&font=roboto`;

    const imgRes = await fetch(placeholderUrl);
    if (!imgRes.ok) {
      console.log(`Skipping ${p.name_en}: placeholder fetch failed (${imgRes.status})`);
      continue;
    }
    const sourceBuffer = Buffer.from(await imgRes.arrayBuffer());

    const mainBuffer = await sharp(sourceBuffer)
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
    const thumbBuffer = await sharp(sourceBuffer)
      .resize(300, 300, { fit: "cover" })
      .webp({ quality: 70 })
      .toBuffer();

    const baseName = `product-${p.id}`;
    const imageUrl = await uploadToBunny(mainBuffer, `${baseName}.webp`, "product");
    const thumbnailUrl = await uploadToBunny(thumbBuffer, `${baseName}-thumb.webp`, "product/thumbnails");

    await sql`update products set image_url = ${imageUrl}, thumbnail_url = ${thumbnailUrl} where id = ${p.id}`;
    console.log(`Seeded image for: ${p.name_en}`);
  }

  console.log("Done.");
}

main().catch((e) => console.error("SEED IMAGES ERROR", e.message));
