// src/components/ui/Modal.jsx
// Modal aksesibel: portal, scroll lock, focus trap, Esc, aria-modal
// Gunakan sebagai wrapper untuk CertificateModal dan ContactModal

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "@/hooks/useScrollLock";

/**
 * @param {boolean} open - apakah modal terbuka
 * @param {function} onClose - callback tutup modal
 * @param {string} labelId - id untuk aria-labelledby
 * @param {string} className - kelas tambahan untuk panel
 * @param {React.ReactNode} children
 */
export default function Modal({ open, onClose, labelId, className = "", children }) {
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // Scroll lock saat terbuka
  useScrollLock(open);

  // Simpan elemen pemicu, kembalikan fokus saat tutup
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      // Fokuskan tombol pertama di dalam modal
      requestAnimationFrame(() => {
        const focusable = panelRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable?.length) focusable[0].focus();
      });
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  // Tutup dengan Esc
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const handler = (e) => {
      if (e.key !== "Tab") return;
      const focusable = [...panel.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )].filter((el) => !el.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby={labelId}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        ref={panelRef}
        className={[
          "relative z-10 bg-cream rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto",
          "w-full max-w-lg mx-4",
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
