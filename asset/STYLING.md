# Styling & Animation Guidelines — Portofolio Rahmi Atika

> **Versi:** 2.0 · Palet **Maroon & Cream** dan **seluruh daftar animasi React Bits** dipertahankan.
> Dipakai bersama `PRD.md` dan `TASK.md`.

---

## 1. Color Palette

| Peran | Nama | Hex | Pemakaian |
|---|---|---|---|
| Primary | Maroon | `#800000` | Tombol primer, heading penting, blok Contact, indikator aktif |
| Secondary | Cream | `#FFFDD0` | Latar utama (lihat catatan di bawah) |
| Accent | Gold / Champagne | `#D4AF37` | Border tipis, garis dekoratif, hover, ikon kecil |
| Text | Dark Charcoal | `#333333` | Teks isi di atas cream |

### Tint & shade turunan (agar UI tidak datar)

| Token | Hex | Pemakaian |
|---|---|---|
| `maroon-900` | `#4A0000` | Teks di atas gold, bayangan |
| `maroon-700` | `#800000` | **Primary** |
| `maroon-600` | `#9A1B1B` | Hover tombol |
| `maroon-100` | `#F3DADA` | Latar chip/tag halus |
| `cream-50` | `#FFFEF2` | Kartu/permukaan terangkat |
| `cream-100` | `#FFFDD0` | **Secondary** |
| `cream-200` | `#F5F5DC` | Latar seksi selang-seling (alternatif yang sudah ada di draft) |
| `gold-500` | `#D4AF37` | **Accent** |
| `gold-300` | `#E8CF7A` | Highlight lembut |
| `charcoal-800` | `#333333` | **Text** |
| `charcoal-500` | `#6B6B6B` | Teks sekunder (kontras ≥ 4.5:1 di atas cream-50) |

> **Catatan keterbacaan:** `#FFFDD0` cukup kekuningan. Disarankan latar halaman memakai `cream-200 (#F5F5DC)` dan *permukaan kartu* memakai `cream-50`, sementara `#FFFDD0` dipakai sebagai warna **teks di atas maroon** dan highlight. Ini tetap berada dalam palet Maroon & Cream.
>
> **Kontras:** Maroon di atas cream ≈ 10:1 ✅ · Charcoal di atas cream ≈ 11:1 ✅ · **Gold di atas cream ≈ 2:1 ❌** → emas **hanya** untuk border/dekorasi/ikon besar, **jangan untuk teks isi**.

### Implementasi — Tailwind CSS v4 (tanpa `tailwind.config.js`)

```css
/* src/styles/index.css */
@import "tailwindcss";

@theme {
  --color-maroon-900: #4a0000;
  --color-maroon-700: #800000;
  --color-maroon-600: #9a1b1b;
  --color-maroon-100: #f3dada;

  --color-cream-50:  #fffef2;
  --color-cream-100: #fffdd0;
  --color-cream-200: #f5f5dc;

  --color-gold-300: #e8cf7a;
  --color-gold-500: #d4af37;

  --color-charcoal-800: #333333;
  --color-charcoal-500: #6b6b6b;

  --font-display: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;

  --radius-card: 1.25rem;
  --shadow-soft: 0 10px 30px -12px rgb(128 0 0 / 0.25);
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
}

html { scroll-behavior: smooth; }
body {
  background: var(--color-cream-200);
  color: var(--color-charcoal-800);
  font-family: var(--font-sans);
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
Pemakaian di JSX: `bg-maroon-700 text-cream-100`, `border-gold-500/60`, `font-display`.

---

## 2. Tipografi

| Elemen | Font | Ukuran (mobile → desktop) | Catatan |
|---|---|---|---|
| Nama (Hero) | **Playfair Display** 700–800 | `text-5xl` → `text-8xl` | Dipadukan `stroke text` |
| Heading seksi | Playfair Display 600 | `text-3xl` → `text-5xl` | Garis emas pendek di bawah |
| Body | **Inter** 400/500 | `text-base` → `text-lg` | `leading-relaxed`, max-width ±65ch |
| Label/eyebrow | Inter 600, uppercase, `tracking-[0.2em]` | `text-xs` | Warna maroon |

Muat lewat Google Fonts (`<link rel="preconnect">` + `display=swap`) dengan *fallback stack* seperti di atas.

---

## 3. React Bits Integration Mapping

> **WAJIB:** buka [reactbits.dev](https://reactbits.dev) dan **konfirmasi nama persis tiap komponen** sebelum instalasi — beberapa nama pada daftar awal (mis. `radient`, `specular button`, `fuse button`, `call chip`, `rubber segment`, `swipe toast`, `bell toggle`, `split flap text`, `stroke text`) bisa berbeda penamaan/ejaan atau berada di kategori lain. Gunakan varian **JS + Tailwind** (atau TS + Tailwind jika memilih TypeScript). Kolom **Fallback** adalah rencana cadangan bila komponen tidak ditemukan atau terlalu berat.

### 3.1. Global & Background

| Elemen | Komponen React Bits | Spesifikasi | Fallback |
|---|---|---|---|
| Background global | `radient` (Gradient/Radiant background) | `position: fixed; inset: 0; z-index: -10; pointer-events: none`. Warna: maroon `#800000` → `#9A1B1B` + cream `#F5F5DC`, **bergerak lambat** (siklus ≥ 20 s), opasitas rendah agar teks tetap kontras. Pause saat tab tidak aktif. | CSS `radial-gradient` + `@keyframes` posisi lambat |
| Cursor | `target cursor` | Hanya `@media (pointer: fine)`. Warna target: maroon + sudut emas. Nonaktif di `input/textarea` dan di perangkat sentuh. Butuh `gsap`. | Kursor native |
| Scroll reveal | `animated content` | Bungkus setiap seksi: fade + `translateY(24px)`, durasi 0.7 s, `ease-smooth`, **sekali saja** (`once`). Stagger anak 0.08 s. Butuh `gsap` + ScrollTrigger. | `motion` `whileInView` |

