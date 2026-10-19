// src/components/layout/Navbar.jsx
// STYLING.md §4: transparan di atas Hero, cream-50/80 + backdrop-blur setelah scroll 40px
// Logo "RA", anchor links (#about #showcase #contact), slot bell toggle

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NAV_LINKS = [
  { href: "#about", label: "Tentang" },
  { href: "#showcase", label: "Portofolio" },
  { href: "#contact", label: "Kontak" },
];

export default function Navbar({ darkHero = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isDarkHero = darkHero || location.pathname.startsWith("/projects/");
  const isDarkHeader = isDarkHero && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-30
        transition-all duration-300
        ${scrolled
          ? "bg-cream-50/85 backdrop-blur-md shadow-sm border-b border-gold-500/20"
          : "bg-transparent"
        }
      `}
    >
      <nav
        className="portfolio-container h-16 flex items-center justify-between"
        aria-label="Navigasi utama"
      >
        {/* Logo / Brand */}
        <a
          href="/"
          className="flex items-baseline gap-[3px] hover:opacity-85 transition-opacity"
          aria-label="Rahmi Atika — Kembali ke halaman utama"
        >
          <span
            className={`font-sans text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
              isDarkHeader ? "text-cream-100/70" : "text-charcoal-500/70"
            }`}
          >
            Portofolio
          </span>
          <span
            className={`font-display font-bold text-xl ml-1 transition-colors duration-200 ${
              isDarkHeader ? "text-cream-100" : "text-maroon-700"
            }`}
          >
            Rahmi Atika
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleAnchor(e, href)}
                className={`
                  text-sm font-semibold tracking-wide transition-colors duration-200
                  ${
                    isDarkHeader
                      ? "text-cream-100/90 hover:text-gold-300 after:bg-gold-300"
                      : "text-charcoal-800 hover:text-maroon-700 after:bg-gold-500"
                  }
                  relative after:absolute after:bottom-0 after:left-0 after:right-0
                  after:h-[2px] after:scale-x-0
                  hover:after:scale-x-100 after:transition-transform after:duration-200
                `}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right slot: bell toggle placeholder + mobile menu */}
        <div className="flex items-center gap-3">
          {/* Bell toggle slot */}
          <div
            className={`w-9 h-9 hidden md:flex items-center justify-center rounded-full border transition-colors duration-200 ${
              isDarkHeader
                ? "border-cream-100/30 text-cream-100/80 hover:border-gold-300 hover:text-gold-300"
                : "border-gold-500/30 text-charcoal-500"
            }`}
            title="Suara UI (segera hadir)"
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>

          {/* Mobile hamburger */}
          <button
            id="navbar-mobile-toggle"
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isDarkHeader
                ? "text-cream-100 hover:bg-white/10"
                : "text-maroon-700 hover:bg-maroon-100/50"
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden bg-cream-50/95 backdrop-blur-md border-t border-gold-500/20 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-48 py-3" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-5" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleAnchor(e, href)}
                className="block py-3 text-sm font-semibold text-charcoal-800 hover:text-maroon-700 transition-colors border-b border-gold-500/10 last:border-0"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
