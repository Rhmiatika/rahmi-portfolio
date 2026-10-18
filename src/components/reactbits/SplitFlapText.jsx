// src/components/reactbits/SplitFlapText.jsx
// Sumber: reactbits.dev/text-animations/split-flap-text
// Implementasi: custom (animasi CSS flip + JS timer) — fallback jika CLI gagal
// Papan: cream-50 bg, teks maroon, garis tengah emas tipis

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?-";
const FPS = 24; // flip per detik per karakter

function FlapChar({ target, delay = 0, duration = 150, onDone }) {
  const [display, setDisplay] = useState(" ");
  const [flipping, setFlipping] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(4, Math.round((duration / 1000) * FPS));
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplay(target.toUpperCase());
          setFlipping(false);
          onDone?.();
        } else {
          setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
          setFlipping(true);
        }
      }, 1000 / FPS);
      timerRef.current = interval;
    }, delay);
    return () => {
      clearTimeout(startTimeout);
      clearInterval(timerRef.current);
    };
  }, [target, delay, duration]);

  return (
    <span
      className={`
        inline-flex items-center justify-center
        w-[0.65em] h-[1.2em]
        bg-cream-50 text-maroon-700
        font-display font-bold
        border border-gold-500/30 rounded-sm mx-[1px]
        relative overflow-hidden
        select-none
        ${flipping ? "animate-[flapFlip_0.08s_ease-in-out]" : ""}
      `}
      style={{ fontSize: "inherit" }}
    >
      {/* Garis tengah emas */}
      <span
        className="absolute left-0 right-0 top-1/2 h-px bg-gold-500/50 pointer-events-none"
        aria-hidden="true"
      />
      {display === " " ? "\u00A0" : display}
    </span>
  );
}

/**
 * SplitFlapText
 * @param {string} text - teks yang akan ditampilkan
 * @param {number} charDuration - durasi flip per karakter (ms), default 280
 * @param {number} stagger - jeda antar karakter (ms), default 80
 * @param {function} onComplete - callback setelah semua karakter selesai
 * @param {string} className - class tambahan
 */
export default function SplitFlapText({
  text = "",
  charDuration = 280,
  stagger = 80,
  onComplete,
  className = "",
}) {
  const chars = text.split("");
  const completedRef = useRef(0);

  const handleCharDone = () => {
    completedRef.current++;
    if (completedRef.current >= chars.length) {
      onComplete?.();
    }
  };

  return (
    <span
      className={`inline-flex flex-wrap gap-y-1 ${className}`}
      aria-label={text}
      role="text"
    >
      {chars.map((ch, i) =>
        ch === " " ? (
          <span key={i} className="w-[0.4em] inline-block" aria-hidden="true" />
        ) : (
          <FlapChar
            key={i}
            target={ch}
            delay={i * stagger}
            duration={charDuration}
            onDone={handleCharDone}
          />
        )
      )}
    </span>
  );
}
