/**
 * Shared quantity rules for LOOSE products (sold by a continuous unit like
 * KG/Liter, governed by product.min_qty/step_size/max_qty) vs discrete
 * counts (a packed variant, or a PACKAGED product with no variant --
 * always an integer count of 1 or more). Used on both the client (product
 * card / cart quantity inputs) and the server (order placement validation)
 * so the two can never drift.
 */

const EPSILON = 1e-6;

export interface LooseQuantityConstraint {
  min: number;
  step: number;
  max: number | null;
}

export function isValidLooseQuantity(qty: number, c: LooseQuantityConstraint): boolean {
  if (!Number.isFinite(qty)) return false;
  if (qty < c.min - EPSILON) return false;
  if (c.max != null && qty > c.max + EPSILON) return false;
  const steps = (qty - c.min) / c.step;
  return Math.abs(steps - Math.round(steps)) < EPSILON;
}

/** Snaps an arbitrary number to the nearest valid min/step/max-respecting quantity. */
export function clampLooseQuantity(qty: number, c: LooseQuantityConstraint): number {
  if (!Number.isFinite(qty)) return c.min;
  let clamped = Math.max(qty, c.min);
  if (c.max != null) clamped = Math.min(clamped, c.max);
  let steps = Math.round((clamped - c.min) / c.step);
  let result = c.min + steps * c.step;
  if (c.max != null && result > c.max + EPSILON) {
    steps = Math.floor((c.max - c.min) / c.step);
    result = c.min + steps * c.step;
  }
  // Round off float noise (e.g. 0.1 + 0.2 style artifacts).
  return Math.round(result * 1e6) / 1e6;
}

export function isValidPackCount(qty: number): boolean {
  return Number.isInteger(qty) && qty >= 1;
}

export function clampPackCount(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.max(1, Math.round(qty));
}
