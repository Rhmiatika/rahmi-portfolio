// src/utils/formatDate.js
// Format tanggal dari ISO string ke bahasa Indonesia

const MONTHS_ID = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
];

/**
 * formatDate("2024-04-24") → "24 April 2024"
 * formatDate("2022-2023")  → "2022–2023"
 * formatDate(null)         → "—"
 */
export function formatDate(dateStr) {
  if (!dateStr) return "—";

  // Range tahun, mis. "2022-2023" (tidak ada hari/bulan)
  if (/^\d{4}-\d{4}$/.test(dateStr)) {
    return dateStr.replace("-", "–");
  }

  // Hanya tahun, mis. "2023"
  if (/^\d{4}$/.test(dateStr)) {
    return dateStr;
  }

  // ISO date, mis. "2024-04-24"
  const [year, month, day] = dateStr.split("-").map(Number);
  if (month && day) return `${day} ${MONTHS_ID[month - 1]} ${year}`;
  if (month)        return `${MONTHS_ID[month - 1]} ${year}`;
  return String(year);
}
