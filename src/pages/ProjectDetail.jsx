// src/pages/ProjectDetail.jsx
// Halaman detail proyek: /projects/:slug
// Layout: ← Kembali → judul + tahun + tags → cover → latar belakang + peran + hasil → tautan → Proyek berikutnya
// 404 jika slug tidak valid

import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { projects } from "@/data/projects";

// Lightbox/Modal for gallery images
function GalleryLightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && idx > 0) setIdx((i) => i - 1);
      if (e.key === "ArrowRight" && idx < images.length - 1) setIdx((i) => i + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [idx, images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative max-w-5xl w-full rounded-2xl overflow-hidden"
        style={{ background: "#0d0d0d", animation: "modalIn 0.25s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <img
          src={images[idx]}
          alt={`Gallery ${idx + 1}`}
          className="w-full max-h-[80vh] object-contain"
        />

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30 transition-colors"
            style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            aria-label="Gambar sebelumnya"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-white/70 text-sm">{idx + 1} / {images.length}</span>
          <button
            onClick={() => setIdx((i) => Math.min(images.length - 1, i + 1))}
            disabled={idx === images.length - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30 transition-colors"
            style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            aria-label="Gambar berikutnya"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Close — white button with red hover */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-charcoal-800 shadow-md flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer focus:outline-none"
          aria-label="Tutup lightbox"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function TagChip({ tag }) {
  return (
    <span
      className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
      style={{
        background: "rgba(128,0,0,0.08)",
        color: "var(--color-maroon-700)",
        border: "1px solid rgba(128,0,0,0.15)",
      }}
    >
      {tag}
    </span>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];

  // 404 guard
  if (!project) {
    return (
      <>
        <Navbar />
        <main
          className="min-h-screen flex flex-col items-center justify-center gap-6 px-5"
          style={{ background: "var(--color-cream-200)" }}
        >
          <h1
            className="font-display font-bold text-5xl"
            style={{ color: "var(--color-maroon-700)" }}
          >
            404
          </h1>
          <p style={{ color: "var(--color-charcoal-500)" }}>
            Proyek <code className="font-mono text-sm bg-maroon-100 px-2 py-0.5 rounded">{slug}</code> tidak ditemukan.
          </p>
          <Link
            to="/?tab=projects#showcase"
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
            style={{
              background: "var(--color-maroon-700)",
              color: "var(--color-cream-100)",
            }}
          >
            ← Kembali ke Proyek
          </Link>
        </main>
      </>
    );
  }

  const nextProject = projects[currentIndex + 1] || projects[0];
  const hasGallery = project.gallery && project.gallery.length > 0;
  const hasCover = Boolean(project.cover);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen"
        style={{ background: "var(--color-cream-200)" }}
      >
        {/* Hero area */}
        <div
          className="pt-24 pb-12 px-5 sm:px-8"
          style={{
            background: "linear-gradient(135deg, var(--color-maroon-700) 0%, #5a0000 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Back link */}
            <Link
              to="/?tab=projects#showcase"
              className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-80"
              style={{ color: "rgba(255,253,208,0.75)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Kembali ke Proyek
            </Link>

            {/* Title */}
            <div className="flex flex-wrap items-start gap-3 mb-4">
              <span
                className="text-sm font-bold px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,253,208,0.15)",
                  color: "var(--color-gold-300)",
                  border: "1px solid rgba(255,253,208,0.2)",
                }}
              >
                {project.year}
              </span>
            </div>
            <h1
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-5"
              style={{ color: "var(--color-cream-100)" }}
            >
              {project.title}
            </h1>
            <p
              className="text-base leading-relaxed max-w-2xl mb-6"
              style={{ color: "rgba(255,253,208,0.8)" }}
            >
              {project.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,253,208,0.12)",
                    color: "var(--color-cream-100)",
                    border: "1px solid rgba(255,253,208,0.2)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">

          {/* Cover image */}
          {hasCover && (
            <div
              className="w-full rounded-2xl overflow-hidden mb-10 cursor-pointer"
              style={{
                border: "1px solid rgba(212,175,55,0.3)",
                boxShadow: "0 16px 48px -16px rgba(128,0,0,0.2)",
              }}
              onClick={() => hasGallery && setLightboxIdx(0)}
            >
              <img
                src={project.cover}
                alt={`Cover ${project.title}`}
                className="w-full"
                style={{ maxHeight: "480px", objectFit: "cover" }}
                width="960"
                height="540"
              />
            </div>
          )}

          {/* Gallery grid (if has gallery beyond cover) */}
          {hasGallery && project.gallery.length > 1 && (
            <div className="mb-10">
              <h2
                className="font-display font-bold text-xl mb-5"
                style={{ color: "var(--color-charcoal-800)" }}
              >
                Galeri Screenshot
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    className="rounded-xl overflow-hidden transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-maroon-700"
                    style={{
                      border: "1px solid rgba(212,175,55,0.25)",
                      background: "var(--color-cream-50)",
                    }}
                    aria-label={`Buka gambar ${i + 1} di lightbox`}
                  >
                    <img
                      src={src}
                      alt={`Screenshot ${i + 1}`}
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: "16/9" }}
                      loading="lazy"
                      width="320"
                      height="180"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Detail sections */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">

            {/* Latar Belakang (summary as placeholder) */}
            <div
              className="md:col-span-2 rounded-2xl p-6"
              style={{
                background: "var(--color-cream-50)",
                border: "1px solid rgba(212,175,55,0.3)",
              }}
            >
              <h2
                className="font-display font-bold text-xl mb-3"
                style={{ color: "var(--color-charcoal-800)" }}
              >
                Latar Belakang
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal-500)" }}>
                {project.summary}
              </p>
            </div>

            {/* Sidebar: tags + links */}
            <div className="space-y-5">
              {/* Tags card */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "var(--color-cream-50)",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ color: "var(--color-charcoal-500)" }}
                >
                  Teknologi
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </div>
              </div>

              {/* Links — only if defined */}
              {(project.links?.demo || project.links?.repo) && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "var(--color-cream-50)",
                    border: "1px solid rgba(212,175,55,0.3)",
                  }}
                >
                  <h3
                    className="text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color: "var(--color-charcoal-500)" }}
                  >
                    Tautan
                  </h3>
                  <div className="flex flex-col gap-2">
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold flex items-center gap-1.5 hover:underline"
                        style={{ color: "var(--color-maroon-700)" }}
                      >
                        🔗 Live Demo
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold flex items-center gap-1.5 hover:underline"
                        style={{ color: "var(--color-maroon-700)" }}
                      >
                        💻 Source Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Peran & Hasil — only if data exists */}
          {(project.role || project.result) && (
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {project.role && (
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--color-cream-50)",
                    border: "1px solid rgba(212,175,55,0.3)",
                  }}
                >
                  <h2
                    className="font-display font-bold text-xl mb-3"
                    style={{ color: "var(--color-charcoal-800)" }}
                  >
                    Peran Aku
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal-500)" }}>
                    {project.role}
                  </p>
                </div>
              )}
              {project.result && (
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: "var(--color-cream-50)",
                    border: "1px solid rgba(212,175,55,0.3)",
                  }}
                >
                  <h2
                    className="font-display font-bold text-xl mb-3"
                    style={{ color: "var(--color-charcoal-800)" }}
                  >
                    Hasil
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal-500)" }}>
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Next project */}
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background: "var(--color-maroon-700)",
            }}
          >
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: "rgba(255,253,208,0.6)" }}
              >
                Proyek berikutnya
              </p>
              <p
                className="font-display font-bold text-lg leading-snug"
                style={{ color: "var(--color-cream-100)" }}
              >
                {nextProject.title}
              </p>
            </div>
            <Link
              to={`/projects/${nextProject.slug}`}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-cream-100/20"
              style={{
                border: "1.5px solid rgba(255,253,208,0.4)",
                color: "var(--color-cream-100)",
              }}
            >
              Lihat
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* Gallery lightbox */}
      {lightboxIdx !== null && (
        <GalleryLightbox
          images={project.gallery}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </>
  );
}
