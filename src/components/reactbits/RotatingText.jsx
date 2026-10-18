// src/components/reactbits/RotatingText.jsx
// Sumber: reactbits.dev/text-animations/rotating-text
// Spec STYLING.md §3.2: interval 2.5s, animasi slide/fade. Butuh motion/react.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * RotatingText
 * @param {string[]} texts - array of strings to rotate
 * @param {number} interval - ms between rotations, default 2500
 * @param {string} className - class tambahan
 */
export default function RotatingText({
  texts = [],
  interval = 2500,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <span
      className={`inline-block overflow-hidden ${className}`}
      style={{ minWidth: "max-content" }}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