### 3.2. Text Animations

| Lokasi | Komponen | Spesifikasi |
|---|---|---|
| Opening | `split flap text` | Teks: "Welcome to my portfolio website". Papan cream-50, huruf maroon, garis tengah emas tipis. Total ± 2.2 s. |
| Hero — Nama | `stroke text` | "Rahmi Atika": outline maroon 2 px, isi transparan → terisi maroon saat *hover*/setelah load. Pastikan terbaca di mobile (stroke ≥ 1.5 px). |
| Hero — Role | `rotating text` | Rotasi: "Informatics Engineer" → "Digital Archiving Specialist" → "Data Management". Interval 2.5 s. Butuh `motion`. |
| About — Paragraf | `blur text` | Animasi per kata (blur → jelas), dipicu saat masuk viewport, sekali saja. Jaga teks tetap *selectable* dan ada `aria-label` berisi teks penuh. |
| Statistik | `count up` | IPK `3.88` (2 desimal), `11` Sertifikat, `5` Proyek, `8` Proker. Durasi 1.8 s, dipicu saat terlihat. |

### 3.3. Component Animations

| Elemen | Komponen | Spesifikasi |
|---|---|---|
| Hero visual | `lanyard` | Kolom kanan. Perlu aset `card.glb` + tekstur tali (`lanyard.png`) dan **tekstur kartu kustom** berisi foto & nama Rahmi (warna maroon/cream). Dependensi: `three @react-three/fiber @react-three/drei @react-three/rapier meshline`. `dpr={[1,1.5]}`, lazy + viewport-only, fallback gambar statis di mobile. |
| Transisi Hero → About | `animated scroll` | Lanyard bergeser/menyusut saat scroll, profile card muncul dari bawah. Bila tidak stabil → parallax sederhana. |
| About visual | `profile card` + `model viewer` | `model viewer` menampilkan `/assets/models/rahmi.glb` (auto-rotate, tanpa zoom, `environment` lembut hangat). Kartu: bingkai emas tipis, glow maroon halus. |
| Pendidikan | `dome gallery` *(opsional)* | Hanya bila ada foto. **Default:** Education Timeline (2 kartu). Dependensi Dome: `@use-gesture/react`. |
| Navigasi Showcase | `pill nav` | Dipakai sebagai tab *controlled* (lihat PRD §3.2). Aktif: latar maroon, teks cream. Idle: transparan, border emas 1 px. Butuh `gsap`. |
| Card Sertifikat | `tilted card` | Rotasi maks ±10°, skala hover 1.03, bayangan `shadow-soft`. **Nonaktif di sentuh.** Butuh `motion`. |
| CTA Contact | `specular button` | Tombol besar, latar cream, teks maroon, kilau (specular) mengikuti kursor. Pada latar maroon. |

