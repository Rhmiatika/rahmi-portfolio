// src/components/sections/Showcase/ProjectsGrid.jsx
// Grid 5 proyek — klik → /projects/:slug

import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

function TagChip({ tag }) {
  return (
    <span
      className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full"
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

function ProjectCard({ project, index }) {
  const hasCover = Boolean(project.cover);
  const coverSrc = hasCover ? project.cover : null;

  return (
    <Link
      to={`/projects/${project.slug}`}
      id={`project-card-${project.slug}`}
      className="group block rounded-2xl overflow-hidden focus-visible:outline-2 focus-visible:outline-maroon-700"
      style={{
        background: "var(--color-cream-50)",
        border: "1px solid rgba(212,175,55,0.3)",
        boxShadow: "0 8px 24px -8px rgba(128,0,0,0.12)",
        transition: "transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s cubic-bezier(0.22,1,0.36,1)",
        animationDelay: `${index * 60}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 40px -12px rgba(128,0,0,0.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 8px 24px -8px rgba(128,0,0,0.12)";
      }}
    >
      {/* Cover image */}
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
              className="font-display font-bold text-5xl select-none"
              style={{ color: "rgba(128,0,0,0.08)" }}
              aria-hidden="true"
            >
              {project.year}
            </span>
          </div>
        )}
        {/* Year badge */}
        <span
          className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(128,0,0,0.85)",
            color: "var(--color-cream-100)",
            backdropFilter: "blur(4px)",
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-display font-bold text-base leading-snug mb-2 group-hover:text-maroon-700 transition-colors duration-200"
          style={{ color: "var(--color-charcoal-800)" }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: "var(--color-charcoal-500)" }}
        >
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        {/* CTA arrow */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--color-maroon-700)" }}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
