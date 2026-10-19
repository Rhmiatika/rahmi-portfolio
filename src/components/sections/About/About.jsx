// src/components/sections/About/About.jsx
// PRD.md §2.3 — About Section
// Komponen: SectionHeading, BlurText, CountUp, ProfileCard (foto), EducationTimeline, ExperienceCards, LightboxModal
// Data: profile.js, certificates.json, projects.js
// TIDAK memodifikasi Hero/Splash/Navbar

import { useState, useEffect } from "react";
import { profile } from "@/data/profile";
import certificates from "@/data/certificates.json";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import BlurText from "@/components/reactbits/BlurText";
import CountUp from "@/components/reactbits/CountUp";
import AboutCardDeck from "./AboutCardDeck";
import { LuAward, LuFileText, LuBriefcase, LuUsers } from "react-icons/lu";

// ─── Statistik (Modern Reference Design) ────────────────────────────────────
const STATS = [
  {
    id: "gpa",
    value: profile.stats.gpa,
    decimals: 2,
    suffix: "",
    title: "IPK DARI 4.00",
    badge: "Sangat Memuaskan",
    icon: LuAward,
  },
  {
    id: "certs",
    value: certificates.length,
    decimals: 0,
    suffix: "+",
    title: "Sertifikat & Kegiatan",
    badge: "Digital & Data",
    icon: LuFileText,
  },
  {
    id: "projects",
    value: projects.length,
    decimals: 0,
    suffix: "+",
    title: "Proyek IT",
    badge: "Sistem & Automasi",
    icon: LuBriefcase,
  },
  {
    id: "proker",
    value: profile.stats.proker,
    decimals: 0,
    suffix: "",
    title: "Program Kerja",
    badge: "NFSCC / Organisasi",
    icon: LuUsers,
  },
];

// ─── StatCard (Modern Reference Design) ────────────────────────────────────────
function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="group relative flex flex-col justify-between p-3.5 sm:p-4 min-[1400px]:p-4.5 rounded-2xl bg-cream-50/95 border border-maroon-700/15 shadow-xs hover:shadow-[0_12px_24px_-8px_rgba(107,26,42,0.12),0_4px_10px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-maroon-700/35 transition-all duration-300 overflow-hidden cursor-default">
      {/* Delicate top gradient accent on hover */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-maroon-700/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Top Row: Angka Besar + Icon Minimalis */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-sans font-extrabold text-xl sm:text-2xl min-[1400px]:text-[1.75rem] text-charcoal-800 tracking-tight leading-none">
          <CountUp
            end={stat.value}
            decimals={stat.decimals}
            suffix={stat.suffix}
            duration={1800}
          />
        </div>

        {Icon && (
          <div className="w-7 h-7 min-[1400px]:w-8 min-[1400px]:h-8 rounded-lg bg-maroon-700/5 group-hover:bg-maroon-700/10 flex items-center justify-center text-maroon-700/70 group-hover:text-maroon-700 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
            <Icon className="w-3.5 h-3.5 min-[1400px]:w-4 min-[1400px]:h-4 stroke-[1.8]" />
          </div>
        )}
      </div>

      {/* Middle: Judul Kategori (min-h untuk menyamakan tinggi pada 4 col) */}
      <p className="text-[11.5px] sm:text-xs min-[1400px]:text-sm font-semibold text-charcoal-700 tracking-tight leading-snug mb-2.5 min-h-[2.1rem] flex items-center">
        {stat.title}
      </p>

      {/* Bottom: Pill Badge */}
      <div className="pt-0.5">
        <span className="inline-flex items-center px-2 py-0.5 min-[1400px]:px-2.5 min-[1400px]:py-1 rounded-full text-[10px] sm:text-[11px] min-[1400px]:text-xs font-semibold bg-[#F5EBE1] text-[#7A3E26] border border-[#E3D1C0] group-hover:border-maroon-700/25 group-hover:bg-[#F3E5D8] transition-colors duration-300 shadow-2xs whitespace-nowrap">
          {stat.badge}
        </span>
      </div>
    </div>
  );
}

