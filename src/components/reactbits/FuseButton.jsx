// src/components/reactbits/FuseButton.jsx
// Sumber: reactbits.dev/components/fuse-button
// Spec STYLING.md §3.4: primer = isi maroon / teks cream; outline = border maroon
// Tinggi min 48px (aksesibilitas sentuh)

import { useRef } from "react";

/**
 * FuseButton
 * @param {"primary"|"outline"} variant
 * @param {"md"|"lg"} size
 * @param {string} as - tag HTML atau komponen, default "button"
 * @param {string} className
 * @param {*} children
 * @param {...*} props - semua props HTML (href, download, onClick, etc.)
 */
export default function FuseButton({
  variant = "primary",
  size = "md",
  as: Tag = "button",
  className = "",
  children,
  ...props
}) {
  const btnRef = useRef(null);

  // Fuse spark effect: ripple on click
  const handleClick = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.cssText = `
      width: ${diameter}px; height: ${diameter}px;
      left: ${e.clientX - rect.left - radius}px;
      top: ${e.clientY - rect.top - radius}px;
      position: absolute; border-radius: 50%; transform: scale(0);
      animation: fuseRipple 0.55s linear;
      background: rgba(255,255,255,0.28); pointer-events: none;
    `;
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(circle);
    circle.addEventListener("animationend", () => circle.remove());
    props.onClick?.(e);
  };

  const base =
    "inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 cursor-pointer";

  const sizes = {
    md: "px-5 py-2.5 text-sm min-h-[44px]",
    lg: "px-7 py-3 text-base min-h-[52px]",
  };

  const variants = {
    primary:
      "bg-maroon-700 text-cream-100 hover:bg-maroon-600 shadow-[0_4px_14px_-4px_rgba(128,0,0,0.5)] hover:shadow-[0_6px_20px_-4px_rgba(128,0,0,0.65)] active:scale-[0.97]",
    outline:
      "border-2 border-maroon-700 text-maroon-700 bg-transparent hover:bg-maroon-700 hover:text-cream-100 active:scale-[0.97]",
    "outline-cream":
      "border-2 border-cream-100 text-cream-100 bg-transparent hover:bg-cream-100 hover:text-maroon-700 active:scale-[0.97]",
  };

  return (
    <>
      <style>{`@keyframes fuseRipple { to { transform: scale(4); opacity: 0; } }`}</style>
      <Tag
        ref={btnRef}
        className={`${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.primary} ${className}`}
        {...props}
        onClick={handleClick}
      >
        {children}
      </Tag>
    </>
  );
}
