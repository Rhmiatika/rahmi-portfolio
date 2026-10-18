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

// ─── Statistik (dari PRD §2.3) ───────────────────────────────────────────────
const STATS = [
  {
    id: "gpa",
    value: profile.stats.gpa,
    decimals: 2,
    label: "IPK dari 4.00",
    suffix: "",
    static: false,
  },
  {
    id: "certs",
    value: certificates.length,
    decimals: 0,
    label: "Sertifikat & Kegiatan",
    suffix: "",
    static: false,
  },
  {
    id: "projects",
    value: projects.length,
    decimals: 0,
    label: "Proyek",
    suffix: "",
    static: false,
  },
  {
    id: "proker",
    value: profile.stats.proker,
    decimals: 0,
    label: "Program Kerja Nasional NFSCC",
    suffix: "",
    static: false,
  },
];

// ─── ProfileCard (foto formal) ───────────────────────────────────────────────
function ProfileCard() {
  const photo = profile.photoFormal || profile.photo;

  return (
    <div className="relative flex flex-col items-center">
      {/* Card glow halo */}
      <div
        className="absolute inset-0 rounded-[2rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,20,20,0.13) 0%, transparent 70%)",
        }}
      />
      {/* Card */}
      <div
        className="relative w-full max-w-[280px] sm:max-w-[300px] rounded-[2rem] overflow-hidden border border-maroon-700/20 shadow-soft bg-cream-50"
        style={{ aspectRatio: "3/4" }}
      >
        <img
          src={photo}
          alt={`Foto formal ${profile.name}`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
        {/* Overlay gradient bawah */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-maroon-900/80 to-transparent pointer-events-none" />
        {/* Nama di bawah */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="font-display text-cream-100 font-bold text-lg leading-tight">
            {profile.name}
          </p>
          <p className="text-gold-300 text-xs font-semibold tracking-wide mt-0.5">
            {profile.title}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-5 rounded-2xl bg-cream-50 border border-maroon-700/10 shadow-soft hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="font-display text-3xl sm:text-4xl font-bold text-maroon-700 leading-none mb-1">
        {stat.static ? (
          <span>{stat.value}{stat.suffix}</span>
        ) : (
          <CountUp
            end={stat.value}
            decimals={stat.decimals}
            suffix={stat.suffix}
            duration={1800}
          />
        )}
      </div>
      <p className="text-charcoal-500 text-xs sm:text-sm font-medium leading-tight mt-1 max-w-[120px]">
        {stat.label}
      </p>
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

// ─── EducationTimeline ────────────────────────────────────────────────────────
function EducationTimeline({ onOpenGallery }) {
  return (
    <div className="relative">
      {/* Garis timeline vertikal */}
      <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-maroon-700/60 via-maroon-700/30 to-transparent" />

      <div className="flex flex-col gap-8">
        {profile.education.map((edu, i) => (
          <Reveal key={edu.id} delay={i * 100} direction="left">
            <div className="relative pl-12">
              {/* Dot */}
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-maroon-700 border-2 border-cream-200 shadow-sm -translate-x-1/2" />

              <div className="bg-cream-50 rounded-2xl p-5 sm:p-6 border border-maroon-700/10 shadow-soft hover:shadow-md transition-shadow duration-300">
                {/* Periode + lokasi */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gold-500 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/25">
                    {edu.period}
                  </span>
                  <span className="text-xs text-charcoal-500">{edu.location}</span>
                </div>

                {/* Institusi */}
                <h3 className="font-display text-maroon-700 font-bold text-base sm:text-lg leading-tight">
                  {edu.institution}
                </h3>
                {/* Gelar */}
                <p className="text-charcoal-800 font-semibold text-sm mt-0.5">
                  {edu.degree}
                  {edu.gpa && (
                    <span className="ml-2 text-maroon-600 font-bold">
                      · IPK {edu.gpa}
                    </span>
                  )}
                </p>

                {/* Judul penelitian */}
                {edu.thesis && (
                  <p className="text-charcoal-500 text-sm italic mt-2 leading-relaxed">
                    Judul Skripsi:{" "}
                    <span className="not-italic font-medium text-charcoal-800">
                      {edu.thesis}
                    </span>
                  </p>
                )}

                {/* Mata kuliah relevan */}
                {edu.courses?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {edu.courses.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-maroon-100 text-maroon-700 border border-maroon-700/20 font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Dokumentasi Wisuda & Kampus Asli */}
                {edu.gallery?.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-maroon-700/10">
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-xs font-bold text-maroon-700 uppercase tracking-wider flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-gold-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Dokumentasi Kelulusan
                      </p>
                      <span className="text-[11px] font-medium text-charcoal-400">
                        {edu.gallery.length} Foto
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {edu.gallery.map((photoSrc, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            onOpenGallery({
                              list: edu.gallery,
                              index: idx,
                              title: `Dokumentasi Wisuda · ${profile.name}`,
                              subtitle: `${edu.institution} · S1 Teknik Informatika`,
                            })
                          }
                          className="group relative rounded-xl overflow-hidden aspect-[3/4] border border-maroon-700/15 bg-cream-100 hover:border-gold-500 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-left focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer"
                          title="Klik untuk memperbesar foto wisuda"
                        >
                          <img
                            src={photoSrc}
                            alt={`Dokumentasi Wisuda ${profile.name} ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-maroon-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="p-1.5 rounded-full bg-cream-50/95 text-maroon-800 shadow">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                              </svg>
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── ExperienceCards ──────────────────────────────────────────────────────────
function ExperienceCards({ onOpenGallery }) {
  return (
    <div className="flex flex-col gap-4">
      {profile.experience.map((exp, i) => (
        <Reveal key={exp.id} delay={i * 120} direction="up">
          <div className="bg-cream-50 rounded-2xl p-5 sm:p-6 border border-maroon-700/10 shadow-soft hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-maroon-700 font-bold text-sm sm:text-base leading-tight">
                  {exp.org}
                </h3>
                <p className="text-charcoal-800 font-semibold text-xs sm:text-sm mt-0.5">{exp.role}</p>
              </div>
              <div className="flex-shrink-0 text-right flex flex-col items-end gap-1">
                <span className="text-[11px] sm:text-xs font-bold text-gold-500 bg-gold-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-gold-500/25 whitespace-nowrap">
                  {exp.period}
                </span>
                {exp.location && (
                  <span className="text-[10px] sm:text-[11px] text-charcoal-500 font-medium">
                    {exp.location}
                  </span>
                )}
              </div>
            </div>

            {/* Poin Pekerjaan — Singkat & On Point */}
            <ul className="space-y-2">
              {exp.points.map((pt, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-charcoal-700 leading-relaxed text-justify">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-maroon-700/70 flex-shrink-0" />
                  <span className="flex-1">{pt}</span>
                </li>
              ))}
            </ul>

            {/* Dokumentasi (Kegiatan NFSCC atau PKL Telkom) */}
            {exp.gallery?.length > 0 && (
              <div className="mt-4 pt-3.5 border-t border-maroon-700/10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-maroon-700 uppercase tracking-wider flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-gold-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {exp.galleryLabel || "Dokumentasi"}
                  </p>
                  <span className="text-[11px] font-medium text-charcoal-400">
                    {exp.gallery.length} Dokumentasi
                  </span>
                </div>
                <div
                  className={`grid gap-1.5 sm:gap-2 ${
                    exp.gallery.length === 4
                      ? "grid-cols-4"
                      : "grid-cols-5"
                  }`}
                >
                  {exp.gallery.map((photoSrc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        onOpenGallery({
                          list: exp.gallery,
                          index: idx,
                          title: `${exp.galleryLabel || "Dokumentasi"} · ${exp.org}`,
                          subtitle: `${exp.role} · ${exp.period}`,
                        })
                      }
                      className="group relative rounded-lg sm:rounded-xl overflow-hidden aspect-[4/3] border border-maroon-700/15 bg-cream-100 hover:border-gold-500 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 text-left focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer"
                      title={`Lihat foto ${idx + 1}`}
                    >
                      <img
                        src={photoSrc}
                        alt={`${exp.galleryLabel || "Dokumentasi"} ${exp.org} ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-maroon-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="p-1 rounded-full bg-cream-50/95 text-maroon-800 shadow">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
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
      className="relative pt-6 sm:pt-10 pb-10 sm:pb-14 overflow-hidden"
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

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

        {/* ── Section Heading ── */}
        <Reveal>
          <SectionHeading
            eyebrow="Siapa Aku"
            title="Tentang Aku"
          />
        </Reveal>

        {/* ── Main grid: 2 kolom (foto kiri, konten kanan) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Kolom Kiri: Profile Card ── */}
          <Reveal direction="left">
            <ProfileCard />
          </Reveal>

          {/* ── Kolom Kanan: Bio + Stats ── */}
          <div className="flex flex-col gap-8">

            {/* Bio — BlurText */}
            <Reveal>
              <BlurText
                text={profile.bio}
                as="p"
                stepMs={45}
                className="text-base sm:text-lg text-charcoal-800 leading-relaxed text-justify"
              />
            </Reveal>

            {/* Stats grid (4 card) */}
            <Reveal delay={100}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
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
            <EducationTimeline onOpenGallery={setGalleryModal} />
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
