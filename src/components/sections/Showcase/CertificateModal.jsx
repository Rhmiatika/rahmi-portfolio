// src/components/sections/Showcase/CertificateModal.jsx
// Portal modal sertifikat: gambar besar, judul, penerbit, navigasi ‹ ›
// ARIA: dialog role, scroll lock, Esc, backdrop click, focus trap

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import certificates from "@/data/certificates.json";

// Sorted newest first (same order as CertificatesGrid)
const SORTED = [...certificates].sort((a, b) => {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return b.date.localeCompare(a.date);
});

export default function CertificateModal({ certId, onClose, onNavigate }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  const currentIndex = SORTED.findIndex((c) => c.id === certId);
  const cert = SORTED[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < SORTED.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(SORTED[currentIndex - 1].id);
  }, [currentIndex, hasPrev, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(SORTED[currentIndex + 1].id);
  }, [currentIndex, hasNext, onNavigate]);

  // Key handling: Esc to close, ← → to navigate
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, handlePrev, handleNext]);

  // Scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Focus trap: auto-focus close button when opened
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, [certId]);

  if (!cert) return null;

  const formatDate = (d) => {
    if (!d) return "—";
    if (d.length === 4) return d; // year-only
    try {
      return new Date(d).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      });
    } catch {
      return d;
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
      style={{ background: "rgba(74,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col max-h-[90dvh]"
        style={{
          background: "var(--color-cream-50)",
          boxShadow: "0 32px 80px -16px rgba(74,0,0,0.45)",
          animation: "modalIn 0.25s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Tutup modal"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-maroon-700"
          style={{
            background: "rgba(128,0,0,0.1)",
            color: "var(--color-maroon-700)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(128,0,0,0.18)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(128,0,0,0.1)")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        {/* Certificate image */}
        <div
          className="w-full bg-charcoal-800 flex items-center justify-center"
          style={{ maxHeight: "55vh", overflow: "hidden" }}
        >
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-contain"
            style={{ maxHeight: "55vh" }}
          />
        </div>

        {/* Info section */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* Category chip */}
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-3"
            style={{
              background: "rgba(128,0,0,0.08)",
              color: "var(--color-maroon-700)",
            }}
          >
            {cert.category}
          </span>

          <h2
            className="font-display font-bold text-lg leading-snug mb-1"
            style={{ color: "var(--color-charcoal-800)" }}
          >
            {cert.title}
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--color-charcoal-500)" }}>
            {cert.issuer}
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div>
              <dt className="font-semibold" style={{ color: "var(--color-charcoal-500)" }}>Peran</dt>
              <dd style={{ color: "var(--color-charcoal-800)" }}>{cert.role || "—"}</dd>
            </div>
            <div>
              <dt className="font-semibold" style={{ color: "var(--color-charcoal-500)" }}>Tanggal</dt>
              <dd style={{ color: "var(--color-charcoal-800)" }}>{formatDate(cert.date)}</dd>
            </div>
            {cert.credentialId && (
              <div className="col-span-2">
                <dt className="font-semibold" style={{ color: "var(--color-charcoal-500)" }}>Credential ID</dt>
                <dd className="font-mono text-xs break-all" style={{ color: "var(--color-charcoal-800)" }}>
                  {cert.credentialId}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Navigation footer */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderTop: "1px solid rgba(212,175,55,0.25)" }}
        >
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            aria-label="Sertifikat sebelumnya"
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-maroon-700"
            style={{ color: hasPrev ? "var(--color-maroon-700)" : "var(--color-charcoal-500)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Sebelumnya
          </button>

          <span className="text-xs" style={{ color: "var(--color-charcoal-500)" }}>
            {currentIndex + 1} / {SORTED.length}
          </span>

          <button
            onClick={handleNext}
            disabled={!hasNext}
            aria-label="Sertifikat berikutnya"
            className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-maroon-700"
            style={{ color: hasNext ? "var(--color-maroon-700)" : "var(--color-charcoal-500)" }}
          >
            Berikutnya
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
}
