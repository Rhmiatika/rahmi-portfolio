// src/components/sections/Showcase/TechStackGrid.jsx
// Grid logo per grup (Office & Workspace, Design & Video, Web, Data & Security)
// Soft skills chips + language chips

import { skillGroups, softSkills, languages } from "@/data/skills";
import { useState } from "react";

function SkillLogo({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group flex flex-col items-center gap-2 p-4 rounded-2xl cursor-default transition-all duration-200"
      style={{
        background: "var(--color-cream-50)",
        border: "1px solid rgba(212,175,55,0.25)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.06)";
        e.currentTarget.style.boxShadow = "0 16px 32px -8px rgba(128,0,0,0.18)";
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
      }}
    >
      {!imgError ? (
        <img
          src={item.logo}
          alt={item.name}
          className="w-10 h-10 object-contain"
          width="40"
          height="40"
          onError={() => setImgError(true)}
        />
      ) : (
        // Text fallback if logo missing
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
          style={{
            background: "var(--color-maroon-700)",
            color: "var(--color-cream-100)",
          }}
        >
          {item.name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span
        className="text-xs font-semibold text-center leading-tight"
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

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
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
