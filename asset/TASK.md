# Task Breakdown — Antigravity → Vercel

> **Versi:** 2.0 · Acuan: `PRD.md` (apa yang dibangun) dan `STYLING.md` (bagaimana tampilannya).
> Centang `[x]` setiap tugas selesai. Kerjakan **berurutan per Phase**; jangan lompat ke Phase 3 sebelum Phase 1–2 lolos `npm run dev`.

---

## 0. Prasyarat

- [ ] Node.js **≥ 20.19** (atau ≥ 22.12) — syarat Vite terbaru. Cek: `node -v`
- [ ] Akun GitHub dan akun Vercel (login pakai GitHub memudahkan)
- [ ] Buka [reactbits.dev](https://reactbits.dev) dan **verifikasi nama persis** semua komponen di `STYLING.md` §3 (lihat peringatan di sana)

---

## 1. Struktur Folder yang Direkomendasikan

```
rahmi-portfolio/
├─ public/                         # Aset statis → diakses via path absolut "/assets/..."
│  ├─ assets/
│  │  ├─ models/rahmi.glb          # hasil Meshy (dikompres)
│  │  ├─ lanyard/card.glb
│  │  ├─ lanyard/lanyard.png
│  │  ├─ certificates/cert-01.webp … cert-11.webp
│  │  ├─ certificates/thumbs/cert-01.webp …
│  │  ├─ projects/<slug>/cover.webp
│  │  ├─ logos/word.svg, excel.svg, canva.svg, …
│  │  ├─ images/rahmi.webp, og-image.jpg
│  │  └─ cv/CV_Rahmi_Atika.pdf
│  └─ favicon.svg
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx                      # <Routes> + providers + global layer
│  ├─ styles/index.css             # Tailwind v4 + @theme (STYLING.md §1)
│  ├─ components/
│  │  ├─ reactbits/                # ⭐ komponen React Bits hasil copy/CLI (JANGAN diedit sembarangan)
│  │  │  ├─ TargetCursor/
│  │  │  ├─ AnimatedContent/
│  │  │  ├─ SplitFlapText/  StrokeText/  BlurText/  RotatingText/  CountUp/
│  │  │  ├─ Lanyard/  ModelViewer/  ProfileCard/  TiltedCard/  PillNav/  DomeGallery/
│  │  │  ├─ SpecularButton/  FuseButton/  CallChip/  RubberSegment/  SwipeToast/  BellToggle/
│  │  │  └─ Radient/   (background)
│  │  ├─ ui/                       # wrapper tipis milik kita di atas reactbits
│  │  │  ├─ Button.jsx  Modal.jsx  Chip.jsx  SectionHeading.jsx  Reveal.jsx
│  │  │  └─ Toast.jsx  (adapter SwipeToast + ToastContext)
│  │  ├─ layout/                   # Navbar.jsx  Footer.jsx  GlobalLayer.jsx (cursor, bg, call chip)
│  │  └─ sections/
│  │     ├─ Splash/Splash.jsx
│  │     ├─ Hero/Hero.jsx
│  │     ├─ About/About.jsx  EducationTimeline.jsx  ExperienceCards.jsx  Stats.jsx
│  │     ├─ Showcase/Showcase.jsx  ProjectsTab.jsx  CertificatesTab.jsx  TechStackTab.jsx
│  │     │            CertificateModal.jsx  PillTabs.jsx
│  │     └─ Contact/Contact.jsx  ContactModal.jsx
│  ├─ pages/
│  │  ├─ Home.jsx                  # menyusun seksi: Hero → About → Showcase → Contact
│  │  ├─ ProjectDetail.jsx         # /projects/:slug
│  │  └─ NotFound.jsx
│  ├─ context/  UIContext.jsx  ToastContext.jsx
│  ├─ hooks/    useMediaQuery.js  useInView.js  useReducedMotion.js  useScrollLock.js  useCanUse3D.js
│  ├─ data/     certificates.json  projects.js  skills.js  profile.js
│  ├─ utils/    cn.js  formatDate.js  whatsapp.js  validators.js
│  └─ lib/      (opsional) utils bawaan shadcn jika memakai CLI
├─ index.html
├─ vite.config.js
├─ jsconfig.json                   # alias "@/*" → "src/*"
├─ vercel.json
├─ package.json
└─ .env.example
```

**Aturan struktur**
- `components/reactbits/` = kode asli React Bits. Kustomisasi dilakukan lewat **wrapper di `components/ui/`** atau props, agar mudah diperbarui.
- Teks/konten **tidak** ditulis di komponen — ambil dari `src/data/`.
- Aset di `public/` dipanggil dengan path absolut (`/assets/models/rahmi.glb`). Aset yang di-*import* dari `src/` (mis. `import card from "./card.glb"`) memerlukan `assetsInclude: ["**/*.glb"]` di `vite.config.js` — **lebih mudah: taruh di `public/` dan kirim string path lewat props.**

---

## 2. Instalasi & Dependensi (perintah presisi)

> Gunakan **JavaScript + Tailwind** (varian `JS-TW` di React Bits). Jalankan berurutan di terminal Antigravity.

### 2.1. Buat proyek (Vite + React)
```bash
npm create vite@latest rahmi-portfolio -- --template react
cd rahmi-portfolio
npm install
```

### 2.2. Tailwind CSS v4
```bash
npm install tailwindcss @tailwindcss/vite
```
`vite.config.js`:
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  assetsInclude: ["**/*.glb", "**/*.gltf"],
});
```
`jsconfig.json`:
```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } }, "include": ["src"] }
```
Di `src/styles/index.css` cukup `@import "tailwindcss";` + blok `@theme` dari `STYLING.md` §1. **Tidak** perlu `tailwind.config.js` atau `postcss.config.js` pada v4.

### 2.3. Library animasi & 3D (dependensi komponen React Bits)
```bash
# Animasi
npm install gsap motion

