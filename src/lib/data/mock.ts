/**
 * Shared type definitions, mirroring src/lib/db/schema/* field-for-field
 * (snake_case to match the original spec's naming). Products, categories,
 * orders, and delivery partners are read from the live database (see
 * src/actions/*.ts) -- this file no longer holds any seed/demo data.
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
  name_te_transliteration: string;
  name_te_script: string;
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
  image_url?: string | null;
  thumbnail_url?: string | null;
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
  unit: string;
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
  lat?: number;
  lng?: number;
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
