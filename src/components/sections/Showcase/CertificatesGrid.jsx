// src/components/sections/Showcase/CertificatesGrid.jsx
// Grid 11 sertifikat dengan TiltedCard effect (CSS fallback)
// Filter chip kategori, klik → CertificateModal

import { useState, useCallback } from "react";
import certificates from "@/data/certificates.json";
import CertificateModal from "./CertificateModal";

// Sort: newest first, null date last
const SORTED = [...certificates].sort((a, b) => {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return b.date.localeCompare(a.date);
});

const ALL_CATEGORIES = ["Semua", ...Array.from(new Set(SORTED.map((c) => c.category)))];

// Tilted card: CSS 3D tilt following mouse (disabled on touch)
function TiltedCard({ cert, onClick }) {
  const cardRef = { current: null };

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 16}deg) rotateX(${-y * 12}deg) scale(1.03)`;
    el.style.boxShadow = `${-x * 12}px ${-y * 8}px 32px -8px rgba(128,0,0,0.22)`;
  };

  const handleMouseLeave = (e) => {
    const el = e.currentTarget;
    el.style.transform = "";
    el.style.boxShadow = "0 8px 24px -8px rgba(128,0,0,0.12)";
    el.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1)";
    setTimeout(() => { if (el) el.style.transition = ""; }, 400);
  };

  const formatYear = (d) => {
    if (!d) return "";
    if (d.length === 4 || d.includes("-")) return d.slice(0, 4);
    return d;
  };

  return (
    <button
      aria-label={`Lihat sertifikat: ${cert.title}`}
      id={`cert-card-${cert.id}`}
      onClick={() => onClick(cert.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="text-left group rounded-2xl overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-700"
      style={{
        background: "var(--color-cream-50)",
        border: "1px solid rgba(212,175,55,0.3)",
        boxShadow: "0 8px 24px -8px rgba(128,0,0,0.12)",
        transformStyle: "preserve-3d",
        transition: "transform 0.18s, box-shadow 0.18s",
        cursor: "pointer",
        width: "100%",
      }}
    >
      {/* Thumbnail */}
      <div
        className="w-full overflow-hidden"
        style={{ aspectRatio: "4/3", background: "var(--color-cream-200)" }}
      >
        <img
          src={cert.thumb}
          alt={cert.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          width="320"
          height="240"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        {/* Category + year row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(128,0,0,0.08)",
              color: "var(--color-maroon-700)",
            }}
          >
            {cert.category}
          </span>
          {cert.date && (
            <span className="text-xs" style={{ color: "var(--color-charcoal-500)" }}>
              {formatYear(cert.date)}
            </span>
          )}
        </div>

        <h3
          className="font-display font-bold text-sm leading-snug line-clamp-2"
          style={{ color: "var(--color-charcoal-800)" }}
        >
          {cert.title}
        </h3>
        <p
          className="text-xs mt-1 line-clamp-1"
          style={{ color: "var(--color-charcoal-500)" }}
        >
          {cert.issuer}
        </p>
      </div>
    </button>
  );
}

export default function CertificatesGrid() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [openCertId, setOpenCertId] = useState(null);

  const filtered =
    activeCategory === "Semua"
      ? SORTED
      : SORTED.filter((c) => c.category === activeCategory);

  const handleOpen = useCallback((id) => setOpenCertId(id), []);
  const handleClose = useCallback(() => setOpenCertId(null), []);
  const handleNavigate = useCallback((id) => setOpenCertId(id), []);

  return (
    <div
      id="tabpanel-certificates"
      role="tabpanel"
      aria-labelledby="tab-certificates"
      tabIndex={0}
    >
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter kategori sertifikat">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`filter-cert-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-maroon-700"
            style={{
              background: activeCategory === cat ? "var(--color-maroon-700)" : "var(--color-cream-50)",
              color: activeCategory === cat ? "var(--color-cream-100)" : "var(--color-charcoal-500)",
              border: activeCategory === cat
                ? "1px solid transparent"
                : "1px solid rgba(212,175,55,0.35)",
              transform: activeCategory === cat ? "scale(1.04)" : "",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((cert) => (
          <TiltedCard key={cert.id} cert={cert} onClick={handleOpen} />
        ))}
      </div>

      {/* Modal */}
      {openCertId !== null && (
        <CertificateModal
          certId={openCertId}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
