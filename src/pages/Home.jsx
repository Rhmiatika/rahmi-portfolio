// src/pages/Home.jsx
// Halaman utama: Splash → Hero → About → Showcase → Contact + Footer
// Phase 3.1 ✓ | Phase 3.2 ✓ | Phase 3.3 ✓ (About) | Phase 3.4 ✓ (Showcase) | Phase 3.5 ✓ (Contact)

import { useState } from "react";
import { useUI } from "@/context/UIContext";
import Splash from "@/components/sections/Splash/Splash";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Showcase from "@/components/sections/Showcase/Showcase";
import Contact from "@/components/sections/Contact/Contact";
import ContactModal from "@/components/sections/Contact/ContactModal";
import CallChip from "@/components/reactbits/CallChip";

// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const { setIntroDone } = useUI();

  // Cek sessionStorage saat mount, atau paksa tampil jika ?splash=1
  const [splashVisible, setSplashVisible] = useState(
    () =>
      new URLSearchParams(window.location.search).has("splash") ||
      sessionStorage.getItem("introSeen") !== "1"
  );

  const handleIntroDone = () => {
    setSplashVisible(false);
    setIntroDone(true);
  };

  return (
    <>
      {/* Splash — hanya jika belum pernah dilihat sesi ini */}
      {splashVisible && <Splash onDone={handleIntroDone} />}

      {/* Navbar — selalu tampil (di atas Hero) */}
      <Navbar />

      {/* Main content */}
      <main id="home" className="min-h-screen">
        <Hero />
        <About />
        <Showcase />
        <Contact />
      </main>

      {/* Modal kontak — dipicu dari Hero, Contact, dan CallChip */}
      <ContactModal />

      {/* CallChip — FAB fixed bottom-right, sembunyi saat #contact terlihat */}
      <CallChip />
    </>
  );
}
