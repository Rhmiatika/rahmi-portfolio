// src/components/sections/Showcase/Showcase.jsx
// Main Showcase section — PillTabs + AnimatePresence-like tab switching
// Tab state managed via URL (?tab=projects|certificates|tech-stack) + useSearchParams

import { useSearchParams } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import PillTabs from "./PillTabs";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

// Lazy-load tab panels for code splitting
const ProjectsGrid     = lazy(() => import("./ProjectsGrid"));
const CertificatesGrid = lazy(() => import("./CertificatesGrid"));
const TechStackGrid    = lazy(() => import("./TechStackGrid"));

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

  const handleTabChange = (id) => {
    setSearchParams({ tab: id }, { replace: true, preventScrollReset: true });
  };

  return (
    <section
      id="showcase"
      className="relative pt-0 sm:pt-2 pb-20 sm:pb-28 overflow-hidden"
      aria-label="Portofolio — Rahmi Atika"
    >
      {/* Background decoration — matches About section ambient flow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 90% 40%, rgba(180,20,20,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 10% 60%, rgba(212,175,55,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="portfolio-container relative z-10">
        {/* Section Heading — matches About */}
        <SectionHeading
          eyebrow="Portofolio"
          title="Karya & Keahlian"
        />

        {/* PillTabs navigation */}
        <div className="flex justify-start mb-8 sm:mb-10">
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

