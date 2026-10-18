// src/components/sections/Showcase/TechStackGrid.jsx
// Grid logo per grup (Office & Workspace, Design & Video, Web, Data & Security)
// Soft skills chips + language chips

import { skillGroups, softSkills, languages } from "@/data/skills";
import { useState } from "react";

function SkillLogo({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group aspect-square flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl cursor-default transition-all duration-200"
      style={{
        background: "var(--color-cream-50)",
        border: "1px solid rgba(212,175,55,0.25)",
        boxShadow: "0 2px 8px -2px rgba(128,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 24px -6px rgba(128,0,0,0.16)";
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 2px 8px -2px rgba(128,0,0,0.06)";
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
      }}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center mb-1.5 transition-transform duration-200 group-hover:scale-110">
        {!imgError ? (
          <img
            src={item.logo}
            alt={item.name}
            className="w-full h-full object-contain"
            width="40"
            height="40"
            onError={() => setImgError(true)}
          />
        ) : (
          // Text fallback if logo missing
          <div
            className="w-full h-full rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background: "var(--color-maroon-700)",
              color: "var(--color-cream-100)",
            }}
          >
            {item.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <span
        className="text-[11px] sm:text-xs font-semibold text-center leading-tight line-clamp-2 px-1"
        style={{ color: "var(--color-charcoal-800)" }}
      >
        {item.name}
      </span>
    </div>
  );
}

function GroupSection({ group }) {
  return (
    <div className="mb-10">
      {/* Group label */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: "var(--color-maroon-700)" }}
        >
          {group.label}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "rgba(212,175,55,0.3)" }}
          aria-hidden="true"
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
        {group.items.map((item) => (
          <SkillLogo key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechStackGrid() {
  return (
    <div
      id="tabpanel-tech-stack"
      role="tabpanel"
      aria-labelledby="tab-tech-stack"
      tabIndex={0}
    >
      {/* Skill groups */}
      {skillGroups.map((group) => (
        <GroupSection key={group.id} group={group} />
      ))}

      {/* Soft skills */}
      <div className="mt-2 mb-8">
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-maroon-700)" }}
          >
            Soft Skills
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(212,175,55,0.3)" }}
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "var(--color-cream-50)",
                border: "1px solid rgba(128,0,0,0.18)",
                color: "var(--color-charcoal-800)",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-maroon-700)" }}
          >
            Bahasa
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(212,175,55,0.3)" }}
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "var(--color-cream-50)",
                border: "1px solid rgba(212,175,55,0.35)",
              }}
            >
              <span
                className="font-semibold text-sm"
                style={{ color: "var(--color-charcoal-800)" }}
              >
                {lang.name}
              </span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--color-maroon-700)",
                  color: "var(--color-cream-100)",
                }}
              >
                {lang.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
