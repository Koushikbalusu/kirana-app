"use server";

import { eq, and, inArray, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import {
  orders as ordersTable,
  orderItems as orderItemsTable,
  addresses as addressesTable,
  customers as customersTable,
  deliveries as deliveriesTable,
  products as productsTable,
  variants as variantsTable,
  users as usersTable,
} from "@/lib/db/schema";
import { DEFAULT_STORE_ID, DELIVERY_CHARGE } from "@/lib/constants";
import { requireStaffSession } from "@/lib/auth/authorize";
import { getSession } from "@/lib/auth/session";
import { orderPlacementLimiter, checkLimit } from "@/lib/redis/ratelimit";
import { isValidLooseQuantity, isValidPackCount } from "@/lib/utils/quantity";
import type {
  Order,
  OrderItem,
  OrderStatus,
  OrderType,
  PaymentMode,
} from "@/lib/data/mock";

export interface PlaceOrderItemInput {
  productId: string;
  variantId: string | null;
  quantity: number;
  notes?: string;
}

export interface PlaceOrderAddressInput {
  label: string;
  houseNumber: string;
  area: string;
  landmark: string;
  notes: string;
  lat: number;
  lng: number;
}

export interface PlaceOrderInput {
  customerId: string;
  type: OrderType;
  address?: PlaceOrderAddressInput;
  items: PlaceOrderItemInput[];
  paymentMode: PaymentMode;
  customerNotes?: string;
}

export interface PlaceOrderResult {
  order?: Order;
  error?: string;
}

/** Builds the shared select used by every order-reading query below. */
async function fetchOrdersByFilter(whereClause: ReturnType<typeof eq> | ReturnType<typeof and>) {
  if (!db) return [];

  const orderRows = await db
    .select({
      order: ordersTable,
      customerName: customersTable.name,
      customerPhone: customersTable.phone,
      addressLabel: addressesTable.label,
      addressHouseNumber: addressesTable.houseNumber,
      addressArea: addressesTable.area,
      addressLandmark: addressesTable.landmark,
      lat: addressesTable.lat,
      lng: addressesTable.lng,
    })
    .from(ordersTable)
    .leftJoin(customersTable, eq(ordersTable.customerId, customersTable.id))
    .leftJoin(addressesTable, eq(ordersTable.addressId, addressesTable.id))
    .where(whereClause)
    .orderBy(desc(ordersTable.createdAt));

  if (orderRows.length === 0) return [];

  const orderIds = orderRows.map((r) => r.order.id);

  const itemRows = await db
    .select({
      orderId: orderItemsTable.orderId,
      productId: orderItemsTable.productId,
      variantId: orderItemsTable.variantId,
      quantity: orderItemsTable.quantity,
      unitPrice: orderItemsTable.unitPrice,
      itemNotes: orderItemsTable.itemNotes,
      productName: productsTable.nameEn,
      productUnit: productsTable.unit,
      variantLabel: variantsTable.label,
    })
    .from(orderItemsTable)
    .leftJoin(productsTable, eq(orderItemsTable.productId, productsTable.id))
    .leftJoin(variantsTable, eq(orderItemsTable.variantId, variantsTable.id))
    .where(inArray(orderItemsTable.orderId, orderIds));

  const deliveryRows = await db
    .select({
      orderId: deliveriesTable.orderId,
      partnerId: deliveriesTable.partnerId,
    })
    .from(deliveriesTable)
    .where(inArray(deliveriesTable.orderId, orderIds));

  const deliveryByOrder = new Map(deliveryRows.map((d) => [d.orderId, d.partnerId]));

  return orderRows.map((row): Order => {
    const items: OrderItem[] = itemRows
      .filter((i) => i.orderId === row.order.id)
      .map((i) => ({
        product_id: i.productId,
        variant_id: i.variantId,
        name_en: i.variantLabel ? `${i.productName} (${i.variantLabel})` : i.productName ?? "Unknown product",
        quantity: i.quantity,
        unit: i.variantLabel ? "pack" : i.productUnit ?? "",
        unit_price: i.unitPrice,
        item_notes: i.itemNotes ?? undefined,
      }));

    const addressLabel = row.addressLabel
      ? [row.addressHouseNumber, row.addressArea, row.addressLabel, row.addressLandmark]
          .filter(Boolean)
          .join(", ")
      : null;

    return {
      id: row.order.id,
      store_id: row.order.storeId,
      customer_name: row.customerName ?? "Guest Customer",
      customer_phone: row.customerPhone ?? "",
      type: row.order.type as OrderType,
      status: row.order.status as OrderStatus,
      address_label: addressLabel,
      lat: row.lat ?? undefined,
      lng: row.lng ?? undefined,
      items,
      subtotal: row.order.subtotal,
      delivery_charge: row.order.deliveryCharge,
      discount: row.order.discount,
      total: row.order.total,
      payment_mode: row.order.paymentMode as PaymentMode,
      payment_status: row.order.paymentStatus as "PENDING" | "PAID",
      customer_notes: row.order.customerNotes ?? undefined,
      created_at: row.order.createdAt.toISOString(),
      partner_id: deliveryByOrder.get(row.order.id) ?? null,
    };
  });
}

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  if (!db) return { error: "Database isn't configured yet." };
  if (input.items.length === 0) return { error: "Cart is empty." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed } = await checkLimit(orderPlacementLimiter, `order:${ip}`);
  if (!allowed) return { error: "Too many orders placed. Please wait a minute and try again." };

  // Recompute every price server-side from the live product/variant rows --
  // never trust whatever price the client sent.
  const productIds = [...new Set(input.items.map((i) => i.productId))];
  const productRows = await db.select().from(productsTable).where(inArray(productsTable.id, productIds));
  const productById = new Map(productRows.map((p) => [p.id, p]));

  const variantIds = input.items.map((i) => i.variantId).filter((v): v is string => Boolean(v));
  const variantRows =
    variantIds.length > 0
      ? await db.select().from(variantsTable).where(inArray(variantsTable.id, variantIds))
      : [];
  const variantById = new Map(variantRows.map((v) => [v.id, v]));

  let subtotal = 0;
  const resolvedItems: { productId: string; variantId: string | null; quantity: number; unitPrice: number; notes?: string }[] = [];

  for (const item of input.items) {
    const product = productById.get(item.productId);
    if (!product) return { error: "One of the items in your cart no longer exists." };

    const variant = item.variantId ? variantById.get(item.variantId) : undefined;
    if (item.variantId && (!variant || variant.productId !== item.productId)) {
      return { error: `"${product.nameEn}": selected variant no longer exists.` };
    }

    // A variant (or any PACKAGED product bought without one) is always a
    // discrete pack count; only a LOOSE product bought with no variant
    // selected uses its own min/step/max continuous-quantity rule.
    const isLooseUnitPurchase = product.type === "LOOSE" && !variant;
    const quantityOk = isLooseUnitPurchase
      ? isValidLooseQuantity(item.quantity, { min: product.minQty, step: product.stepSize, max: product.maxQty })
      : isValidPackCount(item.quantity);
    if (!quantityOk) {
      return { error: `"${product.nameEn}": invalid quantity.` };
    }

    const unitPrice = variant ? variant.price : product.basePrice;
    subtotal += unitPrice * item.quantity;
    resolvedItems.push({ productId: item.productId, variantId: item.variantId, quantity: item.quantity, unitPrice, notes: item.notes });
  }

  const deliveryCharge = input.type === "DELIVERY" ? DELIVERY_CHARGE : 0;
  const total = subtotal + deliveryCharge;

  let addressId: string | null = null;
  if (input.type === "DELIVERY") {
    if (!input.address) return { error: "Delivery address is required." };
    const inserted = await db
      .insert(addressesTable)
      .values({
        customerId: input.customerId,
        label: input.address.label,
        houseNumber: input.address.houseNumber,
        area: input.address.area,
        landmark: input.address.landmark,
        notes: input.address.notes,
        lat: input.address.lat,
        lng: input.address.lng,
      })
      .returning();
    addressId = inserted[0].id;
  }

  const orderInserted = await db
    .insert(ordersTable)
    .values({
      storeId: DEFAULT_STORE_ID,
      customerId: input.customerId,
      type: input.type,
      status: "PLACED",
      addressId,
      subtotal,
      deliveryCharge,
      discount: 0,
      total,
      paymentMode: input.paymentMode,
      paymentStatus: "PENDING",
      customerNotes: input.customerNotes,
    })
    .returning();

  const order = orderInserted[0];

  await db.insert(orderItemsTable).values(
    resolvedItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      itemNotes: item.notes,
    }))
  );

  const [full] = await fetchOrdersByFilter(eq(ordersTable.id, order.id));
  return { order: full };
}

