// src/components/reactbits/SpecularButton.jsx
// FALLBACK — reactbits.dev "Specular Button" tidak bisa di-fetch HTML source (CLI only).
// Dibuat custom: specular shine mengikuti kursor mouse, glass-cream look di atas latar maroon.
// Dicatat di NOTES.md sebagai fallback Phase 3.5.

import { useRef } from "react";

/**
 * SpecularButton
 * @param {string} className
 * @param {*} children
 * @param {...*} props - semua props HTML (onClick, type, disabled, etc.)
 */
export default function SpecularButton({
  className = "",
  children,
  disabled = false,
  ...props
}) {
  const btnRef = useRef(null);
  const shineRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    const shine = shineRef.current;
    if (!btn || !shine) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,235,180,0.38) 0%, rgba(255,255,255,0.08) 55%, transparent 80%)`;
  };

  const handleMouseLeave = () => {
    if (shineRef.current) shineRef.current.style.background = "transparent";
  };

  // Ripple on click
  const handleClick = (e) => {
    const btn = btnRef.current;
    if (!btn || disabled) return;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.cssText = `
      width:${diameter}px;height:${diameter}px;
      left:${e.clientX - rect.left - radius}px;
      top:${e.clientY - rect.top - radius}px;
      position:absolute;border-radius:50%;transform:scale(0);pointer-events:none;
      animation:specRipple 0.55s linear;
      background:rgba(255,240,180,0.22);
    `;
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(circle);
    circle.addEventListener("animationend", () => circle.remove());
    props.onClick?.(e);
  };

  return (
    <>
      <style>{`@keyframes specRipple { to { transform: scale(4); opacity: 0; } }`}</style>
      <button
        ref={btnRef}
        disabled={disabled}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={[
          "relative inline-flex items-center justify-center gap-2.5 overflow-hidden",
          "px-8 py-3.5 min-h-[52px] rounded-lg font-sans font-semibold text-base",
          "bg-cream-100 text-maroon-700 border-2 border-cream-100/80",
          "shadow-[0_4px_20px_-4px_rgba(255,245,220,0.35)]",
          "hover:shadow-[0_8px_32px_-4px_rgba(255,245,220,0.55)]",
          "hover:border-cream-100 hover:-translate-y-0.5",
          "transition-all duration-200 active:scale-[0.97] active:translate-y-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-maroon-700",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "cursor-pointer select-none",
          className,
        ].join(" ")}
        {...props}
        onClick={handleClick}
      >
        {/* Specular shine layer */}
        <span
          ref={shineRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg transition-[background] duration-100"
        />
        <span className="relative z-10">{children}</span>
      </button>
    </>
  );
}
