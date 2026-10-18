import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "var(--color-maroon-700)" }}
    >
      <p
        className="text-8xl font-bold"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-gold-500)" }}
      >
        404
      </p>
      <h1
        className="text-2xl font-semibold"
        style={{ color: "var(--color-cream-100)" }}
      >
        Halaman tidak ditemukan
      </h1>
      <p style={{ color: "var(--color-cream-100)", opacity: 0.7 }}>
        Sepertinya halaman yang kamu cari tidak ada.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
        style={{
          background: "var(--color-cream-100)",
          color: "var(--color-maroon-700)",
        }}
      >
        ← Kembali ke Beranda
      </Link>
    </main>
  );
}
