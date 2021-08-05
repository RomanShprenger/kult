export function priceFormat (price) {
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(price)
}
