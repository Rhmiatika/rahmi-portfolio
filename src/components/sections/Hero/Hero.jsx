// src/components/sections/Hero/Hero.jsx
// PRD.md §2.2 — dua kolom (mobile bertumpuk)
// Teks dari src/data/profile.js — TIDAK hard-code
// Lanyard: React.lazy + Suspense + IntersectionObserver + useCanUse3D fallback

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import StrokeText from "@/components/reactbits/StrokeText";
import RotatingText from "@/components/reactbits/RotatingText";
import FuseButton from "@/components/reactbits/FuseButton";
import Reveal from "@/components/ui/Reveal";
import { useCanUse3D } from "@/hooks/useCanUse3D";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Lazy-load Lanyard (heavy 3D chunk)
const Lanyard = lazy(() =>
  import("@/components/reactbits/Lanyard").catch(() => ({
    default: () => null, // fallback silent jika gagal import
  }))
);

// Fallback static image jika WebGL tidak tersedia / mobile
function LanyardFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <img
          src={profile.photoFormal ?? profile.photo}
          alt="Rahmi Atika"
          width={320}
          height={400}
          className="w-64 sm:w-72 rounded-[var(--radius-card)] object-cover shadow-soft border border-gold-500/30"
          loading="eager"
        />
        {/* Decorative glow */}
        <div
          className="absolute inset-0 rounded-[var(--radius-card)] pointer-events-none"
          style={{
            boxShadow: "0 0 40px 8px rgba(128,0,0,0.12)",
          }}
        />
      </div>
    </div>
  );
}

// Chip bukti
const CHIPS = [
  { label: `IPK ${profile.stats.gpa}` },
  { label: "NFSCC HUB" },
  { label: "PKL Telkom Indonesia" },
];

export default function Hero() {
  const can3D = useCanUse3D();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const lanyardRef = useRef(null);
  const [lanyardVisible, setLanyardVisible] = useState(false);

  // IntersectionObserver: mount Lanyard hanya saat terlihat
  useEffect(() => {
    const el = lanyardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLanyardVisible(true);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showLanyard = can3D && !isMobile && lanyardVisible;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-16 flex items-center"
      aria-label="Hero — Rahmi Atika"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Kolom Kiri: Teks ───────────────────────────── */}
          <div className="order-2 lg:order-1 flex flex-col items-start gap-5">
            <Reveal>
              {/* Eyebrow */}
              <p className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-maroon-700">
                {/* PRD: "Halo, saya" */}
                Halo, saya
              </p>

              {/* Nama — StrokeText */}
              <StrokeText
                text={profile.name}
                as="h1"
                className="text-5xl sm:text-6xl md:text-7xl mt-1"
              />

              {/* Role — RotatingText */}
              <div className="text-lg sm:text-xl font-sans font-semibold text-charcoal-800 mt-3 h-8 overflow-hidden">
                <RotatingText
                  texts={profile.roles}
                  interval={2500}
                />
              </div>

              {/* Headline LinkedIn */}
              <p className="text-sm font-sans text-charcoal-500 max-w-md leading-relaxed mt-1">
                {profile.headline}
              </p>

              {/* Value statement */}
              <p className="text-base sm:text-lg font-sans text-charcoal-800 max-w-xl leading-relaxed mt-2">
                Lulusan Teknik Informatika yang terbiasa merapikan data,
                mendigitalkan dokumen, dan menjaga operasional tetap akurat.
              </p>

              {/* Chip bukti */}
              <div className="flex flex-wrap gap-2 mt-3">
                {CHIPS.map(({ label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-maroon-100 text-maroon-700 border border-maroon-700/20"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-5">
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

          {/* ── Kolom Kanan: Lanyard ────────────────────────── */}
          <div
            ref={lanyardRef}
            className="order-1 lg:order-2 flex items-center justify-center overflow-hidden"
            style={{ minHeight: isMobile ? "340px" : "520px", height: isMobile ? "340px" : "520px" }}
          >
            {can3D && !isMobile ? (
              <Suspense fallback={<LanyardFallback />}>
                {lanyardVisible ? (
                  <div className="w-full h-full" style={{ maxWidth: "480px" }}>
                    <Lanyard
                      frontImage={profile.photoLanyard}
                      cardColor="#800000"
                      strapColor="#4A0000"
                      finish="glossy"
                      size={0.65}
                      gravity={1.2}
                      className="w-full h-full"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                ) : (
                  <LanyardFallback />
                )}
              </Suspense>
            ) : (
              <LanyardFallback />
            )}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-charcoal-500/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold-500/60 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