# 3D (Model Viewer + Lanyard)
npm install three @react-three/fiber @react-three/drei @react-three/rapier meshline

# Gestur (Dome Gallery) & Routing
npm install @use-gesture/react react-router-dom

# Ikon (fallback logo skill & ikon UI)
npm install react-icons
```
Catatan kompatibilitas:
- **`motion`** adalah nama paket baru dari Framer Motion (`import { motion } from "motion/react"`). Jika komponen React Bits yang kamu salin masih memakai `from "framer-motion"`, tambahkan juga `npm install framer-motion` — keduanya boleh ada.
- Proyek Vite terbaru memakai **React 19** → `@react-three/fiber` v9 + `@react-three/drei` v10 (default `npm install` sudah sesuai). Jika memakai **React 18**, pasang `@react-three/fiber@8` dan `@react-three/drei@9`.
- Jika muncul *peer dependency error* → jangan langsung `--force`; periksa versi React lebih dulu.

### 2.4. Menambahkan komponen React Bits
**Opsi A — CLI (shadcn registry):**
```bash
npx shadcn@latest init            # pilih JavaScript (tsx: false), alias "@"
npx shadcn@latest add @react-bits/TargetCursor-JS-TW
npx shadcn@latest add @react-bits/Lanyard-JS-TW
npx shadcn@latest add @react-bits/ModelViewer-JS-TW
```
Pola nama: `@react-bits/<NamaKomponen>-<JS|TS>-<CSS|TW>`. **Cek perintah persis di tab "CLI" pada halaman tiap komponen** di reactbits.dev (format registry dapat berubah). Komponen akan masuk ke folder alias `ui` — **pindahkan** ke `src/components/reactbits/` bila perlu.

**Opsi B — Salin manual (paling aman):** buka halaman komponen → pilih **JavaScript + Tailwind** → tab *Code* → salin ke `src/components/reactbits/<Nama>/`, lalu pasang dependensi yang tercantum di halaman itu.

### 2.5. Tabel dependensi per komponen (indikatif — verifikasi di halaman komponen)

| Komponen | Dependensi utama |
|---|---|
| Target Cursor, Animated Content, Pill Nav | `gsap` |
| Rotating Text, Count Up, Blur Text, Tilted Card | `motion` |
| Lanyard | `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline` + aset `card.glb`, `lanyard.png` |
| Model Viewer | `three`, `@react-three/fiber`, `@react-three/drei` |
| Dome Gallery | `@use-gesture/react` |
| Profile Card | (CSS/JS murni) |
| Komponen lain (split flap, stroke text, buttons, chip, toast, toggle, radient) | Ikuti halaman masing-masing |

### 2.6. Opsional (kualitas & performa)
```bash
npm install -D @gltf-transform/cli          # kompres GLB
npm install @formspree/react                 # jika memakai Formspree
# atau: npm install @emailjs/browser         # jika memakai EmailJS
```
Kompres model: `npx gltf-transform optimize rahmi-raw.glb public/assets/models/rahmi.glb --compress draco --texture-compress webp`

### 2.7. Konfigurasi Vercel
`vercel.json` (agar refresh di `/projects/:slug` tidak 404):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
`.env.example` (variabel `VITE_*` bersifat **publik**):
```
VITE_FORMSPREE_ID=
VITE_WHATSAPP_NUMBER=6281386426793
VITE_CONTACT_EMAIL=rahmiatika231@gmail.com
```

---

## Phase 1 — Inisialisasi & Setup Proyek

- [ ] Buat proyek Vite + React (§2.1), jalankan `npm run dev` → halaman default tampil.
- [ ] Pasang Tailwind v4 + alias `@` (§2.2); uji dengan satu `div` ber-kelas `bg-maroon-700`.
- [ ] Pasang dependensi animasi/3D/routing (§2.3).
- [ ] Buat struktur folder (§1) — folder kosong cukup diberi `.gitkeep`.
- [ ] Siapkan `react-router-dom`: `BrowserRouter` di `main.jsx`; rute `/`, `/projects/:slug`, `*` (404).
- [ ] Buat `vercel.json` (§2.7) dan `.env.example`.
- [ ] Tambah `index.html`: `lang="id"`, title, meta description, Open Graph, favicon, preconnect Google Fonts (Playfair Display + Inter).
- [ ] `git init` → commit pertama → push ke repositori GitHub (jalur deploy paling aman).
- [ ] **Smoke test deploy:** import repo di Vercel (Framework: Vite, Build: `npm run build`, Output: `dist`) → pastikan halaman kosong ter-deploy sebelum lanjut.

**Selesai bila:** `npm run build` sukses dan URL Vercel menampilkan aplikasi dasar.

## Phase 2 — Aset, Warna & Lapisan Global

- [ ] Masukkan token warna & font (`@theme`) dari `STYLING.md` §1–2.
- [ ] **Data:** salin `gemini-code-….json` → `src/data/certificates.json`; tambahkan field `thumb`, `image`, `description` (PRD §4). Buat `projects.js`, `skills.js`, `profile.js` (nama, headline, kontak, teks About dari CV).
- [ ] **Aset gambar:** ekspor 11 sertifikat → WebP (maks ±1600 px sisi panjang) + thumbnail ±600 px; simpan sesuai §1.
- [ ] **Tugas eksternal — Model 3D:**
  1. Di [meshy.ai](https://www.meshy.ai) pilih **Image to 3D**, unggah `Meshy_AI_IsolatedFullBodyCharacter.png`.
  2. Pilih hasil terbaik → **Export `.glb`** (aktifkan tekstur/PBR).
  3. Kompres (§2.6) → target **< 3 MB** → simpan `public/assets/models/rahmi.glb`.
  4. Uji cepat di `gltf-viewer` (mis. gltf-viewer.donmccurdy.com) sebelum dipakai.
- [ ] **Tugas eksternal — Kartu Lanyard:** siapkan `card.glb` + `lanyard.png` dari repo/halaman React Bits Lanyard. Untuk menampilkan foto/nama Rahmi di kartu, ganti **tekstur kartu** (via Blender, atau ganti tekstur material di glTF) memakai desain maroon/cream. *Jika terlalu rumit, mulai dengan kartu default dan ganti tekstur belakangan.*
- [ ] Salin CV → `public/assets/cv/CV_Rahmi_Atika.pdf`.
- [ ] Pasang `GlobalLayer`: `Radient` (background, `fixed -z-10`), `TargetCursor` (hanya `pointer: fine`).
- [ ] Buat `UIContext`, `ToastContext` + hook `useMediaQuery`, `useReducedMotion`, `useScrollLock`, `useCanUse3D`.
- [ ] Buat komponen dasar `ui/`: `Button`, `Modal` (portal, scroll lock, focus trap, Esc), `SectionHeading`, `Reveal` (wrapper `AnimatedContent`).

**Selesai bila:** background maroon-cream bergerak lambat, cursor target aktif di desktop, toast bisa dipicu dari tombol uji.

## Phase 3 — Pengembangan Seksi (sesuai flow)

### 3.1 Opening / Splash
- [ ] `Splash.jsx` — overlay `fixed inset-0 z-[100]` dengan `split flap text` ("Welcome to my portfolio website"), sub-baris, tagline, garis progres emas, tombol **Lewati** (copy: PRD §2.1).
- [ ] Timeline ±4 s; **bukan** `window.scrollTo` — setelah selesai: fade-out lalu `setIntroDone(true)`, lepas scroll lock.
- [ ] Preload aset: `useGLTF.preload("/assets/models/rahmi.glb")`; splash menunggu min. 3 s dan maks. 6 s.
- [ ] `sessionStorage.introSeen` agar tidak mengulang; versi `reduced-motion`.

### 3.2 Header / Hero
- [ ] Layout dua kolom (`grid lg:grid-cols-2`), mobile bertumpuk.
- [ ] Nama → `stroke text`; role → `rotating text` (3 role); value statement + chip bukti (IPK 3.88 · NFSCC HUB · PKL Telkom Indonesia).
- [ ] Tombol **Unduh CV** (`fuse button`, `<a href="/assets/cv/CV_Rahmi_Atika.pdf" download>`) dan **Hubungi Saya** (`fuse button` outline → scroll ke `#contact`).
- [ ] Kolom kanan: `lanyard` — `React.lazy` + `Suspense` (skeleton), mount hanya saat terlihat; mobile/low-end → gambar statis.
- [ ] Navbar (logo, anchor link, `bell toggle`).

