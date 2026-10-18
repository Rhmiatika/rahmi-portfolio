// src/components/sections/Splash/Splash.jsx
// PRD.md §2.1 — Overlay fixed z-[100], SplitFlapText per baris, progress bar emas
// Tiga baris flap: "WELCOME TO MY" | "PORTFOLIO" | "WEBSITE" — tidak wrap antar baris
// useScrollLock during splash, sessionStorage.introSeen, prefers-reduced-motion

import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SplitFlapText from "@/components/reactbits/SplitFlapText";

// Tiga baris terpisah agar tidak wrap
const LINE1 = "WELCOME TO MY";
const LINE2 = "PORTFOLIO";
const LINE3 = "WEBSITE";
const SUB_TEXT = "Rahmi Atika · Teknik Informatika";
const MIN_MS = 3200;
const MAX_MS = 6500;

export default function Splash({ onDone }) {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState("line1"); // line1 | line2 | line3 | sub | done
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);
  const startRef = useRef(Date.now());

  useScrollLock(true);

  // Progress bar
  useEffect(() => {
    const duration = prefersReduced ? 1500 : MIN_MS;
    const start = Date.now();
    let raf;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReduced]);

  // Preload GLB
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "fetch";
    link.href = "/assets/models/rahmi.glb";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleDone = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    const elapsed = Date.now() - startRef.current;
    const remaining = Math.max(0, MIN_MS - elapsed);
    setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        sessionStorage.setItem("introSeen", "1");
        onDone?.();
      }, 600);
    }, remaining);
  };

  // Keyboard skip
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" || e.key === "Enter") handleDone();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Phase timing
  useEffect(() => {
    if (prefersReduced) {
      const t = setTimeout(handleDone, 1500);
      return () => clearTimeout(t);
    }
    // line1 chars: 13 × (75ms stagger + 260ms dur) ≈ 1.3s
    const t1 = setTimeout(() => setPhase("line2"), 1100);
    // line2 chars: 9 × stagger ≈ 0.9s
    const t2 = setTimeout(() => setPhase("line3"), 2000);
    // line3 chars: 7 × stagger ≈ 0.7s
    const t3 = setTimeout(() => setPhase("sub"), 2800);
    const t4 = setTimeout(handleDone, MAX_MS);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [prefersReduced]);

  return (
    <div
      className={`
        fixed inset-0 z-[100]
        flex flex-col items-center justify-center
        transition-all duration-600 ease-out
        ${exiting ? "opacity-0 scale-[1.02] pointer-events-none" : "opacity-100 scale-100"}
      `}
      style={{ background: "linear-gradient(135deg, #f5f5dc 0%, #ede8d0 60%, #e8e0c8 100%)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Intro"
    >
      {/* Progress bar emas */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold-500/20">
        <div
          className="h-full bg-gold-500"
          style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
        />
      </div>

      {/* Diagonal accent lines (dekoratif) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-gold-500/15 to-transparent"
            style={{
              height: "120%",
              left: `${15 + i * 14}%`,
              top: "-10%",
              transform: "rotate(12deg)",
            }}
          />
        ))}
      </div>

      {/* ── Konten tengah ── */}
      <div className="relative flex flex-col items-center gap-3 px-6 text-center max-w-4xl w-full">

        {/* Baris 1 */}
        <div className="leading-none">
          {prefersReduced ? (
            <p className="text-xl sm:text-2xl font-display font-bold text-maroon-700 tracking-[0.12em]">
              {LINE1}
            </p>
          ) : (
            <div className="text-[clamp(1rem,3.5vw,1.6rem)]">
              <SplitFlapText
                text={LINE1}
                charDuration={240}
                stagger={68}
              />
            </div>
          )}
        </div>

        {/* Baris 2 — lebih besar, dengan delay */}
        <div
          className={`leading-none transition-all duration-500 ${
            phase === "line1" && !prefersReduced
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          }`}
        >
          {prefersReduced ? (
            <p className="text-4xl sm:text-5xl font-display font-bold text-maroon-700 tracking-[0.06em]">
              {LINE2}
            </p>
          ) : (
            <div className="text-[clamp(2rem,7vw,4rem)] font-bold">
              <SplitFlapText
                text={LINE2}
                charDuration={280}
                stagger={90}
              />
            </div>
          )}
        </div>

        {/* Baris 3 */}
        <div
          className={`leading-none transition-all duration-500 ${
            (phase === "line1" || phase === "line2") && !prefersReduced
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          }`}
        >
          {prefersReduced ? (
            <p className="text-2xl sm:text-3xl font-display font-bold text-maroon-700 tracking-[0.12em]">
              {LINE3}
            </p>
          ) : (
            <div className="text-[clamp(1.4rem,4.5vw,2.2rem)]">
              <SplitFlapText
                text={LINE3}
                charDuration={240}
                stagger={72}
              />
            </div>
          )}
        </div>

        {/* Garis emas */}
        <div className="flex items-center gap-4 mt-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500" />
        </div>

        {/* Sub-baris */}
        <div
          className={`transition-all duration-700 ease-out ${
            phase === "sub" || phase === "done" || prefersReduced
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <p className="text-base sm:text-lg font-display text-maroon-700 font-semibold tracking-wide">
            {SUB_TEXT}
          </p>
        </div>
      </div>

      {/* Tombol Lewati */}
      <button
        id="splash-skip"
        onClick={handleDone}
        className="
          absolute bottom-8 right-8
          text-sm text-charcoal-500 hover:text-maroon-700
          transition-colors duration-200
          flex items-center gap-1.5
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded
          group
        "
        aria-label="Lewati intro"
      >
        <span>Lewati</span>
        <span className="group-hover:translate-x-0.5 transition-transform">›</span>
      </button>
    </div>
  );
}


