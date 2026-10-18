// src/hooks/useCanUse3D.js
// Deteksi apakah perangkat mendukung WebGL dan bukan perangkat lemah
// Dipakai untuk memutuskan: render Lanyard/ModelViewer atau fallback gambar statis

import { useMemo } from "react";
import { useMediaQuery } from "./useMediaQuery";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * @returns {boolean} true jika aman render 3D
 */
export function useCanUse3D() {
  // Pointer: fine → desktop / mouse. Pointer: coarse → touch/mobile
  const isPointerFine = useMediaQuery("(pointer: fine)");

  const supported = useMemo(() => {
    if (typeof window === "undefined") return false;
    // Deteksi device memory (Chrome-only, fallback undefined = asumsikan ok)
    const mem = navigator.deviceMemory ?? 4;
    return hasWebGL() && mem >= 2;
  }, []);

  // Di mobile (touch/coarse) → default fallback untuk performa
  // Bisa di-override nanti jika user klik "Aktifkan 3D"
  return supported && isPointerFine;
}
