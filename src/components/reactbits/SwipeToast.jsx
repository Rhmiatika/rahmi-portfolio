// src/components/reactbits/SwipeToast.jsx
// FALLBACK — ReactBits "Swipe Toast" notification system
// Menampilkan antrian toast dari ToastContext — dismiss dengan swipe atau klik ✕

import { useRef } from "react";
import { useToast } from "@/context/ToastContext";

const typeStyles = {
  success: "border-l-4 border-green-500 bg-cream text-maroon",
  error:   "border-l-4 border-red-500 bg-cream text-maroon",
  info:    "border-l-4 border-gold bg-cream text-maroon",
};

const typeIcon = {
  success: "✓",
  error:   "✕",
  info:    "ℹ",
};

function Toast({ toast, onDismiss }) {
  const startX = useRef(0);
  const el = useRef(null);

  const onPointerDown = (e) => { startX.current = e.clientX; };
  const onPointerUp = (e) => {
    if (Math.abs(e.clientX - startX.current) > 60) onDismiss(toast.id);
  };

  return (
    <div
      ref={el}
      role="alert"
      aria-live="polite"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className={[
        "flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg cursor-grab select-none",
        "animate-[toast-in_0.3s_ease]",
        typeStyles[toast.type] ?? typeStyles.info,
      ].join(" ")}
    >
      <span className="text-lg leading-none mt-0.5 font-bold">
        {typeIcon[toast.type] ?? "ℹ"}
      </span>
      <p className="flex-1 text-sm font-medium leading-snug">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-auto text-maroon/60 hover:text-maroon transition-colors text-lg leading-none"
        aria-label="Tutup notifikasi"
      >
        ×
      </button>
    </div>
  );
}

export default function SwipeToast() {
  const { toasts, dismiss } = useToast();

  return (
    <>
      {/* CSS animation keyframe */}
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Container pojok kanan bawah */}
      <div
        className="fixed bottom-6 right-6 z-[95] flex flex-col gap-2 w-80 max-w-[calc(100vw-24px)]"
        aria-label="Notifikasi"
      >
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </>
  );
}
