// src/components/sections/Showcase/PillTabs.jsx
// PillTabs with RubberSegment elastic indicator
// Fallback dari React Bits pill-nav + rubber-segment
// Catatan di NOTES.md: pakai custom implementation karena React Bits
// tidak publish NPM; komponen di-inline sesuai STYLING.md §3.

import { useRef, useState, useLayoutEffect } from "react";

const TABS = [
  { id: "projects",     label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "tech-stack",   label: "Tech Stack" },
];

export default function PillTabs({ activeTab, onTabChange }) {
  const containerRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Measure active tab position for rubber indicator
  useLayoutEffect(() => {
    const el = tabRefs.current[activeTab];
    const container = containerRef.current;
    if (!el || !container) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - containerRect.left,
      width: elRect.width,
    });
  }, [activeTab]);

  const handleChange = (id) => {
    if (id === activeTab || isAnimating) return;
    setIsAnimating(true);
    onTabChange(id);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Portfolio sections"
      className="relative inline-flex items-center p-1 rounded-full"
      style={{
        background: "var(--color-cream-50)",
        border: "1px solid rgba(212,175,55,0.35)",
        boxShadow: "0 4px 16px -4px rgba(128,0,0,0.12)",
      }}
    >
      {/* Rubber elastic indicator */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "0.25rem",
          bottom: "0.25rem",
          left: indicator.left,
          width: indicator.width,
          borderRadius: "9999px",
          background: "var(--color-maroon-700)",
          transition: "left 0.38s cubic-bezier(0.34,1.56,0.64,1), width 0.38s cubic-bezier(0.34,1.56,0.64,1)",
          zIndex: 0,
        }}
      />

      {TABS.map(({ id, label }) => {
        const isActive = id === activeTab;
        return (
          <button
            key={id}
            ref={(el) => (tabRefs.current[id] = el)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${id}`}
            id={`tab-${id}`}
            onClick={() => handleChange(id)}
            className="relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon-700 whitespace-nowrap"
            style={{
              color: isActive ? "var(--color-cream-100)" : "var(--color-charcoal-500)",
              background: "transparent",
              cursor: "pointer",
              border: "none",
              minHeight: "36px",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
