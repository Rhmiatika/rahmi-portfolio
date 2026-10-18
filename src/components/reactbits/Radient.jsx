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
