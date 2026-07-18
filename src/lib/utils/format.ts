export function formatPrice(paise: number): string {
  return `₹${(paise / 100).toFixed(2)}`;
}

export function formatQty(qty: number, unit: string): string {
  return `${qty} ${unit}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
