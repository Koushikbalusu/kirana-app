/**
 * In-memory data layer used whenever DATABASE_URL is not configured.
 * Shape mirrors src/lib/db/schema/* exactly so swapping in real Drizzle
 * queries later is a like-for-like replacement, not a rewrite.
 */

export type ProductType = "PACKAGED" | "LOOSE";
export type ProductStatus = "IN_STOCK" | "OUT_OF_STOCK" | "HIDDEN";
export type OrderType = "DELIVERY" | "PICKUP";
export type OrderStatus =
  | "PLACED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "READY_FOR_PICKUP"
  | "PICKED_UP"
  | "CANCELLED";
export type PaymentMode = "CASH" | "UPI" | "BANK_TRANSFER";
export type PaymentStatus = "PENDING" | "PAID";

export interface Category {
  id: string;
  name_en: string;
  name_te: string;
  parent_id: string | null;
}

export interface Variant {
  id: string;
  label: string;
  price: number; // paise
  stock_status: ProductStatus;
}

export interface Product {
  id: string;
  category_id: string;
  name_en: string;
  name_te_transliteration: string;
  name_te_script: string;
  type: ProductType;
  unit: string;
  min_qty: number;
  step_size: number;
  max_qty: number | null;
  base_price: number; // paise
  status: ProductStatus;
  variants: Variant[];
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
}

export interface OrderItem {
  product_id: string;
  variant_id: string | null;
  name_en: string;
  quantity: number;
  unit_price: number;
  item_notes?: string;
}

export interface Order {
  id: string;
  store_id: string;
  customer_name: string;
  customer_phone: string;
  type: OrderType;
  status: OrderStatus;
  address_label: string | null;
  items: OrderItem[];
  subtotal: number;
  delivery_charge: number;
  discount: number;
  total: number;
  payment_mode: PaymentMode;
  payment_status: PaymentStatus;
  customer_notes?: string;
  created_at: string;
  partner_id?: string | null;
}

export const stores: Store[] = [
  { id: "store-1", name: "Sri Venkateswara Kirana Store", slug: "sri-venkateswara", active: true },
];

export const categories: Category[] = [
  { id: "cat-grains", name_en: "Grains & Pulses", name_te: "ధాన్యాలు", parent_id: null },
  { id: "cat-oils", name_en: "Oils & Ghee", name_te: "నూనెలు", parent_id: null },
  { id: "cat-snacks", name_en: "Snacks & Biscuits", name_te: "స్నాక్స్", parent_id: null },
  { id: "cat-daily", name_en: "Daily Essentials", name_te: "నిత్యావసరాలు", parent_id: null },
];

