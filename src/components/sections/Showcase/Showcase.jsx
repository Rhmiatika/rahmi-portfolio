// src/components/sections/Showcase/Showcase.jsx
// Main Showcase section — PillTabs + AnimatePresence-like tab switching
// Tab state managed via URL (?tab=projects|certificates|tech-stack) + useSearchParams

import { useSearchParams } from "react-router-dom";
import { Suspense, lazy, useRef, useEffect, useState } from "react";
import PillTabs from "./PillTabs";

// Lazy-load tab panels for code splitting
const ProjectsGrid    = lazy(() => import("./ProjectsGrid"));
const CertificatesGrid = lazy(() => import("./CertificatesGrid"));
const TechStackGrid   = lazy(() => import("./TechStackGrid"));

const VALID_TABS = ["projects", "certificates", "tech-stack"];

function TabFallback() {
  return (
    <div className="flex items-center justify-center py-24">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "var(--color-maroon-700)", borderTopColor: "transparent" }}
      />
    </div>
  );
}

// Tab panel with fade+slide enter animation
function TabPanel({ children, tabKey }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [tabKey]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  );
}

export default function Showcase() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(rawTab) ? rawTab : "projects";
  const sectionRef = useRef(null);

  const handleTabChange = (id) => {
    setSearchParams({ tab: id }, { replace: true, preventScrollReset: true });
  };

  // Scroll reveal using IntersectionObserver
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="py-20 md:py-28 px-5 sm:px-8"
      style={{
        background: "var(--color-cream-200)",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: "var(--color-maroon-700)" }}
          >
            Portfolio
          </p>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{ color: "var(--color-charcoal-800)" }}
          >
            Karya & Keahlian
          </h2>
          {/* Gold accent line */}
          <div
            className="h-0.5 rounded-full mb-8"
            style={{ width: "3rem", background: "var(--color-gold-500)" }}
            aria-hidden="true"
          />
        </div>

        {/* PillTabs navigation */}
        <div className="flex justify-center sm:justify-start mb-10">
          <PillTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {/* Tab panel */}
        <Suspense fallback={<TabFallback />}>
          <TabPanel key={activeTab} tabKey={activeTab}>
            {activeTab === "projects" && <ProjectsGrid />}
            {activeTab === "certificates" && <CertificatesGrid />}
            {activeTab === "tech-stack" && <TechStackGrid />}
          </TabPanel>
        </Suspense>
      </div>
    </section>
  );
}
