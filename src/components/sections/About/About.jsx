// src/components/sections/About/About.jsx
// PRD.md §2.3 — About Section
// Komponen: SectionHeading, BlurText, CountUp, ProfileCard (foto), EducationTimeline, ExperienceCards
// Data: profile.js, certificates.json, projects.js
// TIDAK memodifikasi Hero/Splash/Navbar

import { useRef, useState, useEffect } from "react";
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
    label: "Program Kerja Nasional (NFSCC)",
    suffix: "",
    static: false,
  },
  {
    id: "accuracy",
    value: profile.stats.dataAccuracy,
    decimals: 0,
    label: "Akurasi Migrasi Data (Telkom)",
    suffix: "%",
    static: true, // tampilkan statis, bukan count-up
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
      {/* Badge bawah kartu */}
      <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-maroon-700/10 border border-maroon-700/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon-600 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon-700" />
        </span>
        <span className="text-maroon-700 text-xs font-bold tracking-wide">
          Open to Opportunities
        </span>
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

// ─── EducationTimeline ────────────────────────────────────────────────────────
// Tanpa foto (tidak ada placeholder images per PRD §2.3)
function EducationTimeline() {
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
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── ExperienceCards ──────────────────────────────────────────────────────────
function ExperienceCards() {
  return (
    <div className="flex flex-col gap-4">
      {profile.experience.map((exp, i) => (
        <Reveal key={exp.id} delay={i * 120} direction="up">
          <div className="bg-cream-50 rounded-2xl p-5 sm:p-6 border border-maroon-700/10 shadow-soft hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="font-display text-maroon-700 font-bold text-base leading-tight">
                  {exp.org}
                </h3>
                <p className="text-charcoal-800 font-semibold text-sm">{exp.role}</p>
              </div>
              <span className="text-xs font-bold text-gold-500 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/25 whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <ul className="space-y-1.5">
              {exp.points.map((pt, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-charcoal-500">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-maroon-700/60 flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─── Main About Section ───────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 overflow-hidden"
      aria-label="Tentang Saya — Rahmi Atika"
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
            eyebrow="Siapa Saya"
            title="Tentang Saya"
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
                className="text-base sm:text-lg text-charcoal-800 leading-relaxed max-w-prose"
              />
            </Reveal>

            {/* Stats grid */}
            <Reveal delay={100}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
            <EducationTimeline />
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
            <ExperienceCards />
          </div>
        </div>

      </div>
    </section>
  );
}