export const products: Product[] = [
  {
    id: "prod-1",
    category_id: "cat-grains",
    name_en: "Toor Dal",
    name_te_transliteration: "Kandi Pappu",
    name_te_script: "కందిపప్పు",
    type: "LOOSE",
    unit: "KG",
    min_qty: 0.5,
    step_size: 0.5,
    max_qty: 10,
    base_price: 14000,
    status: "IN_STOCK",
    variants: [
      { id: "v-1a", label: "500g", price: 7000, stock_status: "IN_STOCK" },
      { id: "v-1b", label: "1kg", price: 14000, stock_status: "IN_STOCK" },
    ],
  },
  {
    id: "prod-2",
    category_id: "cat-grains",
    name_en: "Sona Masoori Rice",
    name_te_transliteration: "Sona Masoori Biyyam",
    name_te_script: "సోనా మసూరి బియ్యం",
    type: "LOOSE",
    unit: "KG",
    min_qty: 1,
    step_size: 1,
    max_qty: 25,
    base_price: 6000,
    status: "IN_STOCK",
    variants: [],
  },
  {
    id: "prod-3",
    category_id: "cat-oils",
    name_en: "Sunflower Oil",
    name_te_transliteration: "Pొద్దుతిరుగుడు Nune",
    name_te_script: "పొద్దుతిరుగుడు నూనె",
    type: "PACKAGED",
    unit: "Packet",
    min_qty: 1,
    step_size: 1,
    max_qty: null,
    base_price: 18500,
    status: "IN_STOCK",
    variants: [
      { id: "v-3a", label: "1L", price: 18500, stock_status: "IN_STOCK" },
      { id: "v-3b", label: "5L", price: 87500, stock_status: "IN_STOCK" },
    ],
  },
  {
    id: "prod-4",
    category_id: "cat-snacks",
    name_en: "Parle-G Biscuit",
    name_te_transliteration: "Parle-G Biscuit",
    name_te_script: "పార్లే-జి బిస్కెట్",
    type: "PACKAGED",
    unit: "Packet",
    min_qty: 1,
    step_size: 1,
    max_qty: null,
    base_price: 1000,
    status: "IN_STOCK",
    variants: [],
  },
  {
    id: "prod-5",
    category_id: "cat-daily",
    name_en: "Iodised Salt",
    name_te_transliteration: "Uppu",
    name_te_script: "ఉప్పు",
    type: "PACKAGED",
    unit: "Packet",
    min_qty: 1,
    step_size: 1,
    max_qty: null,
    base_price: 2200,
    status: "IN_STOCK",
    variants: [],
  },
  {
    id: "prod-6",
    category_id: "cat-daily",
    name_en: "Turmeric Powder",
    name_te_transliteration: "Pasupu",
    name_te_script: "పసుపు",
    type: "LOOSE",
    unit: "Gram",
    min_qty: 50,
    step_size: 50,
    max_qty: 1000,
    base_price: 4000,
    status: "OUT_OF_STOCK",
    variants: [],
  },
];

export const deliveryPartners: DeliveryPartner[] = [
  { id: "dp-1", name: "Ramesh Kumar", phone: "9876543210" },
  { id: "dp-2", name: "Suresh Babu", phone: "9876543211" },
];

export const orders: Order[] = [
  {
    id: "ord-1001",
    store_id: "store-1",
    customer_name: "Lakshmi Devi",
    customer_phone: "9000011111",
    type: "DELIVERY",
    status: "PLACED",
    address_label: "Near Hanuman Temple, Kukatpally",
    items: [
      { product_id: "prod-1", variant_id: "v-1b", name_en: "Toor Dal (1kg)", quantity: 1, unit_price: 14000 },
      { product_id: "prod-4", variant_id: null, name_en: "Parle-G Biscuit", quantity: 3, unit_price: 1000 },
    ],
    subtotal: 17000,
    delivery_charge: 2000,
    discount: 0,
    total: 19000,
    payment_mode: "CASH",
    payment_status: "PENDING",
    created_at: "2026-07-17T10:00:00.000Z",
    partner_id: "dp-1",
  },
  {
    id: "ord-1002",
    store_id: "store-1",
    customer_name: "Ravi Teja",
    customer_phone: "9000022222",
    type: "PICKUP",
    status: "READY_FOR_PICKUP",
    address_label: null,
    items: [{ product_id: "prod-2", variant_id: null, name_en: "Sona Masoori Rice", quantity: 5, unit_price: 6000 }],
    subtotal: 30000,
    delivery_charge: 0,
    discount: 1000,
    total: 29000,
    payment_mode: "UPI",
    payment_status: "PAID",
    created_at: "2026-07-17T12:30:00.000Z",
  },
  {
    id: "ord-1003",
    store_id: "store-1",
    customer_name: "Anitha Reddy",
    customer_phone: "9000033333",
    type: "DELIVERY",
    status: "IN_TRANSIT",
    address_label: "Opposite water tank, Miyapur",
    items: [{ product_id: "prod-3", variant_id: "v-3a", name_en: "Sunflower Oil (1L)", quantity: 2, unit_price: 18500 }],
    subtotal: 37000,
    delivery_charge: 2000,
    discount: 0,
    total: 39000,
    payment_mode: "CASH",
    payment_status: "PENDING",
    created_at: "2026-07-18T09:15:00.000Z",
    partner_id: "dp-1",
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}
