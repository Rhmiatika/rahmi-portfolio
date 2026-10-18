// src/components/sections/Hero/Hero.jsx
// PRD.md §2.2 — dua kolom (mobile bertumpuk)
// Teks dari src/data/profile.js — TIDAK hard-code
// Lanyard: Full-bleed canvas across entire hero section (z-20), tidak terpotong saat ditarik ke kiri

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import StrokeText from "@/components/reactbits/StrokeText";
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
  "Administrative & Digital Archiving",
  "Data Management"
];

// Fallback jika WebGL tidak tersedia / mobile
function LanyardFallback() {
  const photo =
    profile.photoLanyard ||
    profile.photoFormal ||
    profile.photo;

  return (
    <div className="flex items-center justify-center w-full h-full pt-6">
      <div className="relative">
        {/* Strap simulasi */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-12 w-7 rounded-t-full border-x border-gold-500/40"
          style={{ height: "52px", background: "linear-gradient(to bottom, #260000, #4A0000)" }}
        />
        {/* Card dengan border marun dan foto full (rasio 3:4) */}
        <div className="relative w-44 sm:w-52 aspect-[3/4] rounded-[18px] overflow-hidden border-[3px] border-[#750000] shadow-soft bg-white">
          <img
            src={photo}
            alt={profile.name}
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
          {/* Kiri bawah: pill badge marun + subtitle */}
          <div className="absolute left-3.5 bottom-3.5 flex flex-col items-start gap-1">
            <span className="inline-block px-3 py-1 rounded-full bg-[#750000] text-white font-bold text-xs shadow-sm">
              Rahmi Atika, S. Kom.
            </span>
            <span className="text-[10px] font-bold text-white tracking-tight ml-1 [text-shadow:_0_1px_4px_rgba(0,0,0,0.95)]">
              Fresh Graduate Teknik Informatika
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const can3D = useCanUse3D();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isFHD = useMediaQuery("(min-width: 1800px)");
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

  const lanyardAnchor = isFHD ? 0.78 : 0.81;

  return (
    <section
      id="hero"
      className="relative pt-16 flex items-center"
      style={{ minHeight: "calc(100vh - 0px)" }}
      aria-label="Hero — Rahmi Atika"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 min-[1800px]:px-8 w-full pt-2 lg:pt-3 min-[1800px]:pt-6 pb-6 lg:pb-8 min-[1800px]:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-[1800px]:grid-cols-5 gap-6 lg:gap-8 min-[1800px]:gap-12 items-center">

          {/* ── Kolom Kiri: Teks (z-10) — 65% (col-span-8) di HD laptop, 60% (col-span-3) di FHD ── */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-8 min-[1800px]:col-span-3 flex flex-col items-start relative z-10 lg:-mt-2 min-[1800px]:lg:-mt-5">
            <Reveal>
              {/* Available for work badge */}
              <div className="mb-2.5 min-[1800px]:mb-4">
                <span className="inline-flex items-center gap-2 min-[1800px]:gap-2.5 px-3 min-[1800px]:px-4 py-1 min-[1800px]:py-1.5 rounded-full border-[1.5px] border-[#9E6700] bg-amber-500/10 text-maroon-900 text-[11px] xl:text-xs min-[1800px]:text-sm font-bold tracking-wide shadow-xs">
                  <span className="relative flex h-2 w-2 min-[1800px]:h-2.5 min-[1800px]:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8860B] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 min-[1800px]:h-2.5 min-[1800px]:w-2.5 bg-[#9E6700]" />
                  </span>
                  Available for Work
                </span>
              </div>

              {/* Eyebrow */}
              <p className="text-xs sm:text-sm lg:text-xs xl:text-sm min-[1800px]:text-xl font-sans font-bold uppercase tracking-[0.22em] text-maroon-700/85 mb-1 min-[1800px]:mb-2">
                Halo, aku
              </p>

              {/* Nama — StrokeText: proporsional di HD laptop (1280–1600px), skala megah di FHD (1920px+) */}
              <StrokeText
                text={profile.name}
                as="h1"
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[3.35rem] xl:text-[3.85rem] min-[1800px]:text-[6.65rem] min-[1920px]:text-[7.25rem] leading-[0.98] tracking-[0.03em]"
              />

              {/* Gelar */}
              <p className="text-sm sm:text-base lg:text-[1.1rem] xl:text-[1.22rem] min-[1800px]:text-[1.75rem] font-display text-[#8A5306] font-bold mt-1.5 min-[1800px]:mt-2.5 mb-2.5 sm:mb-3 min-[1800px]:mb-5 tracking-tight">
                S.Kom. · Fresh Graduate Teknik Informatika
              </p>

              {/* Skills pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 min-[1800px]:mb-6">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 xl:px-3.5 xl:py-1 min-[1800px]:px-4 min-[1800px]:py-2 rounded-full text-xs min-[1800px]:text-base font-semibold bg-maroon-100 text-maroon-700 border border-maroon-700/30 shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Deskripsi profesional — text-justify */}
              <p className="text-xs sm:text-sm lg:text-[0.84rem] xl:text-[0.88rem] min-[1800px]:text-lg font-sans text-charcoal-500 max-w-md lg:max-w-lg xl:max-w-xl min-[1800px]:max-w-2xl leading-relaxed text-justify mb-4 sm:mb-5 min-[1800px]:mb-6">
                Berfokus pada pengarsipan digital, administrasi data, dan
                manajemen operasional. Tertarik pada pengembangan sistem
                informasi yang terstruktur dan solusi digitalisasi dokumen
                yang efisien.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 min-[1800px]:gap-4">
                <FuseButton
                  as="a"
                  href={profile.contact.cv}
                  download
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

          {/* ── Kolom Kanan: Layout Spacer / Mobile Fallback — 35% (col-span-4) di HD laptop, 40% (col-span-2) di FHD ─── */}
          <div
            ref={lanyardRef}
            className="order-1 lg:order-2 lg:col-span-5 xl:col-span-4 min-[1800px]:col-span-2 relative h-[320px] sm:h-[350px] lg:h-[410px] xl:h-[450px] min-[1800px]:h-[580px] flex items-center justify-center pointer-events-none"
          >
            {/* Fallback untuk mobile atau perangkat non-WebGL */}
            {(!can3D || isMobile) && <LanyardFallback />}
          </div>
        </div>
      </div>

      {/* ── Desktop 3D Lanyard: Full-bleed canvas across entire section ── */}
      {/* Canvas membentang ke seluruh hero section (z-20) sehingga lanyard bebas ditarik ke kiri (ke atas nama Rahmi Atika) tanpa terpotong batas kolom */}
      {can3D && !isMobile && lanyardVisible && (
        <div
          className="absolute top-0 left-0 right-0 -bottom-20 xl:-bottom-24 min-[1800px]:-bottom-48 z-20 pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <Suspense fallback={null}>
            <Lanyard
              frontImage={cardDataUrl || profile.photoLanyard}
              strapImage={strapDataUrl || undefined}
              cardColor="#6B0000"
              strapColor="#3A0000"
              strapWidth={isFHD ? 0.42 : 0.38}
              strapLength={isFHD ? 0.30 : 0.25}
              finish="glossy"
              size={isFHD ? 0.44 : 0.365}
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
