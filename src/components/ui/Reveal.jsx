// src/components/ui/Reveal.jsx
// Wrapper reveal animasi untuk tiap seksi
// Menggunakan IntersectionObserver — animasi sekali saja (tidak berulang)
// Menghormati prefers-reduced-motion

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * @param {string} className - kelas tambahan
 * @param {"up"|"down"|"left"|"right"|"fade"} direction - arah entrance
 * @param {number} delay - delay dalam ms
 */
export default function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.05,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced, threshold]);

  const translate = {
    up:    "translateY(32px)",
    down:  "translateY(-32px)",
    left:  "translateX(32px)",
    right: "translateX(-32px)",
    fade:  "none",
  }[direction] ?? "translateY(32px)";

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate(0)" : translate,
    transition: reduced
      ? "none"
      : `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