export async function getOrder(orderId: string): Promise<Order | null> {
  const [order] = await fetchOrdersByFilter(eq(ordersTable.id, orderId));
  return order ?? null;
}

export async function listOrdersForCustomer(customerId: string): Promise<Order[]> {
  return fetchOrdersByFilter(eq(ordersTable.customerId, customerId));
}

export async function listOrders(): Promise<Order[]> {
  return fetchOrdersByFilter(eq(ordersTable.storeId, DEFAULT_STORE_ID));
}

export async function listOrdersForPartner(partnerId: string): Promise<Order[]> {
  if (!db) return [];
  const rows = await db
    .select({ orderId: deliveriesTable.orderId })
    .from(deliveriesTable)
    .where(eq(deliveriesTable.partnerId, partnerId));
  const orderIds = rows.map((r) => r.orderId);
  if (orderIds.length === 0) return [];
  return fetchOrdersByFilter(inArray(ordersTable.id, orderIds));
}

export async function assignPartner(orderId: string, partnerId: string): Promise<{ error?: string }> {
  await requireStaffSession();
  if (!db) return { error: "Database isn't configured yet." };

  const existing = await db.select().from(deliveriesTable).where(eq(deliveriesTable.orderId, orderId)).limit(1);
  if (existing.length > 0) {
    await db.update(deliveriesTable).set({ partnerId }).where(eq(deliveriesTable.orderId, orderId));
  } else {
    await db.insert(deliveriesTable).values({ orderId, partnerId, status: "ASSIGNED" });
  }
  return {};
}

