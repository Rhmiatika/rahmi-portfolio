import { useParams, Link } from "react-router-dom";

export default function ProjectDetail() {
  const { slug } = useParams();

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: "var(--color-cream-200)" }}
    >
      <p style={{ color: "var(--color-charcoal-500)", fontSize: "0.875rem" }}>
        /projects/
      </p>
      <h1
        className="text-4xl font-bold"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-700)" }}
      >
        {slug}
      </h1>
      <p style={{ color: "var(--color-charcoal-500)" }}>
        Detail proyek akan diisi di Phase 3.
      </p>
      <Link
        to="/?tab=projects#showcase"
        className="mt-4 px-5 py-2 rounded-full text-sm font-semibold"
        style={{
          background: "var(--color-maroon-700)",
          color: "var(--color-cream-100)",
        }}
      >
        ← Kembali ke Proyek
      </Link>
    </main>
  );
}
