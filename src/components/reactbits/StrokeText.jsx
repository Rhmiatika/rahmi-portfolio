// src/components/reactbits/StrokeText.jsx
// Sumber: reactbits.dev/text-animations/stroke-text
// Spec STYLING.md §3.2: outline maroon 2px, isi transparan → terisi maroon saat hover/setelah load

import { useEffect, useRef, useState } from "react";

/**
 * StrokeText
 * @param {string} text
 * @param {string} className - class tambahan (untuk font-size, etc.)
 * @param {boolean} filled - jika true, langsung tampil solid (setelah load)
 */
export default function StrokeText({
  text = "",
  className = "",
  filled = false,
  as: Tag = "h1",
}) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // After mount, trigger fill-in animation
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  const isFilled = filled || loaded || hovered;

  return (
    <Tag
      className={`font-display font-bold leading-tight select-none cursor-default ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        WebkitTextStroke: "2px #800000",
        color: isFilled ? "#800000" : "transparent",
        transition: "color 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        paintOrder: "stroke fill",
      }}
    >
      {text}
    </Tag>
  );
}
