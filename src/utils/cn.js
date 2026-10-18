// src/utils/cn.js
// Gabungkan class names (mirip clsx) — tanpa dependensi tambahan
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
