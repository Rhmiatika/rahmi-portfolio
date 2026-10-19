// src/components/reactbits/TargetCursor.jsx
// Custom target cursor (ring luar + dot tengah)
// Memperbaiki bug lingkaran memisah saat hover button (mengintegrasikan scale langsung ke transform loop)
// Hanya aktif di perangkat pointer:fine (desktop/mouse)

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function TargetCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const rafRef = useRef(null);

  // Hanya render di pointer:fine (desktop/mouse)
  const isPointerFine = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (!isPointerFine) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Sembunyikan kursor bawaan OS
    document.documentElement.style.cursor = "none";

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Dot di tengah kursor (ukuran 8px -> offset -4px)
      dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    };

    const loop = () => {
      // Ring mengikuti pergerakan dengan smoothing LERP
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.18;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.18;

      // Scale membesar halus saat hover tanpa memisahkan posisi titik tengah
      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.15;

      // Posisi tengah ring (ukuran 40px -> offset -20px) + scale
      cursor.style.transform = `translate3d(${smooth.current.x - 20}px, ${smooth.current.y - 20}px, 0) scale(${scaleRef.current})`;

      rafRef.current = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      cursor.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
      dot.style.opacity = "0";
    };

    // Event delegation untuk semua elemen interaktif (button, link, input, cursor-pointer)
    const handleMouseOver = (e) => {
      const interactiveEl = e.target.closest(
        "a, button, [role='button'], [role='tab'], input, textarea, select, label, .cursor-pointer, [data-interactive]"
      );
      if (interactiveEl) {
        targetScaleRef.current = 1.35;
        cursor.style.borderColor = "var(--color-gold, #C9A84C)";
      } else {
        targetScaleRef.current = 1.0;
        cursor.style.borderColor = "var(--color-maroon, #6B1A2A)";
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Ring luar (40x40px) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] w-10 h-10 rounded-full border-2 border-maroon opacity-0 will-change-transform"
        style={{
          transition: "border-color 0.2s ease, opacity 0.2s ease",
        }}
        aria-hidden="true"
      />
      {/* Dot kuning/emas tengah (8x8px) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] w-2 h-2 rounded-full bg-gold opacity-0 will-change-transform"
        style={{
          transition: "opacity 0.2s ease",
        }}
        aria-hidden="true"
      />
    </>
  );
}