### 3.3 About
- [ ] Judul + paragraf `blur text` (teks dari `profile.js`).
- [ ] `Stats` dengan `count up` (IPK 3.88, 11 sertifikat, 5 proyek, 8 proker) — nilai sertifikat/proyek dihitung dari `.length`.
- [ ] `profile card` + `model viewer` (`/assets/models/rahmi.glb`): auto-rotate, zoom off, lazy + viewport-only.
- [ ] `animated scroll` untuk transisi lanyard → profile card (fallback: parallax ringan).
- [ ] `EducationTimeline` (STTNF & SMKN 19 Jakarta) — **opsional** `dome gallery` bila ada foto.
- [ ] `ExperienceCards` (NFSCC Humas, Telkom PKL).

### 3.4 Portfolio Showcase
- [ ] `PillTabs` dari `pill nav` (controlled) + `rubber segment`; state tab di URL (`useSearchParams`, PRD §3.2); keyboard & ARIA tab.
- [ ] **Projects:** grid 5 kartu dari `projects.js`; klik → `/projects/:slug`. Buat `ProjectDetail.jsx` (tombol kembali ke `/?tab=projects#showcase`, "Proyek berikutnya", 404 bila slug tak valid).
- [ ] **Certificates:** grid `tilted card` dari `certificates.json` (urut terbaru; `date: null` ditangani); chip filter kategori; `CertificateModal` (PRD §3.3: portal, scroll lock, Esc, backdrop, ✕, ‹ ›, focus trap).
- [ ] **Tech Stack:** grid logo per grup (PRD §2.4) dengan hover scale-up + tooltip; chip soft skills & bahasa.
- [ ] Transisi antar tab dengan `AnimatePresence`.

