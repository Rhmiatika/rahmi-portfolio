// src/utils/whatsapp.js
// PRD §2.5: buka wa.me dengan pesan terenkode
// Template: "Halo Rahmi, saya {nama} dari {instansi}. {pesan}"

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "6281386426793";

/**
 * buildWhatsappUrl({ nama, instansi, pesan })
 * → "https://wa.me/6281386426793?text=Halo%20Rahmi%2C%20..."
 */
export function buildWhatsappUrl({ nama = "", instansi = "", pesan = "" }) {
  const from = instansi ? ` dari ${instansi}` : "";
  const text = `Halo Rahmi, saya ${nama}${from}. ${pesan}`.trim();
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Buka langsung di tab baru */
export function openWhatsapp(fields) {
  window.open(buildWhatsappUrl(fields), "_blank", "noopener,noreferrer");
}
