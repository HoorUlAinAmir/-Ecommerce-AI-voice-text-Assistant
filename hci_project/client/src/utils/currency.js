export function currency(value) {
  return `PKR ${Number(value || 0).toLocaleString("en-PK")}`;
}

export function shortCurrency(value) {
  const n = Number(value || 0);
  if (n >= 1000) return `PKR ${(n / 1000).toFixed(1)}k`;
  return `PKR ${n}`;
}