### 3.5 Contact
- [ ] Blok maroon dengan copy final (PRD §2.5) + `specular button` "Mulai Percakapan".
- [ ] `ContactModal`: form Nama, Email, Instansi (opsional), Pesan; validasi; honeypot; state *submitting*.
- [ ] Aksi **Kirim via Email** (Formspree/EmailJS) dan **Lanjut ke WhatsApp** (`wa.me/6281386426793?text=…` via `utils/whatsapp.js`, gunakan `encodeURIComponent`).
- [ ] `swipe toast`: sukses, gagal, "Email disalin ✓".
- [ ] Footer: LinkedIn, Email, WhatsApp, © 2026.

## Phase 4 — Micro-Interactions & Finalisasi

- [ ] `call chip` (fixed kanan-bawah, buka `ContactModal`, sembunyi di seksi Contact, hormati safe-area iOS).
- [ ] `bell toggle` terhubung ke `soundOn` (persist `localStorage`); jika belum ada file suara, toggle hanya mengatur toast/animasi suara **atau** sembunyikan sampai suara tersedia.
- [ ] Bungkus semua seksi dengan `animated content` (`once`).
- [ ] Halaman 404 bertema.
- [ ] **Performa:** `React.lazy` untuk Lanyard/ModelViewer/DomeGallery; `dpr={[1,1.5]}`; pause saat tab tersembunyi; cek ukuran bundle (`npm run build`, lihat output Vite).
- [ ] **Aksesibilitas:** `alt` semua gambar, kontras, fokus terlihat, uji keyboard penuh (tab, modal, pill nav), `prefers-reduced-motion`.
- [ ] **Responsif:** uji 360 / 390 / 768 / 1024 / 1440 px.
- [ ] **Lighthouse** (mode mobile): target di PRD §1.
- [ ] SEO: OG image, meta, `robots.txt`, `sitemap.xml` sederhana (opsional).

