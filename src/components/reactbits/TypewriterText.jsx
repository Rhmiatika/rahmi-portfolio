// src/components/reactbits/TypewriterText.jsx
// Animasi ketikan (typewriter effect) dengan reloop dinamis & cursor berkedip

import { useEffect, useState } from "react";

/**
 * TypewriterText
 * @param {string} text - Teks yang akan diketik
 * @param {string} className - Kelas CSS tambahan
 * @param {string} as - Tag HTML yang digunakan (default: "h1")
 * @param {number} typingSpeed - Kecepatan ketik (ms/karakter)
 * @param {number} deletingSpeed - Kecepatan hapus backspace (ms/karakter)
 * @param {number} pauseDelay - Waktu jeda setelah selesai mengetik sebelum reloop (ms)
 * @param {number} restartDelay - Waktu jeda setelah terhapus sebelum mengetik ulang (ms)
 * @param {boolean} cursor - Tampilkan kursor berkedip
 * @param {object} style - Inline style
 */
export default function TypewriterText({
  text = "",
  className = "",
  as: Tag = "h1",
  typingSpeed = 110,
  deletingSpeed = 45,
  pauseDelay = 3500, // Pause 3.5 detik agar pengguna nyaman membaca nama
  restartDelay = 600,
  cursor = true,
  style = {},
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Dukungan prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayedText(text);
      return;
    }

    let timer;

    if (isPaused) {
      timer = setTimeout(
        () => {
          setIsPaused(false);
          setIsDeleting((prev) => !prev);
        },
        isDeleting ? restartDelay : pauseDelay
      );
      return () => clearTimeout(timer);
    }

    if (!isDeleting) {
      if (displayedText.length < text.length) {
        timer = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Teks selesai diketik sempurna -> Berhenti sejenak (pause) sebelum reloop
        setIsPaused(true);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        // Teks selesai terhapus -> Berhenti sejenak lalu mulai ketik lagi
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    isPaused,
    text,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    restartDelay,
  ]);

  return (
    <Tag
      className={`font-display font-bold leading-[0.98] tracking-[0.035em] select-none cursor-default relative inline-block ${className}`}
      style={{
        WebkitTextStroke: "2px #800000",
        color: "#800000",
        paintOrder: "stroke fill",
        ...style,
      }}
    >
      {/* Invisible placeholder untuk mencegah Layout Shift (CLS) saat teks sedang diketik/dihapus */}
      <span className="invisible opacity-0 select-none pointer-events-none whitespace-nowrap" aria-hidden="true">
        {text}
      </span>

      {/* Teks animasi ketikan sebenarnya */}
      <span className="absolute left-0 top-0 whitespace-nowrap">
        {displayedText}
        {cursor && (
          <span
            className="hero-cursor animate-pulse"
            aria-hidden="true"
          />
        )}
      </span>
    </Tag>
  );
}
