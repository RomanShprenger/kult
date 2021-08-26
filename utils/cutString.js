export function cutString (str, len) {
  if (str.length <= len) {
    return str;
  }
  return String(str).slice(0,len) + '...';
}
