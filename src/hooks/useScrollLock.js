// src/hooks/useScrollLock.js
// Lock/unlock body scroll — dipakai oleh Modal dan Splash
import { useEffect } from "react";

/**
 * @param {boolean} locked - true berarti scroll dikunci
 */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
