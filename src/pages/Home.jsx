// src/pages/Home.jsx
// Halaman utama: Hero → About → Showcase → Contact
// Stub sementara — komponen seksi dibangun di Phase 3

import { useToast } from "@/context/ToastContext";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

export default function Home() {
  const { show } = useToast();

  return (
    <main id="home" className="min-h-screen">
      {/* ── Hero stub ─────────────────────────────────────────── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <AnimatedContent delay={100}>
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Halo, saya
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-maroon mb-4 leading-tight">
            Rahmi Atika
          </h1>
          <p className="text-maroon/70 text-lg md:text-xl mb-8 max-w-xl">
            Fresh Graduate Teknik Informatika · Digital Archiving Specialist · Data Management
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              as="a"
              href="/assets/cv/CV_Rahmi_Atika.pdf"
              download
              variant="primary"
              size="lg"
            >
              Unduh CV
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Hubungi Saya
            </Button>
          </div>
        </AnimatedContent>

        {/* ── Tombol uji toast (SEMENTARA — hapus setelah Phase 3) ── */}
        <div className="mt-12 flex gap-3 flex-wrap justify-center">
          <button
            id="test-toast-success"
            onClick={() => show({ type: "success", message: "Email disalin ✓" })}
            className="text-xs px-3 py-1 rounded-full border border-green-500 text-green-700 hover:bg-green-50"
          >
            [DEV] Toast sukses
          </button>
          <button
            id="test-toast-error"
            onClick={() => show({ type: "error", message: "Gagal mengirim. Coba lagi atau hubungi lewat WhatsApp." })}
            className="text-xs px-3 py-1 rounded-full border border-red-500 text-red-700 hover:bg-red-50"
          >
            [DEV] Toast error
          </button>
          <button
            id="test-toast-info"
            onClick={() => show({ type: "info", message: "Pesan terkirim. Terima kasih!" })}
            className="text-xs px-3 py-1 rounded-full border border-gold text-gold hover:bg-yellow-50"
          >
            [DEV] Toast info
          </button>
        </div>
        {/* ── END tombol uji toast ── */}
      </section>

      {/* ── Contact stub ──────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 px-6 bg-maroon text-cream text-center"
      >
        <SectionHeading
          eyebrow="Let's work together"
          title="Mari bangun alur kerja yang lebih rapi, bersama."
          center
          className="[&_h2]:text-cream [&_p]:text-cream/70"
        />
        <p className="text-cream/80 max-w-lg mx-auto mb-8">
          Sedang mencari tim administrasi, pengarsipan digital, atau data
          management yang teliti? Saya siap berkontribusi.
        </p>
        <Button
          as="a"
          href="https://wa.me/6281386426793"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="lg"
          className="border-cream text-cream hover:bg-cream hover:text-maroon"
        >
          Mulai Percakapan via WhatsApp
        </Button>
        <p className="mt-4 text-cream/60 text-sm">
          Atau{" "}
          <button
            className="underline hover:text-cream transition-colors"
            onClick={() => {
              navigator.clipboard.writeText("rahmiatika231@gmail.com");
              show({ type: "success", message: "Email disalin ✓" });
            }}
          >
            salin email rahmiatika231@gmail.com
          </button>
        </p>
      </section>
    </main>
  );
}