## Phase 5 — Deploy ke Vercel

- [ ] `npm run build` lokal sukses tanpa error; `npm run preview` → cek `/`, refresh di `/projects/nfscc-hub` (harus tidak 404).
- [ ] Commit & push ke GitHub.
- [ ] Di Vercel: **Add New → Project → Import** repo. Preset **Vite**, Build `npm run build`, Output `dist`.
- [ ] Isi Environment Variables (`VITE_FORMSPREE_ID`, dll.) di Vercel → **Redeploy**.
- [ ] Uji di produksi: Unduh CV, WhatsApp, form email, modal sertifikat, model 3D, di **HP asli** (Android & iOS bila bisa).
- [ ] *(Opsional)* Domain kustom di Vercel → Settings → Domains.
- [ ] *(Opsional)* Aktifkan Vercel Analytics.

---

## Definition of Done

1. Semua seksi sesuai `PRD.md`; konten sesuai CV/LinkedIn (tanpa klaim baru).
2. Seluruh animasi pada daftar React Bits terpakai (atau fallback tercatat di `STYLING.md` §3).
3. Palet Maroon & Cream konsisten; tidak ada teks emas di atas cream.
4. Tidak ada error di konsol; tidak ada teks `null`/`[cite]` di UI.
5. Build produksi di Vercel berjalan; refresh di rute dalam tidak 404.
6. Lighthouse mobile memenuhi target PRD §1.

## Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Lanyard/Model berat di HP | Lazy + viewport-only + fallback statis (STYLING §7) |
| Nama komponen React Bits berbeda | Verifikasi di reactbits.dev; pakai fallback |
| Konflik versi React vs R3F | Cocokkan versi (§2.3); jangan `--force` |
| `.glb` terlalu besar | Draco + WebP texture, target < 3 MB |
| Form tanpa backend | WhatsApp deep link + Formspree/EmailJS |
| Kunci rahasia bocor | Hanya `VITE_*` publik; tanpa secret key di klien |
