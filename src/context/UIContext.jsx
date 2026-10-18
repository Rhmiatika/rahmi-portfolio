// src/context/UIContext.jsx
// Global state: contactOpen, introDone (sessionStorage), soundOn (localStorage)
// Satu Context kecil sesuai PRD §3.4 — tidak perlu Redux/Zustand

import { createContext, useContext, useState, useEffect } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [contactOpen, setContactOpen] = useState(false);

  // Persist: sessionStorage ("1" artinya intro sudah selesai sesi ini)
  const [introDone, setIntroDoneState] = useState(
    () => sessionStorage.getItem("introSeen") === "1"
  );
  const setIntroDone = (val) => {
    setIntroDoneState(val);
    if (val) sessionStorage.setItem("introSeen", "1");
  };

  // Persist: localStorage (default off — "1" artinya on)
  const [soundOn, setSoundOnState] = useState(
    () => localStorage.getItem("soundOn") === "1"
  );
  const setSoundOn = (val) => {
    setSoundOnState(val);
    localStorage.setItem("soundOn", val ? "1" : "0");
  };

  return (
    <UIContext.Provider
      value={{ contactOpen, setContactOpen, introDone, setIntroDone, soundOn, setSoundOn }}
    >
      {children}
    </UIContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
