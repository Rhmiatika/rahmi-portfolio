// src/components/sections/Contact/ContactModal.jsx
// Phase 3.5 — Form kontak: Nama, Email, Instansi (opsional), Pesan
// v1: WhatsApp-only. Tombol email hanya tampil jika VITE_FORMSPREE_ID terisi.
// Honeypot tersembunyi. Focus trap + scroll lock dari Modal dasar.

import { useState, useId } from "react";
import Modal from "@/components/ui/Modal";
import { useUI } from "@/context/UIContext";
import { useToast } from "@/context/ToastContext";
import { openWhatsapp } from "@/utils/whatsapp";

// Validasi sederhana
function validate({ nama, email, pesan }) {
  const errs = {};
  if (!nama.trim() || nama.trim().length < 2)
    errs.nama = "Nama minimal 2 karakter.";
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errs.email = "Format email tidak valid.";
  if (!pesan.trim() || pesan.trim().length < 10)
    errs.pesan = "Pesan minimal 10 karakter.";
  return errs;
}

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "";

export default function ContactModal() {
  const { contactOpen, setContactOpen } = useUI();
  const { show: showToast } = useToast();
  const titleId = useId();

  const EMPTY = { nama: "", email: "", instansi: "", pesan: "", _honey: "" };
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const onClose = () => {
    setContactOpen(false);
    setErrors({});
  };

  const set = (k) => (e) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  // ── WhatsApp ──────────────────────────────────────────────────────────────
  const handleWhatsApp = () => {
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (fields._honey) return; // honeypot trap

    setSubmitting(true);
    // template: "Halo Rahmi, aku {nama} dari {instansi}. {pesan}"
    openWhatsapp({
      nama: fields.nama.trim(),
      instansi: fields.instansi.trim(),
      pesan: fields.pesan.trim(),
      // Timpa template di utils agar pakai "aku"
    });
    showToast({ type: "success", message: "Membuka WhatsApp…" });
    setFields(EMPTY);
    setErrors({});
    setSubmitting(false);
    setContactOpen(false);
  };

  // ── Formspree (hanya jika ID terisi) ─────────────────────────────────────
  const handleEmail = async () => {
    if (!FORMSPREE_ID) return;
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (fields._honey) return;

    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nama: fields.nama.trim(),
          email: fields.email.trim(),
          instansi: fields.instansi.trim() || "(tidak diisi)",
          pesan: fields.pesan.trim(),
        }),
      });
      if (res.ok) {
        showToast({ type: "success", message: "Pesan terkirim! Aku akan membalas secepatnya." });
        setFields(EMPTY);
        setErrors({});
        setContactOpen(false);
      } else {
        showToast({ type: "error", message: "Gagal mengirim. Coba lewat WhatsApp." });
      }
    } catch {
      showToast({ type: "error", message: "Koneksi gagal. Coba lewat WhatsApp." });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-2.5 rounded-lg border bg-white text-charcoal-800 placeholder:text-charcoal-400 " +
    "text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600/50 focus:border-maroon-600 " +
    "transition-colors duration-150 disabled:opacity-60";
  const labelBase = "block text-xs font-semibold text-charcoal-600 mb-1 uppercase tracking-wide";
  const errBase = "mt-1 text-xs text-red-600 font-medium";

  return (
    <Modal open={contactOpen} onClose={onClose} labelId={titleId} className="bg-cream-50">
      <div className="px-6 pt-6 pb-7 sm:px-7 sm:pt-7">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 id={titleId} className="font-display text-xl font-bold text-maroon-700">
              Kirim pesan
            </h2>
            <p className="text-sm text-charcoal-500 mt-0.5">
              Ceritakan kebutuhanmu, aku akan membalas secepatnya.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className={[
              "shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center",
              "bg-charcoal-100 text-charcoal-600 text-base font-bold",
              "hover:bg-red-600 hover:text-white",
              "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600",
            ].join(" ")}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Honeypot — tersembunyi dari pengguna */}
          <input
            type="text"
            name="_honey"
            value={fields._honey}
            onChange={set("_honey")}
            className="hidden"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
          />

          {/* Nama */}
          <div>
            <label htmlFor="cm-nama" className={labelBase}>
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              id="cm-nama"
              type="text"
              autoComplete="name"
              placeholder="Nama kamu"
              value={fields.nama}
              onChange={set("nama")}
              disabled={submitting}
              className={`${inputBase} ${errors.nama ? "border-red-400" : "border-charcoal-200"}`}
            />
            {errors.nama && <p className={errBase}>{errors.nama}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="cm-email" className={labelBase}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="cm-email"
              type="email"
              autoComplete="email"
              placeholder="email@kamu.com"
              value={fields.email}
              onChange={set("email")}
              disabled={submitting}
              className={`${inputBase} ${errors.email ? "border-red-400" : "border-charcoal-200"}`}
            />
            {errors.email && <p className={errBase}>{errors.email}</p>}
          </div>

          {/* Instansi — opsional */}
          <div>
            <label htmlFor="cm-instansi" className={labelBase}>
              Instansi / Perusahaan{" "}
              <span className="text-charcoal-400 font-normal normal-case tracking-normal">
                (opsional)
              </span>
            </label>
            <input
              id="cm-instansi"
              type="text"
              autoComplete="organization"
              placeholder="Nama instansi atau perusahaan"
              value={fields.instansi}
              onChange={set("instansi")}
              disabled={submitting}
              className={`${inputBase} border-charcoal-200`}
            />
          </div>

          {/* Pesan */}
          <div>
            <label htmlFor="cm-pesan" className={labelBase}>
              Pesan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="cm-pesan"
              rows={4}
              placeholder="Ceritakan apa yang kamu butuhkan…"
              value={fields.pesan}
              onChange={set("pesan")}
              disabled={submitting}
              className={`${inputBase} resize-none ${errors.pesan ? "border-red-400" : "border-charcoal-200"}`}
            />
            {errors.pesan && <p className={errBase}>{errors.pesan}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {/* WhatsApp — selalu tampil */}
          <button
            id="cm-btn-wa"
            onClick={handleWhatsApp}
            disabled={submitting}
            className={[
              "flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[48px] rounded-lg",
              "bg-maroon-700 text-cream-100 font-semibold text-sm",
              "hover:bg-maroon-600 active:scale-[0.97]",
              "transition-all duration-200 shadow-[0_4px_14px_-4px_rgba(74,0,0,0.5)]",
              "hover:shadow-[0_6px_20px_-4px_rgba(74,0,0,0.65)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600 focus-visible:ring-offset-2",
              "disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
            ].join(" ")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {submitting ? "Membuka…" : "Lanjut ke WhatsApp"}
          </button>

          {/* Email via Formspree — HANYA tampil jika VITE_FORMSPREE_ID terisi */}
          {FORMSPREE_ID && (
            <button
              id="cm-btn-email"
              onClick={handleEmail}
              disabled={submitting}
              className={[
                "flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-lg",
                "border-2 border-maroon-700 text-maroon-700 bg-transparent font-semibold text-sm",
                "hover:bg-maroon-700 hover:text-cream-100 active:scale-[0.97]",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-600 focus-visible:ring-offset-2",
                "disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
              ].join(" ")}
            >
              {submitting ? "Mengirim…" : "Kirim via Email"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
