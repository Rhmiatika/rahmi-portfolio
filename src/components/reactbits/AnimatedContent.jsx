// src/components/reactbits/AnimatedContent.jsx
// FALLBACK — ReactBits "Animated Content" (entrance reveal wrapper)
// Sesuai STYLING.md §3: fade-up dengan spring easing

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * @param {number} distance - jarak slide dalam px (default 40)
 * @param {number} delay - delay ms (default 0)
 * @param {"up"|"down"|"left"|"right"} direction
 */
export default function AnimatedContent({
  children,
  distance = 40,
  delay = 0,
  direction = "up",
  threshold = 0.1,
  className = "",
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced, threshold]);

  const axis = {
    up:    [0, distance],
    down:  [0, -distance],
    left:  [distance, 0],
    right: [-distance, 0],
  }[direction] ?? [0, distance];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate(0,0)"
          : `translate(${axis[0]}px, ${axis[1]}px)`,
        transition: reduced
          ? "none"
          : `opacity 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms,
             transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
