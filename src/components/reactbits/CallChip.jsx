// src/components/reactbits/CallChip.jsx
// FALLBACK — reactbits.dev "Call Chip" tidak bisa di-fetch HTML source (CLI only).
// Fixed bottom-right FAB: buka ContactModal, sembunyi saat #contact terlihat, safe-area iOS.
// Dicatat di NOTES.md sebagai fallback Phase 3.5.

import { useEffect, useState } from "react";
import { useUI } from "@/context/UIContext";

export default function CallChip() {
  const { setContactOpen } = useUI();
  const [visible, setVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  // Tampilkan chip hanya setelah Hero terlewati (scroll > 300px)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sembunyikan saat #contact terlihat
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = visible && !contactInView;

  return (
    <button
      id="call-chip"
      aria-label="Buka form kontak"
      onClick={() => setContactOpen(true)}
      className={[
        "fixed z-[85] flex items-center gap-2.5 px-4 py-2.5 min-h-[48px] rounded-full",
        "bg-maroon-700 text-cream-100 border border-cream-100/20",
        "shadow-[0_4px_24px_-4px_rgba(74,0,0,0.6)]",
        "font-sans font-semibold text-sm",
        "hover:bg-maroon-600 hover:shadow-[0_6px_32px_-4px_rgba(74,0,0,0.75)]",
        "active:scale-[0.96] transition-all duration-300 cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2",
        // Posisi: kanan bawah, atas safe-area iOS
        "right-5 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]",
        // Animasi masuk/keluar
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      {/* Ikon WhatsApp-style */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4 shrink-0"
        aria-hidden="true"
      >
        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
      <span>Hubungi Aku</span>
    </button>
  );
}
