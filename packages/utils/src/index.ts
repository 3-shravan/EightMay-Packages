export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
