// src/components/sections/Splash/Splash.jsx
// PRD.md §2.1 — Overlay fixed z-[100], SplitFlapText, progress bar, Lewati button
// Timeline: 0–2.6s flap, 2.6–3.4s sub-baris fade, 3.4–4s fade-out overlay
// useScrollLock during splash, sessionStorage.introSeen, prefers-reduced-motion

import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SplitFlapText from "@/components/reactbits/SplitFlapText";

const SPLASH_TEXT = "Welcome to my portfolio website";
const SUB_TEXT = "Rahmi Atika · Informatics Engineer";
const TAGLINE = "Merapikan data, mendigitalkan proses.";
const MIN_MS = 3000;
const MAX_MS = 6000;

export default function Splash({ onDone }) {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState("flap"); // flap | sub | done
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);
  const startRef = useRef(Date.now());

  useScrollLock(true);

  // Progress bar animation
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

  // Preload rahmi.glb
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
      }, 500);
    }, remaining);
  };

  // Keyboard skip: Esc or Enter
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" || e.key === "Enter") handleDone();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Auto-advance phases
  useEffect(() => {
    if (prefersReduced) {
      // Reduced motion: static text, 1.5s
      const t = setTimeout(handleDone, 1500);
      return () => clearTimeout(t);
    }

    // Normal: flap (2.6s) → sub (0.8s) → auto-done at MAX_MS
    const t1 = setTimeout(() => setPhase("sub"), 2600);
    const t2 = setTimeout(() => setPhase("done"), 3400);
    const t3 = setTimeout(handleDone, MAX_MS);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [prefersReduced]);

  const overlayClass = `
    fixed inset-0 z-[100]
    flex flex-col items-center justify-center
    bg-cream-200
    transition-all duration-500 ease-out
    ${exiting ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}
  `;

  return (
    <div className={overlayClass} role="dialog" aria-modal="true" aria-label="Intro">
      {/* Progress bar emas */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-500/20">
        <div
          className="h-full bg-gold-500 transition-none"
          style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
        />
      </div>

      {/* Konten tengah */}
      <div className="flex flex-col items-center gap-6 px-6 text-center max-w-3xl">
        {/* Baris utama: SplitFlapText atau teks statis */}
        {prefersReduced ? (
          <p className="text-2xl sm:text-4xl font-display font-bold text-maroon-700">
            {SPLASH_TEXT}
          </p>
        ) : (
          <div className="text-2xl sm:text-3xl md:text-4xl leading-relaxed">
            <SplitFlapText
              text={SPLASH_TEXT.toUpperCase()}
              charDuration={260}
              stagger={75}
              onComplete={() => setPhase((p) => (p === "flap" ? "sub" : p))}
            />
          </div>
        )}

        {/* Sub-baris */}
        <div
          className={`transition-all duration-700 ease-out ${
            phase === "sub" || phase === "done" || prefersReduced
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <p className="text-lg sm:text-xl font-display text-maroon-700 font-semibold">
            {SUB_TEXT}
          </p>
          <p className="text-sm text-charcoal-500 mt-1 italic">{TAGLINE}</p>
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
          flex items-center gap-1
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded
        "
        aria-label="Lewati intro"
      >
        Lewati ›
      </button>
    </div>
  );
}
