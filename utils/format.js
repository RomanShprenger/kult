export function priceFormat (price) {
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(price)
}

export function fileSizeFormat (fileSize) {
  if (fileSize < 1000) {
    return fileSize + 'b';
  } else if (fileSize < 1000000) {
    return Math.round(fileSize/1000) + 'Kb'
  } else if (fileSize < 1000000000) {
    return Math.round(fileSize/1000000) + 'Mb'
  }
}
