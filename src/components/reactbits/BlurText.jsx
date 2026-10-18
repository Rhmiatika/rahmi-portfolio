// src/components/reactbits/BlurText.jsx
// Teks tampil kata-per-kata dengan efek blur-fade masuk saat masuk viewport
// Trigger sekali saja via IntersectionObserver
// Menghormati prefers-reduced-motion

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * @param {string}   text      - teks yang ditampilkan
 * @param {string}   className - kelas tambahan pada wrapper
 * @param {number}   delay     - delay awal animasi keseluruhan (ms)
 * @param {number}   stepMs    - jeda antar kata (ms)
 * @param {string}   as        - elemen wrapper ("p", "span", "h2", …)
 */
export default function BlurText({
  text = "",
  className = "",
  delay = 0,
  stepMs = 60,
  as: Tag = "p",
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  const words = text.split(" ");

  if (reduced) {
    return <Tag ref={ref} className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline">
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              opacity: visible ? 1 : 0,
              filter: visible ? "blur(0px)" : "blur(8px)",
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: reduced
                ? "none"
                : `opacity 0.5s ease ${delay + i * stepMs}ms, filter 0.5s ease ${delay + i * stepMs}ms, transform 0.5s ease ${delay + i * stepMs}ms`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
