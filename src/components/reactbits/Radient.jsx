// src/components/reactbits/Radient.jsx
// FALLBACK — ReactBits "Radient" background (animated gradient blob)
// Background fixed -z-10, maroon-cream palet, gerak lambat

export default function Radient() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base cream background */}
      <div className="absolute inset-0 bg-cream" />

      {/* Doodle Geometric Accent Pattern (Aksen Background Website Halus & Elegan) */}
      <svg
        className="absolute inset-0 w-full h-full text-maroon/[0.06] pointer-events-none select-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="website-doodle-pattern"
            width="320"
            height="320"
            patternUnits="userSpaceOnUse"
          >
            {/* Circles / Rings (different sizes) */}
            <circle cx="45" cy="50" r="14" stroke="currentColor" strokeWidth="2.2" fill="none" />
            <circle cx="235" cy="45" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="140" cy="130" r="11" stroke="currentColor" strokeWidth="2.2" fill="none" />
            <circle cx="185" cy="210" r="16" stroke="currentColor" strokeWidth="2.2" fill="none" />
            <circle cx="135" cy="275" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="280" cy="280" r="12" stroke="currentColor" strokeWidth="2.2" fill="none" />
            <circle cx="20" cy="175" r="8" stroke="currentColor" strokeWidth="2" fill="none" />

            {/* Crosses (X) */}
            <path d="M 95 38 l 12 12 M 107 38 l -12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 110 190 l 14 14 M 124 190 l -14 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 215 260 l 12 12 M 227 260 l -12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 25 220 l 10 10 M 35 220 l -10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M 290 120 l 11 11 M 301 120 l -11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

            {/* Plus Signs (+) */}
            <path d="M 285 45 v 14 M 278 52 h 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 85 115 v 16 M 77 123 h 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 265 195 v 14 M 258 202 h 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 200 35 v 12 M 194 41 h 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M 50 280 v 12 M 44 286 h 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

            {/* Squiggles / S-curves */}
            <path d="M 150 45 c 8 -12 16 -12 24 0 c 8 12 16 12 24 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 40 135 c -8 8 -8 18 0 26 c 8 8 8 18 0 26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 235 235 c 8 -8 16 -8 24 2 c 8 8 16 4 20 -2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 160 170 c -6 8 -6 16 0 22 c 6 6 6 14 0 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Arcs / Curves */}
            <path d="M 25 90 a 16 16 0 0 1 24 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 255 125 a 14 14 0 0 0 20 -10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 80 255 a 18 18 0 0 1 26 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 175 120 a 12 12 0 0 1 18 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M 105 75 a 14 14 0 0 0 18 -8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />

            {/* Slanted lines / dashes */}
            <path d="M 195 95 l 10 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 30 20 l 12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M 145 230 l 8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

            {/* Solid Dots */}
            <circle cx="305" cy="80" r="2.8" fill="currentColor" />
            <circle cx="225" cy="165" r="3" fill="currentColor" />
            <circle cx="35" cy="275" r="2.8" fill="currentColor" />
            <circle cx="155" cy="35" r="2.8" fill="currentColor" />
            <circle cx="65" cy="170" r="2.8" fill="currentColor" />
            <circle cx="120" cy="80" r="2.5" fill="currentColor" />
            <circle cx="280" cy="160" r="2.5" fill="currentColor" />
            <circle cx="195" cy="275" r="2.8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#website-doodle-pattern)" />
      </svg>

      {/* Blob maroon kiri atas */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #6B1A2A 0%, transparent 70%)",
          animation: "radient-drift-1 18s ease-in-out infinite alternate",
        }}
      />

      {/* Blob emas bawah kanan */}
      <div
        className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)",
          animation: "radient-drift-2 22s ease-in-out infinite alternate",
        }}
      />

      {/* Blob maroon kanan tengah */}
      <div
        className="absolute top-1/2 -right-48 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #6B1A2A 0%, transparent 70%)",
          animation: "radient-drift-3 26s ease-in-out infinite alternate",
        }}
      />

      <style>{`
        @keyframes radient-drift-1 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 40px) scale(1.15); }
        }
        @keyframes radient-drift-2 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-50px, -30px) scale(1.1); }
        }
        @keyframes radient-drift-3 {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-40px, 60px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
