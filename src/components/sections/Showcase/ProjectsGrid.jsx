// src/components/sections/Showcase/ProjectsGrid.jsx
// Grid 5 proyek — klik → /projects/:slug (Compact layout)

import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

function TagChip({ tag }) {
  return (
    <span
      className="inline-block text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{
        background: "rgba(128,0,0,0.06)",
        color: "var(--color-maroon-700)",
        border: "1px solid rgba(128,0,0,0.12)",
      }}
    >
      {tag}
    </span>
  );
}

function ProjectCard({ project, index }) {
  const hasCover = Boolean(project.cover);
  const coverSrc = hasCover ? project.cover : null;

  return (
    <Link
      to={`/projects/${project.slug}`}
      id={`project-card-${project.slug}`}
      className="group block rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline-maroon-700 transition-all duration-200"
      style={{
        background: "var(--color-cream-50)",
        border: "1px solid rgba(212,175,55,0.25)",
        boxShadow: "0 4px 16px -4px rgba(128,0,0,0.08)",
        animationDelay: `${index * 50}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 28px -8px rgba(128,0,0,0.18)";
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.55)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 4px 16px -4px rgba(128,0,0,0.08)";
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
      }}
    >
      {/* Cover image (compact aspect ratio) */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9", background: "var(--color-cream-200)" }}
      >
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={`Screenshot proyek ${project.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width="640"
            height="360"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className="font-bold text-4xl select-none"
              style={{ color: "rgba(128,0,0,0.08)" }}
              aria-hidden="true"
            >
              {project.year}
            </span>
          </div>
        )}
        {/* Year badge */}
        <span
          className="absolute top-2.5 right-2.5 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(128,0,0,0.85)",
            color: "var(--color-cream-100)",
            backdropFilter: "blur(4px)",
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Content — compact padding */}
      <div className="p-3.5 sm:p-4">
        <h3
          className="font-bold text-sm sm:text-base leading-snug mb-1 group-hover:text-maroon-700 transition-colors duration-200 line-clamp-1"
          style={{ color: "var(--color-charcoal-800)" }}
        >
          {project.title}
        </h3>
        <p
          className="text-xs text-charcoal-500 leading-relaxed mb-2.5 line-clamp-2"
        >
          {project.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        {/* CTA link */}
        <div
          className="mt-2.5 pt-2 flex items-center gap-1 text-[11px] sm:text-xs font-semibold"
          style={{
            color: "var(--color-maroon-700)",
            borderTop: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          Lihat detail
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

