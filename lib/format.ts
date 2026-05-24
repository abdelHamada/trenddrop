export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function getEstimatedDelivery(maxShippingDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + maxShippingDays + 3);
  return date.toISOString();
}
