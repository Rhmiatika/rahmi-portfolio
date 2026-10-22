// src/components/sections/Hero/Hero.jsx
// PRD.md §2.2 — dua kolom (mobile bertumpuk)
// Teks dari src/data/profile.js — TIDAK hard-code
// Lanyard: Full-bleed canvas across entire hero section (z-20), tidak terpotong saat ditarik ke kiri

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import TypewriterText from "@/components/reactbits/TypewriterText";
import FuseButton from "@/components/reactbits/FuseButton";
import Reveal from "@/components/ui/Reveal";
import { useCanUse3D } from "@/hooks/useCanUse3D";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLanyardCard, useLanyardStrap } from "@/hooks/useLanyardCard";

// Lazy-load Lanyard (heavy 3D chunk)
const Lanyard = lazy(() =>
  import("@/components/reactbits/Lanyard").catch(() => ({
    default: () => null,
  }))
);

// Skill pills — sesuai LinkedIn resmi
const SKILLS = [
  "Digital Administration",
  "Data Management",
  "Information System",
];

// Fallback jika WebGL tidak tersedia / mobile — Desain kartu putih ramping & frameless
function LanyardFallback() {
  const photo =
    profile.photoLanyard ||
    profile.photoFormal ||
    profile.photo;

  return (
    <div className="flex items-center justify-center w-full h-full pt-8 pb-4">
      <div className="relative">
        {/* Strap simulasi tali marun */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-14 w-7 rounded-t-full border-x border-gold-500/40 z-0"
          style={{ height: "62px", background: "linear-gradient(to bottom, #260000, #4A0000)" }}
        />
        {/* Metal ring clip simulasi */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-2.5 w-4 h-6 rounded-full border-[1.5px] border-slate-300 bg-slate-200/40 z-10 shadow-sm" />

        {/* Card putih frameless elegan dengan shadow tipis & halus */}
        <div className="relative z-10 w-48 sm:w-56 aspect-[3/4] rounded-[20px] p-1.5 sm:p-2 bg-gradient-to-b from-white via-[#FAFAFC] to-[#F1F3F6] shadow-[0_14px_30px_-6px_rgba(0,0,0,0.18),0_4px_10px_rgba(0,0,0,0.06)] border border-black/5 flex flex-col">
          {/* Header area ringkas dengan punch slot hole horizontal */}
          <div className="w-full flex items-center justify-center pt-0.5 pb-1.5">
            <div className="w-11 h-2 rounded-full bg-[#E2E5EA] border border-black/10 shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.2)]" />
          </div>

          {/* Inset Photo Frame yang luas (lebih frameless) */}
          <div className="relative flex-1 rounded-[12px] overflow-hidden border border-black/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] bg-charcoal-900">
            <img
              src={photo}
              alt={profile.name}
              className="w-full h-full object-cover object-top"
              loading="eager"
            />

            {/* Dark vignette gradient di bagian bawah foto agar teks putih kontras tajam */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

            {/* Typography elegan di kiri bawah (tanpa pill badge!) */}
            <div className="absolute left-2.5 bottom-2.5 flex flex-col items-start gap-0.5">
              <span className="font-bold text-white text-xs sm:text-sm tracking-tight [text-shadow:_0_1px_4px_rgba(0,0,0,0.95)]">
                Rahmi Atika, S. Kom.
              </span>
              <span className="text-[9.5px] sm:text-[10.5px] font-semibold text-white/95 tracking-tight [text-shadow:_0_1px_3px_rgba(0,0,0,0.95)]">
                Fresh Graduate Teknik Informatika
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const can3D = useCanUse3D();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isFHD = useMediaQuery("(min-width: 1400px)");
  const lanyardRef = useRef(null);
  const [lanyardVisible, setLanyardVisible] = useState(false);
  const cardDataUrl = useLanyardCard(profile.photoLanyard);
  const strapDataUrl = useLanyardStrap();

  useEffect(() => {
    const el = lanyardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLanyardVisible(true);
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Parameter Lanyard: FHD murni besar diperbesar (0.46), HD diperbesar proporsional (0.41)
  const lanyardSize = isFHD ? 0.46 : 0.41;
  const lanyardAnchor = isFHD ? 0.78 : 0.80;
  const lanyardStrapLength = isFHD ? 0.30 : 0.26;
  const lanyardStrapWidth = isFHD ? 0.42 : 0.40;

  return (
    <section
      id="hero"
      className="relative pt-16 flex items-center"
      style={{ minHeight: "calc(100vh - 0px)" }}
      aria-label="Hero — Rahmi Atika"
    >
      <div className="portfolio-container w-full pt-2 md:pt-4 pb-10 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[13fr_7fr] min-[1400px]:grid-cols-5 gap-2 lg:gap-2 min-[1400px]:gap-12 items-center">

          {/* ── Kolom Kiri: Teks (z-10) — 65% (13fr) di HD laptop, 60% (col-span-3) murni di FHD ── */}
          <div className="order-2 lg:order-1 lg:col-span-1 min-[1400px]:col-span-3 flex flex-col items-start w-full relative z-10 lg:-mt-2 min-[1400px]:lg:-mt-5">
            <Reveal className="w-full">
              {/* Available for work badge */}
              <div className="mb-2.5 min-[1400px]:mb-4">
                <span className="inline-flex items-center gap-2 min-[1400px]:gap-2.5 px-3 min-[1400px]:px-4 py-1 min-[1400px]:py-1.5 rounded-full border-[1.5px] border-[#9E6700] bg-amber-500/10 text-maroon-900 text-xs min-[1400px]:text-sm font-bold tracking-wide shadow-xs">
                  <span className="relative flex h-2 w-2 min-[1400px]:h-2.5 min-[1400px]:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8860B] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 min-[1400px]:h-2.5 min-[1400px]:w-2.5 bg-[#9E6700]" />
                  </span>
                  Available for Work
                </span>
              </div>

              {/* Eyebrow */}
              <p className="text-xs sm:text-sm lg:text-sm min-[1400px]:text-xl font-sans font-bold uppercase tracking-[0.22em] text-maroon-700/85 mb-1.5 min-[1400px]:mb-2">
                Halo, aku
              </p>

              {/* Nama — TypewriterText: animasi ketikan dinamis dengan reloop & cursor berkedip */}
              <TypewriterText
                text={profile.name}
                as="h1"
                className="hero-title-name"
              />

              {/* Gelar & Headline Utama */}
              <p className="text-base sm:text-lg lg:text-[1.18rem] min-[1400px]:text-[1.65rem] font-display text-[#8A5306] font-bold mt-2 min-[1400px]:mt-2.5 mb-3 min-[1400px]:mb-5 tracking-tight">
                {profile.headline}
              </p>

              {/* Skills pills */}
              <div className="flex flex-wrap gap-2 min-[1400px]:gap-2.5 mb-3.5 min-[1400px]:mb-6">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 min-[1400px]:px-4 min-[1400px]:py-2 rounded-full text-xs min-[1400px]:text-base font-semibold bg-maroon-100 text-maroon-700 border border-maroon-700/30 shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Deskripsi profesional — text-justify penuh mengisi lebar kolom, tidak ada padding right */}
              <p className="text-sm sm:text-base lg:text-[1.05rem] min-[1400px]:text-[1.2rem] font-sans text-charcoal-500 w-full leading-relaxed text-justify mb-4 sm:mb-5 min-[1400px]:mb-6">
                Berfokus pada pengarsipan digital, administrasi data, dan
                manajemen operasional. Tertarik pada pengembangan sistem
                informasi yang terstruktur dan solusi digitalisasi dokumen
                yang efisien.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 min-[1400px]:gap-4">
                <FuseButton
                  as="a"
                  href={profile.contact.cv}
                  download="CV_Rahmi_Atika_adm.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size={isFHD ? "lg" : "md"}
                  aria-label="Unduh CV Rahmi Atika (PDF)"
                >
                  Unduh CV
                </FuseButton>
                <FuseButton
                  variant="outline"
                  size={isFHD ? "lg" : "md"}
                  onClick={scrollToContact}
                  aria-label="Scroll ke seksi kontak"
                >
                  Hubungi Aku
                </FuseButton>
              </div>
            </Reveal>
          </div>

          {/* ── Kolom Kanan: Layout Spacer / Mobile Fallback — 35% (7fr) di HD laptop, 40% (col-span-2) murni di FHD ─── */}
          <div
            ref={lanyardRef}
            className="order-1 lg:order-2 lg:col-span-1 min-[1400px]:col-span-2 relative h-[320px] sm:h-[360px] lg:h-[450px] min-[1400px]:h-[580px] flex items-center justify-center pointer-events-none"
          >
            {/* Fallback untuk mobile atau perangkat non-WebGL */}
            {(!can3D || isMobile) && <LanyardFallback />}
          </div>
        </div>
      </div>

      {/* ── Desktop 3D Lanyard: Full-bleed canvas across entire section ── */}
      {/* Canvas membentang ke seluruh hero section (z-20) sehingga lanyard bebas ditarik ke kiri tanpa terpotong batas kolom */}
      {can3D && !isMobile && lanyardVisible && (
        <div
          className="absolute top-0 left-0 right-0 -bottom-20 lg:-bottom-24 min-[1400px]:-bottom-48 z-20 pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <Suspense fallback={null}>
            <Lanyard
              frontImage={cardDataUrl || profile.photoLanyard}
              backImage={cardDataUrl || profile.photoLanyard}
              strapImage={strapDataUrl || undefined}
              cardColor="#FFFFFF"
              strapColor="#3A0000"
              strapWidth={lanyardStrapWidth}
              strapLength={lanyardStrapLength}
              finish="satin"
              size={lanyardSize}
              anchor={lanyardAnchor}
              gravity={0.95}
              breeze={0.2}
              className="w-full h-full"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            />
          </Suspense>
        </div>
      )}

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-charcoal-500/50">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-gold-500/50 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
