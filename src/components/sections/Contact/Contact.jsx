// src/components/sections/Contact/Contact.jsx
// Phase 3.5 — Blok penutup maroon + Footer
// SpecularButton membuka ContactModal; microcopy salin email via clipboard + toast

import { useRef } from "react";
import { useUI } from "@/context/UIContext";
import { useToast } from "@/context/ToastContext";
import { profile } from "@/data/profile";
import SpecularButton from "@/components/reactbits/SpecularButton";
import Reveal from "@/components/ui/Reveal";

const LINKEDIN = profile.contact.linkedin || "";
// Hanya tampilkan LinkedIn jika bukan placeholder
const linkedinReal =
  LINKEDIN &&
  LINKEDIN !== "#" &&
  LINKEDIN !== "" &&
  !LINKEDIN.includes("placeholder");

export default function Contact() {
  const { setContactOpen } = useUI();
  const { show: showToast } = useToast();
  const emailRef = useRef(null);

  const handleCopyEmail = async () => {
    const email = profile.contact.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast({ type: "success", message: "Email disalin ✓" });
    } catch {
      // Fallback: select text
      if (emailRef.current) {
        const range = document.createRange();
        range.selectNode(emailRef.current);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
      showToast({ type: "info", message: "Pilih teks email, lalu salin secara manual." });
    }
  };

  return (
    <section
      id="contact"
      aria-label="Kontak — Hubungi Rahmi Atika"
      className="bg-maroon-700 text-cream-100"
    >
      {/* ── Blok utama ──────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20 text-center">
        <Reveal>
          {/* Eyebrow */}
          <p className="text-xs sm:text-sm uppercase tracking-[0.22em] font-bold text-gold-300 mb-4">
            Let&apos;s work together
          </p>

          {/* Judul */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-100 leading-tight mb-6">
            Mari bangun alur kerja yang lebih rapi, bersama.
          </h2>

          {/* Deskripsi */}
          <p className="text-cream-100/80 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg mb-10">
            Sedang mencari tim administrasi, pengarsipan digital, atau data
            management yang teliti, komunikatif, dan cepat belajar? Aku siap
            berkontribusi — dari merapikan dokumen hingga membangun sistem
            kecil yang membuat tim bekerja lebih efisien.
          </p>

          {/* CTA */}
          <SpecularButton
            id="contact-cta-btn"
            onClick={() => setContactOpen(true)}
            aria-label="Buka form kontak"
          >
            Mulai Percakapan
          </SpecularButton>

          {/* Microcopy — salin email */}
          <p className="mt-6 text-cream-100/55 text-sm">
            Atau kirim email langsung ke{" "}
            <button
              onClick={handleCopyEmail}
              className="underline decoration-dotted underline-offset-2 hover:text-cream-100 hover:decoration-solid transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 rounded-sm"
              aria-label={`Salin email ${profile.contact.email}`}
            >
              <span ref={emailRef}>{profile.contact.email}</span>
            </button>
          </p>
        </Reveal>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="border-t border-cream-100/10"
        aria-label="Footer"
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Kiri: copyright */}
          <p className="text-cream-100/45 text-sm order-2 sm:order-1">
            © 2026 Rahmi Atika
          </p>

          {/* Kanan: tautan */}
          <nav
            aria-label="Tautan sosial dan kontak"
            className="flex items-center gap-5 order-1 sm:order-2"
          >
            {/* Email — klik = salin */}
            <button
              onClick={handleCopyEmail}
              className="text-cream-100/55 hover:text-cream-100 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 rounded-sm"
              aria-label="Salin alamat email"
            >
              Email
            </button>

            {/* WhatsApp — link wa.me, nomor tidak ditampilkan sebagai teks */}
            <a
              href={profile.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-100/55 hover:text-cream-100 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 rounded-sm"
              aria-label="Hubungi via WhatsApp"
            >
              WhatsApp
            </a>

            {/* LinkedIn — hanya tampil jika URL valid */}
            {linkedinReal && (
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-100/55 hover:text-cream-100 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 rounded-sm"
                aria-label="Profil LinkedIn Rahmi Atika"
              >
                LinkedIn
              </a>
            )}
          </nav>
        </div>
      </footer>
    </section>
  );
}
