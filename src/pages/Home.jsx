// src/pages/Home.jsx
// Halaman utama: Splash → Hero → About → [Showcase stub] → Contact
// Phase 3.1 ✓ | Phase 3.2 ✓ | Phase 3.3 ✓ (About) | Phase 3.4 stub

import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useUI } from "@/context/UIContext";
import Splash from "@/components/sections/Splash/Splash";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";

// ── Placeholder stubs untuk seksi berikutnya ─────────────────────────────────

function ShowcaseStub() {
  return (
    <section id="showcase" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto">
      <p className="text-charcoal-500 text-sm italic">[Showcase — Phase 3.4]</p>
    </section>
  );
}

function ContactStub({ show }) {
  return (
    <section id="contact" className="py-24 px-5 sm:px-8 bg-maroon-700 text-cream-100">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-300 mb-3">Let's work together</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream-100 mb-5">
          Mari bangun alur kerja yang lebih rapi, bersama.
        </h2>
        <p className="text-cream-100/80 max-w-lg mx-auto mb-8 leading-relaxed">
          Sedang mencari tim administrasi, pengarsipan digital, atau data
          management yang teliti, komunikatif, dan cepat belajar? Saya siap berkontribusi.
        </p>
        <a
          href="https://wa.me/6281386426793"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2 px-8 py-3.5 min-h-[52px]
            border-2 border-cream-100 text-cream-100 rounded-lg
            font-semibold text-base transition-all duration-200
            hover:bg-cream-100 hover:text-maroon-700 active:scale-[0.97]
          "
        >
          Mulai Percakapan
        </a>
        <p className="mt-5 text-cream-100/60 text-sm">
          Atau{" "}
          <button
            className="underline hover:text-cream-100 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText("rahmiatika231@gmail.com");
              show({ type: "success", message: "Email disalin ✓" });
            }}
          >
            salin email rahmiatika231@gmail.com
          </button>
        </p>
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-cream-100/10 flex flex-wrap items-center justify-center gap-6 text-cream-100/50 text-sm">
          <a href="https://www.linkedin.com/in/rahmi-atika/" target="_blank" rel="noopener noreferrer" className="hover:text-cream-100 transition-colors">LinkedIn</a>
          <a href="mailto:rahmiatika231@gmail.com" className="hover:text-cream-100 transition-colors">Email</a>
          <a href="https://wa.me/6281386426793" target="_blank" rel="noopener noreferrer" className="hover:text-cream-100 transition-colors">WhatsApp</a>
          <span>© 2026 Rahmi Atika</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const { show } = useToast();
  const { introDone, setIntroDone } = useUI();

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
        <ShowcaseStub />
        <ContactStub show={show} />
      </main>
    </>
  );
}
