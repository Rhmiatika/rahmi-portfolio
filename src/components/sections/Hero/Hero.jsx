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
        {/* Card dengan border marun dan foto full */}
        <div className="relative w-48 sm:w-56 aspect-[1/1.4] rounded-[18px] overflow-hidden border-[3px] border-[#750000] shadow-soft bg-white">
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
            <span className="text-[10px] font-bold text-[#750000] tracking-tight ml-1">
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

  return (
    <section
      id="hero"
      className="relative pt-16 flex items-center"
      style={{ minHeight: "calc(100vh - 0px)" }}
      aria-label="Hero — Rahmi Atika"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-10 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Kolom Kiri: Teks (z-10) ─────────────────────── */}
          <div className="order-2 lg:order-1 flex flex-col items-start relative z-10">
            <Reveal>
              {/* Available for work badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/60 bg-gold-500/10 text-maroon-700 text-xs font-semibold tracking-wide">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-70" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
                  </span>
                  Available for Work
                </span>
              </div>

              {/* Eyebrow */}
              <p className="text-sm font-sans font-semibold uppercase tracking-[0.22em] text-maroon-700/70 mb-1">
                Halo, aku
              </p>

              {/* Nama — StrokeText, diperbesar */}
              <StrokeText
                text={profile.name}
                as="h1"
                className="text-6xl sm:text-7xl md:text-8xl leading-none"
              />

              {/* Gelar */}
              <p className="text-base sm:text-lg font-display text-gold-500 font-semibold mt-2 mb-4">
                S.Kom. · Fresh Graduate Teknik Informatika
              </p>

              {/* Skills pills — LinkedIn-aligned */}
              <div className="flex flex-wrap gap-2 mb-5">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-maroon-100 text-maroon-700 border border-maroon-700/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Deskripsi profesional — tanpa dash */}
              <p className="text-base sm:text-lg font-sans text-charcoal-500 max-w-lg leading-relaxed mb-6">
                Berfokus pada pengarsipan digital, administrasi data, dan
                manajemen operasional. Tertarik pada pengembangan sistem
                informasi yang terstruktur dan solusi digitalisasi dokumen
                yang efisien.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <FuseButton
                  as="a"
                  href={profile.contact.cv}
                  download
                  variant="primary"
                  size="lg"
                  aria-label="Unduh CV Rahmi Atika (PDF)"
                >
                  Unduh CV
                </FuseButton>
                <FuseButton
                  variant="outline"
                  size="lg"
                  onClick={scrollToContact}
                  aria-label="Scroll ke seksi kontak"
                >
                  Hubungi Saya
                </FuseButton>
              </div>
            </Reveal>
          </div>

          {/* ── Kolom Kanan: Layout Spacer / Mobile Fallback ─── */}
          <div
            ref={lanyardRef}
            className="order-1 lg:order-2 relative h-[380px] lg:h-[580px] flex items-center justify-center pointer-events-none"
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
          className="absolute top-0 left-0 right-0 -bottom-48 z-20 pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <Suspense fallback={null}>
            <Lanyard
              frontImage={cardDataUrl || profile.photoLanyard}
              strapImage={strapDataUrl || undefined}
              cardColor="#6B0000"
              strapColor="#3A0000"
              strapWidth={0.42}
              strapLength={0.30}
              finish="glossy"
              size={0.46}
              anchor={0.72}
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