### 3.4. Micro-Interactions

| Elemen | Komponen | Spesifikasi |
|---|---|---|
| "Unduh CV" & "Hubungi Saya" | `fuse button` | Primer: isi maroon / teks cream. Sekunder: outline maroon. Tinggi min. 48 px (target sentuh). |
| Akses cepat kontak | `call chip` | `fixed bottom-4 right-4 z-40`. Buka modal kontak. Sembunyi saat seksi Contact terlihat; beri `safe-area-inset-bottom` di iOS. |
| Transisi tab | `rubber segment` | Indikator aktif di dalam Pill Nav bergerak elastis (spring: stiffness ~300, damping ~20). |
| Notifikasi | `swipe toast` | Pojok atas-kanan (mobile: atas-tengah). Variasi: sukses (garis kiri emas), error (garis kiri maroon-600). Auto-dismiss 3 s, bisa di-*swipe*. |
| Saklar suara/notifikasi | `bell toggle` | Navbar kanan atas. Default **off**. Status tersimpan di `localStorage`. |

---

## 4. Layout, Spacing & Komponen Dasar

* **Container:** `max-w-7xl mx-auto px-5 sm:px-8`. Jarak antar seksi `py-20 md:py-28`.
* **Kartu:** `rounded-[var(--radius-card)] bg-cream-50 border border-gold-500/40 shadow-soft`.
* **Heading seksi:** eyebrow kecil → judul serif → garis emas 48×2 px.
* **Seksi Contact:** latar `maroon-700`, teks `cream-100`, aksen `gold-300`.
* **Navbar:** transparan di atas Hero, berubah `cream-50/80 + backdrop-blur` setelah scroll 40 px. Isi: logo "RA", tautan anchor, `bell toggle`.
* **Modal:** backdrop `maroon-900/60 + blur-sm`, panel `cream-50`, tombol ✕ bulat 40 px di kanan atas.

## 5. Z-Index Scale

| Lapisan | z-index |
|---|---|
| Background global | `-10` |
| Konten | `0–10` |
| Navbar | `30` |
| `call chip` | `40` |
| `swipe toast` | `60` |
| Modal (sertifikat / kontak) | `90` |
| Splash screen | `100` |
| `target cursor` | `9999` (`pointer-events: none`) |

## 6. Timing & Easing Standar

| Jenis | Nilai |
|---|---|
| Hover/mikro | 150–250 ms |
| Reveal seksi | 600–800 ms, `cubic-bezier(0.22, 1, 0.36, 1)` |
| Modal buka/tutup | 250 ms (scale 0.96 → 1 + fade) |
| Splash total | ± 4 s |
| Rotating text | interval 2.5 s |
| Background loop | ≥ 20 s |

## 7. Aturan Performa Animasi

1. Animasikan hanya `transform` dan `opacity`.
2. Satu `Canvas` WebGL aktif pada satu waktu bila memungkinkan (Lanyard **atau** Model Viewer yang sedang terlihat).
3. Hentikan animasi/loop saat elemen di luar viewport atau tab tersembunyi (`document.visibilityState`).
4. Mobile (`< 768px` atau `navigator.hardwareConcurrency <= 4`): matikan `target cursor`, `tilted card`, physics lanyard → gunakan fallback statis.
5. Hormati `prefers-reduced-motion`.
6. Gunakan `will-change` seperlunya, jangan global.

## 8. Aset & Penamaan

| Jenis | Path (di `public/`) | Format |
|---|---|---|
| Model 3D | `/assets/models/rahmi.glb` | GLB (Draco), < 3 MB |
| Lanyard | `/assets/lanyard/card.glb`, `/assets/lanyard/lanyard.png` | GLB/PNG |
| Sertifikat | `/assets/certificates/cert-01.webp` … `cert-11.webp` + `thumbs/` | WebP |
| Proyek | `/assets/projects/<slug>/cover.webp` | WebP |
| Logo skill | `/assets/logos/<nama>.svg` | SVG |
| CV | `/assets/cv/CV_Rahmi_Atika.pdf` | PDF |
| Foto | `/assets/images/rahmi.webp` | WebP |

Semua gambar wajib punya `width`/`height` (cegah layout shift) dan `alt` deskriptif.
