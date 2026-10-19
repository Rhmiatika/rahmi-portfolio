// src/components/sections/Showcase/ProjectsGrid.jsx
// Grid 5 proyek — Model Card (macOS window chrome Gambar 2) + Layout Bento (Gambar 3)
// Klik kartu → /projects/:slug

import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

function TagChip({ tag }) {
  return (
    <span className="inline-block text-[11px] sm:text-xs font-medium px-2.5 py-0.5 rounded-lg bg-[#F5EFEB] text-charcoal-700 border border-[#E5DACD] group-hover:border-cream-300 transition-colors">
      {tag}
    </span>
  );
}

function ProjectCard({ project, isFeatured = false }) {
  const hasCover = Boolean(project.cover);
  const coverSrc = hasCover ? project.cover : null;

  return (
    <Link
      to={`/projects/${project.slug}`}
      id={`project-card-${project.slug}`}
      className={`group flex flex-col h-full rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E7DFD5] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-8px_rgba(74,21,27,0.14)] hover:border-maroon-300/60 focus-visible:outline-2 focus-visible:outline-maroon-700 ${
        isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"
      }`}
      style={{
        boxShadow: "0 4px 20px -4px rgba(45,30,20,0.06)",
      }}
    >
      {/* ── Top Bar: macOS Browser / Window Chrome (Gambar 2) ── */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#F7F3EC]/90 border-b border-[#EFE8DF]/90">
        {/* 3 macOS Window Dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-xs" />
        </div>

        {/* Center: Monospaced Local Domain Slug */}
        <span className="font-mono text-[11px] sm:text-xs text-charcoal-400 font-medium tracking-wide truncate px-2">
          {project.domain || `${project.slug}.local`}
        </span>

        {/* Right: Year Badge in Dark Maroon */}
        <span className="inline-flex items-center text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#4A151B] text-[#FFF6EE] shadow-xs tracking-wide shrink-0">
          {project.year}
        </span>
      </div>

      {/* ── Inset Rounded Cover Image Area (Gambar 2) ── */}
      <div className="px-3 sm:px-3.5 pt-3">
        <div
          className={`relative w-full overflow-hidden rounded-xl bg-charcoal-100/40 border border-charcoal-900/5 ${
            isFeatured
              ? "aspect-[16/9] sm:aspect-[16/8.5] lg:aspect-[16/8]"
              : "aspect-[16/10] sm:aspect-[16/9]"
          }`}
        >
          {coverSrc ? (
            <img
              src={coverSrc}
              alt={`Screenshot proyek ${project.title}`}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              width="640"
              height="360"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-cream-100/50">
              <span className="font-display font-bold text-2xl text-maroon-700/30">
                {project.title}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content Area: Serif Title, Description, Tags & Footer ── */}
      <div className="p-4 sm:p-5 pt-3 sm:pt-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Judul: Font Display Serif (Playfair Display) */}
          <h3
            className={`font-display font-bold text-charcoal-900 leading-snug group-hover:text-maroon-700 transition-colors ${
              isFeatured
                ? "text-lg sm:text-xl lg:text-2xl mb-2 line-clamp-2"
                : "text-base sm:text-lg mb-1.5 line-clamp-1"
            }`}
          >
            {project.title}
          </h3>

          {/* Ringkasan */}
          <p
            className={`text-charcoal-600 text-xs sm:text-sm leading-relaxed mb-3 ${
              isFeatured ? "line-clamp-2 sm:line-clamp-3" : "line-clamp-2"
            }`}
          >
            {project.summary}
          </p>

          {/* Tags / Chips */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {project.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        </div>

        {/* Footer: Status Note (Gambar 3) + Lihat Detail (Gambar 2) */}
        <div className="pt-2.5 sm:pt-3 border-t border-[#EFE8DF] flex items-center justify-between gap-2 mt-auto">
          {project.status ? (
            <span className="text-[11px] sm:text-xs text-charcoal-500 font-medium truncate">
              {project.status}
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#6B1A2A] group-hover:text-maroon-900 transition-colors whitespace-nowrap ml-auto">
            <span>Lihat detail</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsGrid() {
  return (
    <div
      id="tabpanel-projects"
      role="tabpanel"
      aria-labelledby="tab-projects"
      tabIndex={0}
    >
      {/* ── Layout Grid: Gambar 3 (Top Row: 2-col + 1-col; Bottom Row: 1-col + 1-col + 1-col) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            isFeatured={i === 0 || Boolean(project.featured)}
          />
        ))}
      </div>
    </div>
  );
}
