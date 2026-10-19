// src/components/sections/Contact/Contact.jsx
// Floating Card Container (mengikuti padding portfolio-container — Gambar 2 referensi)
// Tombol Email langsung direct mailto + salin email; Tombol WhatsApp langsung direct wa.me
// Spasi atas ringkas & Footer diturunkan dengan jarak proporsional

import { useRef } from "react";
import { useToast } from "@/context/ToastContext";
import { profile } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";

const LINKEDIN = profile.contact.linkedin || "";
const linkedinReal =
  LINKEDIN &&
  LINKEDIN !== "#" &&
  LINKEDIN !== "" &&
  !LINKEDIN.includes("placeholder");

export default function Contact() {
  const { show: showToast } = useToast();
  const emailRef = useRef(null);

  const handleCopyEmail = async () => {
    const email = profile.contact.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast({ type: "success", message: "Email disalin ✓" });
    } catch {
      if (emailRef.current) {
        const range = document.createRange();
        range.selectNode(emailRef.current);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
      showToast({ type: "info", message: "Pilih teks email, lalu salin secara manual." });
    }
  };

  const handleEmailButtonClick = async () => {
    const email = profile.contact.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast({ type: "success", message: "Email disalin ✓ Membuka aplikasi email…" });
    } catch {
      // Fallback tanpa error
    }
  };

  return (
    <section
      id="contact"
      aria-label="Kontak — Hubungi Rahmi Atika"
      className="relative pt-0 pb-10 sm:pb-15"
    >
      <div className="portfolio-container relative z-10">
        {/* ── Floating Maroon Card Banner (Mengikuti padding halaman) ── */}
        <div
          className="relative overflow-hidden rounded-3xl sm:rounded-[2.25rem] text-cream-100 shadow-[0_24px_64px_-16px_rgba(74,8,18,0.32)] border border-[#8C2333]/40"
          style={{
            background: "linear-gradient(135deg, #63121E 0%, #460913 50%, #2E0308 100%)",
          }}
        >
          {/* Ambient Glow Accents */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(232,207,122,0.35) 0%, rgba(154,27,27,0.2) 60%, transparent 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full pointer-events-none opacity-30 blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(128,0,0,0.5) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 px-7 pt-7 pb-6 sm:px-12 sm:pt-12 sm:pb-8 lg:px-16 lg:pt-16 lg:pb-10">
            <div className="max-w-full lg:max-w-[62%] xl:max-w-[66%]">
              <Reveal>
                {/* Eyebrow */}
                <p className="text-xs sm:text-sm uppercase tracking-[0.22em] font-bold text-gold-300 mb-3 sm:mb-4">
                  Let&apos;s work together
                </p>

                {/* Judul: Font Display Serif (Playfair Display) */}
                <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.65rem] xl:text-[2.85rem] font-bold text-cream-100 leading-[1.18] mb-4 sm:mb-5">
                  Mari bangun alur kerja yang lebih rapi, bersama.
                </h2>

                {/* Deskripsi */}
                <p className="text-cream-100/80 text-sm sm:text-base lg:text-[1.02rem] leading-relaxed mb-7 sm:mb-8">
                  Sedang mencari tim administrasi, pengarsipan digital, atau data management yang teliti, komunikatif, dan cepat beradaptasi? Aku siap berkontribusi penuh mulai dari penataan dokumen hingga implementasi sistem kearsipan efisien.
                </p>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* Button 1: Kirim Email Langsung (Direct Mailto + Salin Email) */}
                  <a
                    id="contact-email-btn"
                    href={`mailto:${profile.contact.email}?subject=${encodeURIComponent("Tawaran Kolaborasi / Peluang Kerja — Rahmi Atika")}`}
                    onClick={handleEmailButtonClick}
                    aria-label={`Kirim email langsung ke ${profile.contact.email}`}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-cream-50 hover:bg-white text-maroon-900 font-semibold text-xs sm:text-sm lg:text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 text-maroon-800 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <span>Mulai Percakapan (Kirim Email)</span>
                  </a>

                  {/* Button 2: WhatsApp Chat Langsung */}
                  <a
                    href={profile.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Hubungi via WhatsApp"
                    className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/18 text-cream-100 font-medium text-xs sm:text-sm lg:text-base border border-cream-100/25 hover:border-cream-100/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer backdrop-blur-xs"
                  >
                    <svg
                      className="w-4 h-4 text-cream-100/90 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── Foto Rahmi (Khusus Tampilan Laptop HD & FHD — Membentang dari Belakang Garis Pembatas) ── */}
          <div
            className="hidden lg:block absolute right-2 xl:right-8 bottom-0 h-[88%] lg:h-[93%] xl:h-[97%] max-h-[500px] pointer-events-none select-none z-10"
            aria-hidden="true"
          >
            <div className="relative h-full flex items-end pt-10 pr-5">
              {/* Ambient Warm Golden Rim Glow di belakang foto agar menyatu elegan dengan maroon */}
              <div
                className="absolute inset-0 -top-8 -right-4 rounded-full opacity-60 blur-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 60% 40%, rgba(232,207,122,0.4) 0%, rgba(180,30,50,0.25) 50%, transparent 80%)",
                }}
              />
              {/* Gambar Subjek Rahmi */}
              <img
                src="/assets/images/cta-rahmi.webp"
                alt="Rahmi Atika"
                className="relative h-full w-auto object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out hover:scale-[1.02]"
                loading="lazy"
                width="510"
                height="993"
              />
            </div>
          </div>

          {/* ── Info Divider Bar (Email & Domisili — Efek Glassmorphism Transparan) ── */}
          <div
            className="relative z-20 w-full border-t border-white/25 backdrop-blur-xl px-7 sm:px-12 lg:px-16 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-cream-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-cream-100/50">Email:</span>
              <button
                onClick={handleCopyEmail}
                className="underline decoration-dotted underline-offset-2 hover:text-cream-100 hover:decoration-solid transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400 rounded-sm cursor-pointer"
                aria-label={`Salin email ${profile.contact.email}`}
              >
                <span ref={emailRef}>{profile.contact.email}</span>
              </button>
            </div>
            <div className="text-cream-100/60 font-medium">
              • Bogor • BojongGede • Depok • Jakarta
            </div>
          </div>
        </div>

        {/* ── Footer Bersih di bawah Card (Diturunkan dengan jarak lega) ── */}
        <footer
          className="mt-10 sm:mt-15 lg:mt-20 pt-10 sm:pt-10 border-t border-charcoal-400/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-charcoal-600 font-medium"
          aria-label="Footer"
        >
          <p className="order-2 sm:order-1 text-charcoal-500">
            © 2026 Rahmi Atika
          </p>

          <nav
            aria-label="Tautan sosial dan kontak"
            className="flex items-center gap-6 order-1 sm:order-2"
          >
            <button
              onClick={handleCopyEmail}
              className="hover:text-maroon-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-700 rounded-sm cursor-pointer"
              aria-label="Salin alamat email"
            >
              Email
            </button>
            <a
              href={profile.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-maroon-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-700 rounded-sm"
              aria-label="Hubungi via WhatsApp"
            >
              WhatsApp
            </a>
            {linkedinReal && (
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-maroon-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-700 rounded-sm"
                aria-label="Profil LinkedIn Rahmi Atika"
              >
                LinkedIn
              </a>
            )}
          </nav>
        </footer>
      </div>
    </section>
  );
}