async function assertCanManageOrder(orderId: string) {
  const session = await getSession();
  if (!session) throw new Error("Not signed in.");
  if (session.role === "ADMIN" || session.role === "STAFF" || session.role === "SUPERADMIN") return;
  if (session.role === "DELIVERY_PARTNER" && db) {
    const rows = await db
      .select()
      .from(deliveriesTable)
      .where(and(eq(deliveriesTable.orderId, orderId), eq(deliveriesTable.partnerId, session.userId)))
      .limit(1);
    if (rows.length > 0) return;
  }
  throw new Error("Not authorized to manage this order.");
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<{ error?: string }> {
  try {
    await assertCanManageOrder(orderId);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Not authorized." };
  }
  if (!db) return { error: "Database isn't configured yet." };

  await db.update(ordersTable).set({ status }).where(eq(ordersTable.id, orderId));
  if (status === "DELIVERED") {
    await db.update(deliveriesTable).set({ status: "DELIVERED", deliveredAt: new Date() }).where(eq(deliveriesTable.orderId, orderId));
  }
  return {};
}

export async function markPaid(orderId: string): Promise<{ error?: string }> {
  try {
    await assertCanManageOrder(orderId);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Not authorized." };
  }
  if (!db) return { error: "Database isn't configured yet." };

  await db.update(ordersTable).set({ paymentStatus: "PAID" }).where(eq(ordersTable.id, orderId));
  return {};
}

export interface CustomerSummary {
  id: string;
  name: string;
  phone: string;
  orderCount: number;
  lifetimeValue: number;
}

export async function listCustomersWithStats(): Promise<CustomerSummary[]> {
  if (!db) return [];
  const rows = await db
    .select({
      id: customersTable.id,
      name: customersTable.name,
      phone: customersTable.phone,
      total: ordersTable.total,
    })
    .from(customersTable)
    .leftJoin(ordersTable, eq(ordersTable.customerId, customersTable.id));

  const byCustomer = new Map<string, CustomerSummary>();
  for (const row of rows) {
    const existing = byCustomer.get(row.id);
    if (existing) {
      if (row.total != null) {
        existing.orderCount += 1;
        existing.lifetimeValue += row.total;
      }
    } else {
      byCustomer.set(row.id, {
        id: row.id,
        name: row.name ?? "Guest",
        phone: row.phone,
        orderCount: row.total != null ? 1 : 0,
        lifetimeValue: row.total ?? 0,
      });
    }
  }
  return [...byCustomer.values()];
}

// Re-export so callers only need one import for partner display names.
export async function getPartnerNames(partnerIds: string[]): Promise<Map<string, string>> {
  if (!db || partnerIds.length === 0) return new Map();
  const rows = await db.select().from(usersTable).where(inArray(usersTable.id, partnerIds));
  return new Map(rows.map((r) => [r.id, r.name]));
}
