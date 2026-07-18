import { neon } from "@neondatabase/serverless";
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

const STORE_ID = "b3daf19b-f618-4942-8b68-b861e806cf50";

const CATEGORIES = [
  { key: "grains", en: "Grains & Pulses", translit: "Dhanyalu Pappulu", script: "ధాన్యాలు పప్పులు" },
  { key: "oils", en: "Oils & Ghee", translit: "Nunelu Neyyi", script: "నూనెలు నెయ్యి" },
  { key: "snacks", en: "Snacks & Biscuits", translit: "Tindlu Biscuitlu", script: "తిండ్లు బిస్కెట్లు" },
  { key: "daily", en: "Daily Essentials", translit: "Nityavasaralu", script: "నిత్యావసరాలు" },
];

const PRODUCTS = [
  {
    category: "grains", en: "Toor Dal", translit: "Kandi Pappu", script: "కందిపప్పు",
    type: "LOOSE", unit: "KG", minQty: 0.5, stepSize: 0.5, maxQty: 10, basePrice: 14000, status: "IN_STOCK",
    variants: [{ label: "500g", price: 7000 }, { label: "1kg", price: 14000 }],
  },
  {
    category: "grains", en: "Sona Masoori Rice", translit: "Sona Masoori Biyyam", script: "సోనా మసూరి బియ్యం",
    type: "LOOSE", unit: "KG", minQty: 1, stepSize: 1, maxQty: 25, basePrice: 6000, status: "IN_STOCK",
    variants: [],
  },
  {
    category: "grains", en: "Moong Dal", translit: "Pesara Pappu", script: "పెసర పప్పు",
    type: "LOOSE", unit: "KG", minQty: 0.5, stepSize: 0.5, maxQty: 10, basePrice: 13000, status: "IN_STOCK",
    variants: [{ label: "500g", price: 6500 }, { label: "1kg", price: 13000 }],
  },
  {
    category: "oils", en: "Sunflower Oil", translit: "Poddutirugudu Nune", script: "పొద్దుతిరుగుడు నూనె",
    type: "PACKAGED", unit: "Packet", minQty: 1, stepSize: 1, maxQty: null, basePrice: 18500, status: "IN_STOCK",
    variants: [{ label: "1L", price: 18500 }, { label: "5L", price: 87500 }],
  },
  {
    category: "oils", en: "Ghee", translit: "Neyyi", script: "నెయ్యి",
    type: "PACKAGED", unit: "Packet", minQty: 1, stepSize: 1, maxQty: null, basePrice: 55000, status: "IN_STOCK",
    variants: [{ label: "500ml", price: 55000 }],
  },
  {
    category: "oils", en: "Groundnut Oil", translit: "Verusenaga Nune", script: "వేరుశనగ నూనె",
    type: "PACKAGED", unit: "Packet", minQty: 1, stepSize: 1, maxQty: null, basePrice: 21000, status: "IN_STOCK",
    variants: [{ label: "1L", price: 21000 }],
  },
  {
    category: "snacks", en: "Parle-G Biscuit", translit: "Parle-G Biscuit", script: "పార్లే-జి బిస్కెట్",
    type: "PACKAGED", unit: "Packet", minQty: 1, stepSize: 1, maxQty: null, basePrice: 1000, status: "IN_STOCK",
    variants: [],
  },
  {
    category: "snacks", en: "Bread", translit: "Bread", script: "బ్రెడ్",
    type: "PACKAGED", unit: "Packet", minQty: 1, stepSize: 1, maxQty: null, basePrice: 4500, status: "IN_STOCK",
    variants: [],
  },
  {
    category: "daily", en: "Iodised Salt", translit: "Uppu", script: "ఉప్పు",
    type: "PACKAGED", unit: "Packet", minQty: 1, stepSize: 1, maxQty: null, basePrice: 2200, status: "IN_STOCK",
    variants: [],
  },
  {
    category: "daily", en: "Turmeric Powder", translit: "Pasupu", script: "పసుపు",
    type: "LOOSE", unit: "Gram", minQty: 50, stepSize: 50, maxQty: 1000, basePrice: 4000, status: "IN_STOCK",
    variants: [],
  },
];

async function main() {
  const existingStore = await sql`select id from stores where id = ${STORE_ID}`;
  if (existingStore.length === 0) {
    await sql`insert into stores (id, name, slug, active) values (${STORE_ID}, 'Sri Venkateswara Kirana Store', 'sri-venkateswara', true)`;
    console.log("Store created.");
  } else {
    console.log("Store already exists.");
  }

  const categoryIds = {};
  for (const cat of CATEGORIES) {
    const existing = await sql`select id from categories where store_id = ${STORE_ID} and name_en = ${cat.en}`;
    if (existing.length > 0) {
      categoryIds[cat.key] = existing[0].id;
      continue;
    }
    const inserted = await sql`
      insert into categories (store_id, name_en, name_te_transliteration, name_te_script)
      values (${STORE_ID}, ${cat.en}, ${cat.translit}, ${cat.script})
      returning id
    `;
    categoryIds[cat.key] = inserted[0].id;
    console.log(`Category created: ${cat.en}`);
  }

  for (const p of PRODUCTS) {
    const existing = await sql`select id from products where store_id = ${STORE_ID} and name_en = ${p.en}`;
    if (existing.length > 0) {
      console.log(`Skipping existing product: ${p.en}`);
      continue;
    }
    const inserted = await sql`
      insert into products (store_id, category_id, name_en, name_te_transliteration, name_te_script, type, unit, min_qty, step_size, max_qty, base_price, status)
      values (${STORE_ID}, ${categoryIds[p.category]}, ${p.en}, ${p.translit}, ${p.script}, ${p.type}, ${p.unit}, ${p.minQty}, ${p.stepSize}, ${p.maxQty}, ${p.basePrice}, ${p.status})
      returning id
    `;
    const productId = inserted[0].id;
    for (const v of p.variants) {
      await sql`insert into variants (product_id, label, price) values (${productId}, ${v.label}, ${v.price})`;
    }
    console.log(`Product created: ${p.en} (${p.variants.length} variants)`);
  }

  const counts = await sql`select
    (select count(*)::int from stores) as stores,
    (select count(*)::int from categories) as categories,
    (select count(*)::int from products) as products,
    (select count(*)::int from variants) as variants
  `;
  console.log("Final counts:", counts[0]);
}

main().catch((e) => console.error("SEED ERROR", e.message));
