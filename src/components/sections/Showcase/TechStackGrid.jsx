// src/components/sections/Showcase/TechStackGrid.jsx
// Grid logo per grup — kartu persegi kompak ±96px mobile, ±112px desktop
// flex-wrap rata tengah agar tidak ada ruang kosong besar; min 3 per baris di 390px
// Hormati prefers-reduced-motion

import { skillGroups, softSkills, languages } from "@/data/skills";
import { useState } from "react";

// Ukuran kartu tetap: 96px mobile, 112px ≥sm
const CARD_SIZE = "w-24 h-24 sm:w-28 sm:h-28";
const LOGO_SIZE = "w-10 h-10 sm:w-11 sm:h-11";

function SkillLogo({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      role="img"
      aria-label={item.name}
      title={item.name}
      className={[
        "group flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl cursor-default",
        "transition-transform duration-200 motion-reduce:transition-none",
        CARD_SIZE,
      ].join(" ")}
      style={{
        background: "var(--color-cream-50)",
        border: "1px solid rgba(212,175,55,0.28)",
        boxShadow: "0 2px 6px -2px rgba(128,0,0,0.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px) scale(1.04)";
        e.currentTarget.style.boxShadow = "0 10px 20px -6px rgba(128,0,0,0.18)";
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.65)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 2px 6px -2px rgba(128,0,0,0.07)";
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.28)";
      }}
    >
      {/* Logo */}
      <div className={`${LOGO_SIZE} flex items-center justify-center shrink-0`}>
        {!imgError ? (
          <img
            src={item.logo}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain"
            width="44"
            height="44"
            onError={() => setImgError(true)}
          />
        ) : (
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

      {/* Label */}
      <span
        className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight line-clamp-2 w-full px-0.5"
        style={{ color: "var(--color-charcoal-700)" }}
      >
        {item.name}
      </span>
    </div>
  );
}

function GroupSection({ group }) {
  return (
    <div className="mb-8">
      {/* Group label + garis */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em] shrink-0"
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

      {/* Flex-wrap rata tengah — kartu lebar tetap */}
      <div className="flex flex-wrap justify-start gap-3">
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
      <div className="mt-2 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.18em] shrink-0"
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
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold"
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
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.18em] shrink-0"
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
        <div className="flex flex-wrap gap-2.5">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{
                background: "var(--color-cream-50)",
                border: "1px solid rgba(212,175,55,0.35)",
              }}
            >
              <span
                className="font-semibold text-xs sm:text-sm"
                style={{ color: "var(--color-charcoal-800)" }}
              >
                {lang.name}
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
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
