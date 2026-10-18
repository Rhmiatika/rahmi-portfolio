// src/components/layout/GlobalLayer.jsx
// Layer global: background Radient (fixed -z-10), TargetCursor, SwipeToast
// Dipasang sekali di App.jsx

import Radient from "@/components/reactbits/Radient";
import TargetCursor from "@/components/reactbits/TargetCursor";
import SwipeToast from "@/components/reactbits/SwipeToast";

export default function GlobalLayer() {
  return (
    <>
      {/* Background bergerak lambat — fixed, di bawah semua konten */}
      <Radient />

      {/* Custom cursor — hanya desktop (pointer:fine) */}
      <TargetCursor />

      {/* Toast notifications */}
      <SwipeToast />
    </>
  );
}
