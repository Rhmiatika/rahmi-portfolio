// src/components/reactbits/CountUp.jsx
// Angka naik dari 0 ke `end` saat masuk viewport (sekali saja)
// Menghormati prefers-reduced-motion

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * @param {number}  end       - nilai akhir
 * @param {number}  decimals  - jumlah desimal (default 0)
 * @param {number}  duration  - durasi animasi ms (default 1800)
 * @param {string}  suffix    - teks setelah angka (contoh: "%")
 * @param {string}  prefix    - teks sebelum angka
 */
export default function CountUp({
  end,
  decimals = 0,
  duration = 1800,
  suffix = "",
  prefix = "",
  className = "",
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [count, setCount] = useState(reduced ? end : 0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduced) { setCount(end); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced, started, end]);

  useEffect(() => {
    if (!started || reduced) return;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-quad
      const eased = 1 - (1 - progress) ** 2;
      setCount(+(eased * end).toFixed(decimals));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration, decimals, reduced]);

  const display = decimals > 0
    ? count.toFixed(decimals)
    : Math.round(count).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