// ─── Unified LightboxModal ────────────────────────────────────────────────────
function LightboxModal({ modal, onClose, onPrev, onNext }) {
  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-maroon-950/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-2xl w-full bg-cream-50 rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl p-3 sm:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-maroon-900/80 text-cream-100 flex items-center justify-center hover:bg-maroon-800 transition-colors shadow focus:outline-none cursor-pointer"
          aria-label="Tutup preview foto"
        >
          ✕
        </button>

        {/* Gambar Utama */}
        <div className="relative flex items-center justify-center bg-maroon-950/10 rounded-xl overflow-hidden min-h-[220px]">
          <img
            src={modal.list[modal.index]}
            alt={`${modal.title} ${modal.index + 1}`}
            className="w-full h-auto max-h-[72vh] object-contain rounded-xl shadow"
          />

          {/* Tombol Navigasi Kiri / Kanan jika foto > 1 */}
          {modal.list.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-maroon-900/75 text-cream-100 flex items-center justify-center hover:bg-maroon-800 transition-all shadow cursor-pointer focus:outline-none text-lg font-bold"
                aria-label="Foto sebelumnya"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-maroon-900/75 text-cream-100 flex items-center justify-center hover:bg-maroon-800 transition-all shadow cursor-pointer focus:outline-none text-lg font-bold"
                aria-label="Foto berikutnya"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Footer info & pagination */}
        <div className="pt-3 pb-1 flex items-center justify-between text-xs px-1">
          <div>
            <p className="font-bold text-maroon-700 sm:text-sm">{modal.title}</p>
            {modal.subtitle && (
              <p className="text-charcoal-500 text-[11px] sm:text-xs mt-0.5">{modal.subtitle}</p>
            )}
          </div>
          {modal.list.length > 1 && (
            <span className="text-[11px] font-bold text-gold-600 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/25 whitespace-nowrap">
              {modal.index + 1} / {modal.list.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PhotoGalleryPreview (3-thumbnail preview bersih dengan overlay +N) ──────────
function PhotoGalleryPreview({ list, onOpenGallery, title, subtitle, label, aspectRatio = "aspect-[4/3]" }) {
  if (!list || list.length === 0) return null;

  const maxPreview = 3;
  const previewPhotos = list.slice(0, maxPreview);
  const remainingCount = list.length - maxPreview;

  return (
    <div className="mt-4 pt-3.5 border-t border-[#EAE3D6]">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-bold text-maroon-700 uppercase tracking-wider flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {label || "Dokumentasi"}
        </span>
        <button
          type="button"
          onClick={() => onOpenGallery({ list, index: 0, title, subtitle })}
          className="text-[11px] font-semibold text-charcoal-500 hover:text-maroon-700 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>{list.length} Foto</span>
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {previewPhotos.map((photoSrc, idx) => {
          const isLastAndHasMore = idx === maxPreview - 1 && remainingCount > 0;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onOpenGallery({ list, index: idx, title, subtitle })}
              className={`group relative rounded-xl overflow-hidden ${aspectRatio} border border-[#E7DDD0] bg-cream-100/60 hover:border-gold-500 transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5 text-left focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer`}
              title={`Buka foto ${idx + 1}`}
            >
              <img
                src={photoSrc}
                alt={`${label} ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {isLastAndHasMore ? (
                <div className="absolute inset-0 bg-maroon-950/70 backdrop-blur-2xs flex flex-col items-center justify-center text-cream-100 font-bold transition-colors group-hover:bg-maroon-900/80">
                  <span className="text-sm sm:text-base leading-none">+{remainingCount}</span>
                  <span className="text-[10px] font-medium text-cream-200/80 mt-0.5">Lainnya</span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-maroon-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-1 rounded-full bg-cream-50/95 text-maroon-800 shadow-2xs">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── EducationCards (Bersih, Simetris & Terstruktur) ─────────────────────────
function EducationCards({ onOpenGallery }) {
  return (
    <div className="flex flex-col gap-5">
      {profile.education.map((edu, i) => (
        <Reveal key={edu.id} delay={i * 100} direction="up">
          <div className="bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-[#E7DFD5] shadow-[0_4px_20px_-4px_rgba(45,30,20,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(74,21,27,0.1)] hover:border-maroon-300/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header: Institusi & Periode */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-charcoal-900 font-bold text-base sm:text-lg leading-tight group-hover:text-maroon-700 transition-colors">
                    {edu.institution}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-charcoal-700 font-semibold text-xs sm:text-sm">
                      {edu.degree}
                    </span>
                    {edu.gpa && (
                      <span className="inline-flex items-center text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-maroon-100 text-maroon-700 border border-maroon-700/20">
                        IPK {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>

                {/* Periode & Lokasi */}
                <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-maroon-900 bg-[#F2EAE0] px-2.5 py-0.5 rounded-full border border-[#DFD3C3] whitespace-nowrap">
                    {edu.period}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-charcoal-500 font-medium">
                    {edu.location}
                  </span>
                </div>
              </div>

              {/* Judul Skripsi — Callout Box yang rapi & bersih */}
              {edu.thesis && (
                <div className="mt-3.5 p-3 rounded-xl bg-[#F5EFEB]/70 border-l-3 border-gold-500 border border-[#E5DACD]/60">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 mb-0.5">
                    Judul Skripsi S1
                  </p>
                  <p className="text-xs sm:text-[13px] text-charcoal-800 font-medium leading-relaxed">
                    {edu.thesis}
                  </p>
                </div>
              )}

              {/* Mata Kuliah Relevan — Chips minimalis netral */}
              {edu.courses?.length > 0 && (
                <div className="mt-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 mb-1.5">
                    Mata Kuliah Utama
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.courses.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white text-charcoal-700 border border-[#E2D7C8] font-medium shadow-2xs"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Catatan untuk SMK jika tidak ada gallery/skripsi */}
              {!edu.thesis && !edu.courses?.length && (
                <p className="mt-2 text-xs text-charcoal-500 leading-relaxed">
                  Fokus keahlian pada multimedia, dasar desain grafis, animasi, dan pengantar teknologi informasi.
                </p>
              )}
            </div>

            {/* Dokumentasi Kelulusan */}
            {edu.gallery?.length > 0 && (
              <PhotoGalleryPreview
                list={edu.gallery}
                onOpenGallery={onOpenGallery}
                title={`Dokumentasi Wisuda · ${profile.name}`}
                subtitle={`${edu.institution} · S1 Teknik Informatika`}
                label="Dokumentasi Kelulusan"
                aspectRatio="aspect-[3/4]"
              />
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─── ExperienceCards (Bersih, Simetris & Terstruktur) ────────────────────────
function ExperienceCards({ onOpenGallery }) {
  return (
    <div className="flex flex-col gap-5">
      {profile.experience.map((exp, i) => (
        <Reveal key={exp.id} delay={i * 120} direction="up">
          <div className="bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-[#E7DFD5] shadow-[0_4px_20px_-4px_rgba(45,30,20,0.06)] hover:shadow-[0_12px_28px_-6px_rgba(74,21,27,0.1)] hover:border-maroon-300/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Header: Organisasi & Periode */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-charcoal-900 font-bold text-base sm:text-lg leading-tight group-hover:text-maroon-700 transition-colors">
                    {exp.org}
                  </h3>
                  <p className="text-maroon-700 font-semibold text-xs sm:text-sm mt-0.5">
                    {exp.role}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                  <span className="text-[11px] sm:text-xs font-bold text-maroon-900 bg-[#F2EAE0] px-2.5 py-0.5 rounded-full border border-[#DFD3C3] whitespace-nowrap">
                    {exp.period}
                  </span>
                  {exp.location && (
                    <span className="text-[10px] sm:text-[11px] text-charcoal-500 font-medium">
                      {exp.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Poin Pencapaian — Rapi, Nyaman Dibaca */}
              <ul className="space-y-2.5 my-3">
                {exp.points.map((pt, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-xs sm:text-[13px] text-charcoal-700 leading-relaxed text-justify"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-maroon-700 flex-shrink-0" />
                    <span className="flex-1">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dokumentasi Kegiatan/PKL — Bersih via PhotoGalleryPreview */}
            {exp.gallery?.length > 0 && (
              <PhotoGalleryPreview
                list={exp.gallery}
                onOpenGallery={onOpenGallery}
                title={`${exp.galleryLabel || "Dokumentasi"} · ${exp.org}`}
                subtitle={`${exp.role} · ${exp.period}`}
                label={exp.galleryLabel || "Dokumentasi"}
              />
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─── Main About Section ───────────────────────────────────────────────────────
export default function About() {
  const [galleryModal, setGalleryModal] = useState(null);

  // Keyboard navigation untuk LightboxModal
  useEffect(() => {
    if (!galleryModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setGalleryModal(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryModal]);

  const handlePrev = () => {
    setGalleryModal((prev) => {
      if (!prev) return null;
      const nextIdx = (prev.index - 1 + prev.list.length) % prev.list.length;
      return { ...prev, index: nextIdx };
    });
  };

  const handleNext = () => {
    setGalleryModal((prev) => {
      if (!prev) return null;
      const nextIdx = (prev.index + 1) % prev.list.length;
      return { ...prev, index: nextIdx };
    });
  };

  return (
    <section
      id="about"
      className="relative pt-5 sm:pt-8 pb-10 sm:pb-14 overflow-hidden"
      aria-label="Tentang Aku — Rahmi Atika"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 10% 50%, rgba(180,20,20,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(212,175,55,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="portfolio-container relative z-10">

        {/* ── Section Heading ── */}
        <Reveal>
          <SectionHeading
            eyebrow="Siapa Aku"
            title="Tentang Aku"
          />
        </Reveal>

        {/* ── Main grid: 2 kolom (foto kiri, konten kanan) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Kolom Kiri: Interactive Stacked Photo Cards Deck ── */}
          <Reveal direction="left">
            <AboutCardDeck />
          </Reveal>

          {/* ── Kolom Kanan: Bio + Stats (padding-left proporsional khusus laptop HD & FHD) ── */}
          <div className="flex flex-col justify-between gap-6 lg:gap-8 lg:pl-6 min-[1400px]:pl-8">

            {/* Bio — BlurText dengan spacing antar baris yang nyaman & proporsional */}
            <Reveal>
              <BlurText
                text={profile.bio}
                as="p"
                stepMs={45}
                className="text-sm sm:text-base lg:text-[1.05rem] min-[1400px]:text-[1.18rem] text-charcoal-800 leading-[1.85] lg:leading-[1.95] min-[1400px]:leading-[2.05] tracking-[0.012em] text-justify"
              />
            </Reveal>

            {/* Stats grid (4 kolom di HD & FHD, 2 kolom di mobile) */}
            <Reveal delay={100}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 min-[1400px]:gap-4">
                {STATS.map((stat) => (
                  <StatCard key={stat.id} stat={stat} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="my-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-maroon-700/20 to-transparent" />
          <span className="text-maroon-700/30 text-xs font-bold uppercase tracking-widest">
            Riwayat
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-maroon-700/20 to-transparent" />
        </div>

        {/* ── Education + Experience ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Pendidikan */}
          <div>
            <Reveal>
              <div className="mb-8">
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-1">
                  Pendidikan
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-maroon-700">
                  Latar Belakang Akademik
                </h2>
              </div>
            </Reveal>
            <EducationCards onOpenGallery={setGalleryModal} />
          </div>

          {/* Pengalaman */}
          <div>
            <Reveal>
              <div className="mb-8">
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-1">
                  Pengalaman
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-maroon-700">
                  Perjalanan Profesional
                </h2>
              </div>
            </Reveal>
            <ExperienceCards onOpenGallery={setGalleryModal} />
          </div>
        </div>

      </div>

      {/* ── Unified Lightbox Modal (Wisuda & Kegiatan) ── */}
      <LightboxModal
        modal={galleryModal}
        onClose={() => setGalleryModal(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
