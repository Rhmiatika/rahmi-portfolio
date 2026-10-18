// src/context/ToastContext.jsx
// Antrian toast global: max 3, auto-dismiss 3 s
// API: toast.show({ type: "success"|"error"|"info", message: string })

import { createContext, useContext, useState, useCallback, useRef } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    ({ type = "info", message }) => {
      const id = ++counterRef.current;
      setToasts((prev) => {
        // Batasi antrian maks 3
        const next = [...prev, { id, type, message }];
        return next.length > 3 ? next.slice(next.length - 3) : next;
      });
      // Auto-dismiss setelah 3 detik
      setTimeout(() => dismiss(id), 3000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, show, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
