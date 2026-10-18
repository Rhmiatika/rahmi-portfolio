// src/components/reactbits/TargetCursor.jsx
// FALLBACK — ReactBits "Target Cursor" tidak tersedia sebagai npm package
// ReactBits = copy-paste library. Implementasi fallback sesuai STYLING.md §3
// Catatan: hanya aktif di perangkat pointer:fine (desktop)

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function TargetCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Hanya render di pointer:fine (desktop/mouse)
  const isPointerFine = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (!isPointerFine) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Dot mengikuti langsung
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const loop = () => {
      // Ring mengikuti smooth (lerp)
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12;
      cursor.style.transform = `translate(${smooth.current.x - 20}px, ${smooth.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    const onEnter = () => { cursor.style.opacity = "1"; dot.style.opacity = "1"; };
    const onLeave = () => { cursor.style.opacity = "0"; dot.style.opacity = "0"; };

    // Kursor besar saat hover link/button
    const onHoverIn = () => cursor.classList.add("scale-150", "border-gold");
    const onHoverOut = () => cursor.classList.remove("scale-150", "border-gold");
    const interactables = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Ring halus */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] w-10 h-10 rounded-full border-2 border-maroon opacity-0 transition-[border-color,transform] duration-200 ease-out"
        aria-hidden="true"
      />
      {/* Dot tengah */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[999] w-2 h-2 rounded-full bg-gold opacity-0"
        aria-hidden="true"
      />
    </>
  );
}
