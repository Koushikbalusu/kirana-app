/**
 * Single-tenant MVP: one fixed store id used everywhere a storeId FK is
 * needed. The `stores` table schema supports multi-tenancy later, but
 * there's no store-management CRUD yet, so this stays a constant.
 */
export const DEFAULT_STORE_ID = "b3daf19b-f618-4942-8b68-b861e806cf50";
