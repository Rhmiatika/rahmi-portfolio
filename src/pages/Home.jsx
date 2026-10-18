export default function Home() {
  return (
    <main>
      {/* Phase 3 will populate: Splash, Hero, About, Showcase, Contact */}
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "var(--color-cream-200)" }}
      >
        <h1
          className="text-6xl font-bold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-maroon-700)",
          }}
        >
          Rahmi Atika
        </h1>
        <p
          className="mt-4 text-xl"
          style={{ color: "var(--color-charcoal-500)" }}
        >
          Informatics Engineer · Digital Archiving Specialist
        </p>
        <span
          className="mt-6 px-4 py-2 rounded-full text-sm font-semibold"
          style={{
            background: "var(--color-maroon-700)",
            color: "var(--color-cream-100)",
          }}
        >
          Phase 1 — Setup Complete ✓
        </span>
      </section>
    </main>
  );
}
