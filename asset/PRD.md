# Product Requirements Document (PRD) — Portofolio Rahmi Atika

> **Versi:** 2.0 (hasil analisis & penyempurnaan dari draft awal)
> **Stack:** React (Vite) · Tailwind CSS v4 · React Bits · Motion (Framer Motion) · GSAP · Three.js · React Router
> **Target deploy:** Vercel (static SPA)
> **Dokumen pendamping:** `STYLING.md`, `TASK.md`

---

## 0. Catatan Analisis & Keputusan (BACA DULU)

Temuan dari draft awal dan keputusan yang diambil di versi ini:

| # | Temuan di draft | Keputusan di PRD v2 |
|---|---|---|
| 1 | Draft berisi sisa penanda `[cite: ...]` | **Dihapus semua.** Jangan ikut disalin ke kode/UI. |
| 2 | Splash memakai `window.scrollTo` setelah `setTimeout` | Diganti **overlay fullscreen + fade-out** (scroll dikunci selama splash). Lebih stabil di mobile dan tidak "loncat". Splash juga dipakai untuk **preload** model 3D. |
| 3 | `Lanyard` (WebGL + physics) dan `Model Viewer` (WebGL) tampil bersamaan | Berisiko berat di HP. Wajib **lazy load**, render hanya saat masuk viewport, dan **fallback gambar statis** di mobile/perangkat lemah. |
| 4 | `Dome Gallery` untuk riwayat pendidikan | Dome Gallery pada dasarnya galeri **gambar**, bukan timeline. Dijadikan **opsional**; default memakai **Education Timeline** (2 kartu). Dome dipakai hanya jika ada foto kampus/kegiatan. |
| 5 | "Theme/Sound switcher" dengan `bell toggle` ambigu | Diputuskan: `bell toggle` = **saklar suara & notifikasi UI** (default **off**). Tidak ada dark mode (palet Maroon & Cream dipertahankan). |
| 6 | Form kontak "berfungsi" tetapi Vercel hanya hosting statis | Gunakan **WhatsApp deep link** (tanpa backend) + **Formspree/EmailJS** untuk email. Lihat §2.5. |
| 7 | Aset (`.glb`, sertifikat) hanya disebut "path sederhana" | Ditetapkan **konvensi path** di `TASK.md` §1 dan skema data di §4 di bawah. |
| 8 | Tech stack di draft belum lengkap vs CV | Ditambah PowerPoint, Google Drive, InShot, KNIME, SVM/CRISP-DM, FTK Imager & Autopsy (lihat §2.4). |
| 9 | Nama komponen React Bits (mis. `radient`, `specular button`, `fuse button`, `call chip`, `rubber segment`, `swipe toast`, `bell toggle`, `split flap text`) | **Verifikasi nama persis & ketersediaannya di reactbits.dev sebelum coding.** Jika ada yang tidak ditemukan, gunakan fallback di `STYLING.md` §3. Daftar animasi tetap dipertahankan semua. |
| 10 | Deploy "langsung dari Antigravity ke Vercel" | Jalur paling aman: **push ke GitHub → Import di Vercel** (atau `vercel` CLI). Pastikan fitur deploy dari Antigravity memang tersedia di akunmu; jika tidak, pakai jalur GitHub. |

---

## 1. Project Overview

Website portofolio interaktif berbentuk *Single Page Application* untuk **Rahmi Atika** — Fresh Graduate Teknik Informatika (STT Terpadu Nurul Fikri, IPK 3.88/4.00) yang berfokus pada **pengarsipan digital, pengelolaan data, dan operasional layanan**.

**Tujuan utama**
1. Membuat rekruter paham siapa Rahmi dan nilai jualnya dalam < 10 detik (hero).
2. Menunjukkan bukti nyata: proyek, sertifikat, keahlian.
3. Mendorong satu aksi: **menghubungi** atau **mengunduh CV**.

**Target pengunjung:** rekruter/HRD, hiring manager administrasi & data, klien proyek web kecil.

**Indikator keberhasilan**
- Lighthouse (mobile): Performance ≥ 80, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.
- LCP < 3 s di 4G; bundle awal (sebelum lazy chunk 3D) < 300 KB gzip.
- Semua CTA (Unduh CV, Hubungi Saya, WhatsApp) berfungsi di desktop dan mobile.
- Tidak ada layout shift saat splash berakhir.

---

## 2. User Flow & Struktur Halaman

Urutan: **Splash → Hero → About → Showcase → Contact**, ditambah halaman detail proyek `/projects/:slug`.

### 2.1. Opening Sequence (Splash Screen)

* **Durasi total:** ~4 detik (minimum 3 s, maksimum 6 s jika aset 3D belum siap).
* **Animasi:** `split flap text`.
* **Copy (final):**
  * Baris utama (flap): **"Welcome to my portfolio website"**
  * Sub-baris (fade-in setelah flap selesai): **"Rahmi Atika · Informatics Engineer"**
  * Tagline kecil: *"Merapikan data, mendigitalkan proses."*
  * Tombol kecil kanan bawah: **"Lewati ›"**
* **Timeline:**
  | Waktu | Aksi |
  |---|---|
  | 0.0–0.4 s | Layar cream polos, garis emas tipis (progress) mulai terisi |
  | 0.4–2.6 s | Split flap menuliskan baris utama |
  | 2.6–3.4 s | Sub-baris + tagline fade-in |
  | 3.4–4.0 s | Overlay memudar (opacity + sedikit `translateY(-8px)`), hero masuk |
* **Perilaku teknis:**
  * Overlay `fixed inset-0 z-[100]`, body `overflow: hidden` selama splash.
  * Splash **memicu preload** `rahmi.glb` dan aset lanyard; tidak ditutup sebelum min. 3 s **dan** (aset siap **atau** 6 s tercapai).
  * Tampil **sekali per sesi** (`sessionStorage.introSeen`); kunjungan ulang/refresh langsung ke hero.
  * `prefers-reduced-motion`: ganti flap dengan teks statis + fade 0.4 s, durasi 1.5 s.
  * Tombol "Lewati" juga bisa ditekan `Esc`/`Enter`.

### 2.2. Header (Hero Section)

* **Layout:** dua kolom (desktop) — teks kiri, `Lanyard` kanan. Mobile: teks di atas, lanyard di bawah dengan tinggi terbatas (≈ 60vh) atau fallback gambar statis.
* **Konten & copy:**
  * Eyebrow: *"Halo, saya"*
  * Nama: **Rahmi Atika** — `stroke text`
  * Role (`rotating text`): **Informatics Engineer** → **Digital Archiving Specialist** → **Data Management**
  * Headline resmi (LinkedIn, dipakai sebagai `<h2>` kecil/ SEO): *Fresh Graduate Teknik Informatika | Administrative & Digital Archiving Specialist | Data Management*
  * Value statement (2 baris): *"Lulusan Teknik Informatika yang terbiasa merapikan data, mendigitalkan dokumen, dan menjaga operasional tetap akurat."*
  * Chip bukti (tanpa animasi berlebih): `IPK 3.88` · `NFSCC HUB` · `PKL Telkom Indonesia`
* **CTA:**
  * **"Unduh CV"** — `fuse button` (primer, maroon). Mengunduh `/assets/cv/CV_Rahmi_Atika.pdf` (atribut `download`).
  * **"Hubungi Saya"** — `fuse button` varian outline. Scroll halus ke Contact (bukan membuka modal langsung).
* **Interaksi:** `lanyard` menampilkan kartu ID dengan foto Rahmi (tekstur kartu perlu dibuat khusus, lihat `TASK.md` Phase 2).

### 2.3. About Section

* **Judul seksi:** *"Tentang Saya"*
* **Paragraf (`blur text`, sumber: LinkedIn & CV — jangan ubah fakta):**
  > Fresh Graduate Teknik Informatika dari Sekolah Tinggi Teknologi Terpadu Nurul Fikri dengan keahlian dalam pengarsipan digital, pengelolaan data, serta operasional layanan. Berpengalaman merancang sistem informasi manajemen organisasi (NFSCC HUB) untuk mendigitalisasi dokumen penyuratan, presensi, dan laporan operasional. Memiliki pengalaman praktik kerja lapangan di Telkom Indonesia dalam mengelola administrasi data pelanggan harian dan migrasi data dengan akurasi tinggi. Menguasai Microsoft Office dan Google Workspace, serta memiliki pemahaman dasar dalam pengembangan web dan analisis data.
* **Statistik (`count up`, dipicu saat masuk viewport, sekali saja):**
  | Nilai | Label | Sumber |
  |---|---|---|
  | 3.88 (desimal 2) | IPK dari 4.00 | CV |
  | 11 | Sertifikat & kegiatan | `certificates.json` (hitung dari `.length`) |
  | 5 | Proyek | `projects.js` (hitung dari `.length`) |
  | 8 | Program kerja nasional dikawal (NFSCC) | CV |
  | 100% | Akurasi migrasi data (Telkom) | CV — tampilkan statis, bukan count-up |
* **Visual:** `profile card` dengan `model viewer` (GLB karakter 3D) di bagian atas kartu. Kontrol: auto-rotate, drag untuk memutar, zoom dimatikan (hindari bentrok scroll di mobile).
* **Transisi Hero → About:** `animated scroll` (lanyard "menyerahkan" perhatian ke profile card: lanyard menyusut/bergeser saat scroll, profile card naik masuk). Jika berat/tidak stabil di mobile → ganti dengan parallax + fade sederhana.
* **Pendidikan** (default: **Education Timeline**; `dome gallery` opsional jika ada foto):
  1. **Sekolah Tinggi Teknologi Terpadu Nurul Fikri** — S1 Teknik Informatika, **IPK 3.88 / 4.00**, 2022–2026, Depok. Penelitian: *Rancang Bangun Front-End Dashboard Nurul Fikri Student CyberSecurity Community Berbasis Web Menggunakan ReactJS.* Mata kuliah relevan: Basis Data, Visualisasi Data, UI/UX, Manajemen Proyek, Komunikasi Efektif, Integrasi Sistem, Etika Profesi.
  2. **SMK Negeri 19 Jakarta** — Multimedia, 2019–2022, Jakarta Pusat.
* **Pengalaman singkat (kartu kecil di bawah pendidikan):** NFSCC — Humas (2024–2025) dan Telkom Indonesia PKL — Access Data & Management (Feb–Apr 2021). Gunakan poin-poin CV, maksimal 2 poin per kartu.

### 2.4. Portfolio Showcase

Navigasi: `pill nav` (+ efek `rubber segment` pada indikator aktif) dengan 3 tab: **Projects · Certificates · Tech Stack**.

#### Tab 1 — Projects
Grid kartu (1 kolom mobile, 2 kolom tablet, 3 kolom desktop). Klik kartu → **halaman detail** `/projects/:slug`.

| Slug | Judul | Tahun | Ringkasan (dari CV) | Tag |
|---|---|---|---|---|
| `nfscc-hub` | NFSCC HUB — Website Manajemen Organisasi | 2026 | Sistem informasi manajemen terintegrasi berbasis React untuk mendigitalisasi pengarsipan, keuangan, proker, dan penyuratan organisasi. | React, Dashboard, Arsip Digital |
| `kelayakan-kredit` | Analisis Kelayakan Kredit Nasabah | 2025 | Proyek akhir Studi Independen (PT Nurul Fikri Cipta Inovasi / NF Academy). Algoritma SVM via KNIME dengan kerangka CRISP-DM; akurasi prediksi kredit **78%**. | KNIME, SVM, CRISP-DM |
| `digital-forensik` | Digital Forensik untuk Investigasi Pasca-Kejadian Platform & Web Cybersecurity | 2024 | Studi Independen (PT Analis Forensik Digital). Investigasi serangan ransomware HRMS dengan FTK Imager & Autopsy, identifikasi eksploit CVE-2022-30190, rekomendasi IDS/WAF. | FTK Imager, Autopsy, IDS/WAF |
| `atk-lamy` | E-Commerce ATK-Lamy | 2023 | Situs e-commerce Alat Tulis Kantor berbasis PHP dengan antarmuka responsif. | PHP, E-Commerce |
| `sdit-ar-rohim` | Landing Page SDIT Ar-Rohim | 2022 | Landing page interaktif berbasis HTML/CSS untuk mendigitalisasi profil dan program sekolah. | HTML, CSS |

Struktur halaman detail: tombol "← Kembali" (kembali ke tab Projects dengan posisi scroll terjaga) → judul + tahun + tag → gambar/screenshot (opsional) → *Latar belakang*, *Peran*, *Hasil* → tautan (demo/repo jika ada) → "Proyek berikutnya".
> Konten *Latar belakang / Peran / Hasil* yang belum ada di CV ditulis oleh Rahmi (lihat §8 Open Items). **Jangan mengarang metrik.**

#### Tab 2 — Certificates (11 item dari `certificates.json`)
* Grid `tilted card` (efek 3D mengikuti kursor; di perangkat sentuh efek tilt dimatikan).
* Tiap kartu: thumbnail sertifikat, judul, penerbit, tahun.
* Klik → **Popup Modal**: gambar resolusi lebih besar, judul, penerbit, peran, tanggal, kategori, Credential ID (jika ada), tombol **✕**, serta **‹ ›** untuk berpindah antar-sertifikat.
* Filter kategori (opsional, chip kecil di atas grid): Cybersecurity · Data Analytics · Leadership · Community · Seminar. Data kategori sudah ada di JSON.

#### Tab 3 — Tech Stack (Keahlian)
Grid logo, dikelompokkan, hover *scale-up* + label.

| Grup | Item (sesuai CV) |
|---|---|
| Office & Workspace | Microsoft Word / Google Docs · Microsoft Excel / Google Sheets · Microsoft PowerPoint · Google Drive |
| Design & Video | Canva · CapCut · InShot |
| Web | ReactJS · PHP · HTML/CSS |
| Data & Security | KNIME · FTK Imager · Autopsy |

Tampilkan juga *soft skills* sebagai chip teks (Adaptif, Manajemen Waktu, Komunikasi, Kerja Sama Tim, Problem Solving) dan Bahasa (Indonesia — Aktif, Inggris — Basic).

### 2.5. Contact Me (CTA)

* **Layout:** blok penutup lebar penuh, latar maroon, teks cream.
* **Copy (final):**
  * Eyebrow: *"Let's work together"*
  * Judul: **"Mari bangun alur kerja yang lebih rapi, bersama."**
  * Isi: *"Sedang mencari tim administrasi, pengarsipan digital, atau data management yang teliti, komunikatif, dan cepat belajar? Saya siap berkontribusi — dari merapikan dokumen hingga membangun sistem kecil yang membuat tim bekerja lebih efisien."*
  * Tombol (`specular button`): **"Mulai Percakapan"**
  * Microcopy bawah tombol: *"Atau kirim email langsung ke rahmiatika231@gmail.com"* (klik = salin → `swipe toast` "Email disalin ✓")
* **Popup form** (judul: *"Kirim pesan"*, subjudul: *"Ceritakan kebutuhan Anda — saya akan membalas secepatnya."*):
  | Field | Validasi |
  |---|---|
  | Nama | wajib, min. 2 karakter |
  | Email | wajib, format email |
  | Instansi / Perusahaan | opsional |
  | Pesan | wajib, min. 10 karakter |
  * Dua aksi: **"Kirim via Email"** (POST ke Formspree/EmailJS) dan **"Lanjut ke WhatsApp"** (buka `https://wa.me/6281386426793?text=<pesan terenkode>`).
  * Template teks WhatsApp: *"Halo Rahmi, saya {nama} dari {instansi}. {pesan}"*
  * Toast sukses: **"Pesan terkirim. Terima kasih, saya akan segera membalas."** · Toast gagal: **"Gagal mengirim. Coba lagi atau hubungi lewat WhatsApp."**
  * Honeypot field tersembunyi untuk anti-spam; tombol dinonaktifkan saat *submitting*.
* **Footer:** tautan LinkedIn, Email, WhatsApp, © 2026 Rahmi Atika.
* **Privasi:** nomor telepon tidak perlu ditampilkan sebagai teks di halaman; cukup tersirat lewat tautan `wa.me`.

### 2.6. Global Micro-Interactions

* `call chip` — chip melayang di pojok kanan bawah ("Hubungi" + ikon), membuka modal kontak yang sama. Disembunyikan saat seksi Contact terlihat.
* `bell toggle` — pojok kanan atas navbar; mengaktifkan/mematikan **suara UI & toast** (default off, tersimpan di `localStorage`).
* `swipe toast` — semua notifikasi (salin email, form, error).
* `target cursor` — hanya perangkat dengan pointer halus (`(pointer: fine)`); disembunyikan di touch dan di dalam input form.
* `animated content` — pembungkus reveal untuk tiap seksi (sekali saja, bukan berulang).

---

## 3. Panduan Manajemen State

**Prinsip:** state sesedikit dan selokal mungkin. **Tidak perlu Redux/Zustand** untuk proyek ini. Cukup `useState` + `useSearchParams` + 2 Context kecil.

### 3.1. Peta state

| State | Lokasi | Alat |
|---|---|---|
| Tab aktif Showcase | **URL** (`?tab=projects`) | `useSearchParams` |
| Filter kategori sertifikat | Lokal `CertificatesTab` | `useState` |
| Sertifikat terbuka (modal) | Lokal `CertificatesTab` | `useState(selectedId)` |
| Modal kontak terbuka | Global ringan | `ContactModalContext` |
| Toast | Global ringan | `ToastContext` |
| Intro selesai | Global | `useState` + `sessionStorage` |
| Sound/bell on-off | Global | `useState` + `localStorage` |

### 3.2. Pill Nav (tab filter portofolio)

**Single source of truth = URL.** Keuntungan: tombol *Back* peramban bekerja, bisa di-*share* (`/?tab=certificates#showcase`), dan kembali dari halaman detail proyek langsung ke tab yang benar.

```jsx
// src/components/sections/Showcase/Showcase.jsx
import { useSearchParams } from "react-router-dom";

const TABS = ["projects", "certificates", "tech-stack"];

export default function Showcase() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("tab");
  const tab = TABS.includes(raw) ? raw : "projects"; // validasi → fallback aman

  const changeTab = (next) =>
    setParams({ tab: next }, { replace: true, preventScrollReset: true });

  return (
    <section id="showcase">
      <PillTabs value={tab} onChange={changeTab} items={TABS} />
      {tab === "projects" && <ProjectsTab />}
      {tab === "certificates" && <CertificatesTab />}
      {tab === "tech-stack" && <TechStackTab />}
    </section>
  );
}
```

Catatan:
* `PillNav` bawaan React Bits dirancang sebagai navbar berbasis link. **Bungkus/adaptasi** menjadi komponen *controlled* (`value` + `onChange`) agar bisa dipakai sebagai tab. Indikator `rubber segment` dianimasikan berdasarkan posisi (`offsetLeft/offsetWidth`) tombol aktif.
* Gunakan `replace: true` agar pergantian tab tidak membanjiri riwayat peramban.
* Render **hanya tab aktif** (conditional) atau bungkus `AnimatePresence mode="wait"` untuk transisi; jangan menyimpan data ketiga tab di state terpisah.
* Aksesibilitas: `role="tablist"`, tiap tombol `role="tab"` + `aria-selected`, panel `role="tabpanel"`, navigasi panah kiri/kanan.

### 3.3. Popup Modal Sertifikat

**Simpan `id`, bukan objek.** Data selalu diturunkan dari array → tidak ada data ganda yang bisa tidak sinkron.

```jsx
// src/components/sections/Showcase/CertificatesTab.jsx
const [selectedId, setSelectedId] = useState(null);
const selected = certificates.find((c) => c.id === selectedId) ?? null;

const index = certificates.findIndex((c) => c.id === selectedId);
const prev = () => setSelectedId(certificates[(index - 1 + certificates.length) % certificates.length].id);
const next = () => setSelectedId(certificates[(index + 1) % certificates.length].id);

<AnimatePresence>
  {selected && (
    <CertificateModal
      cert={selected}
      onClose={() => setSelectedId(null)}
      onPrev={prev}
      onNext={next}
    />
  )}
</AnimatePresence>
```

Persyaratan modal (`CertificateModal`):
* Render lewat **`createPortal(…, document.body)`** dengan `z-[90]` (di bawah splash `z-[100]`, di atas navbar/chip).
* **Scroll lock** saat terbuka (`document.body.style.overflow = "hidden"`, dikembalikan saat *cleanup*).
* Tutup dengan: tombol ✕, klik backdrop, tombol `Esc`. Navigasi ‹ › dengan panah keyboard.
* **Focus trap**: fokus pindah ke tombol tutup saat buka; kembali ke kartu pemicu saat tutup. `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
* Gambar besar: `loading="lazy"` untuk thumbnail, gambar resolusi penuh dimuat saat modal terbuka (`decoding="async"`).
* (Opsional) deep link: sinkronkan `selectedId` dengan hash `#cert-5`.

### 3.4. Modal Kontak, Toast, dan Intro

```jsx
// src/context/UIContext.jsx — cukup satu context kecil
const UIContext = createContext(null);
export function UIProvider({ children }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem("introSeen") === "1"
  );
  const [soundOn, setSoundOn] = useState(
    () => localStorage.getItem("soundOn") === "1"
  );
  // …persist effect, lalu sediakan lewat value
  return <UIContext.Provider value={{ contactOpen, setContactOpen, introDone, setIntroDone, soundOn, setSoundOn }}>{children}</UIContext.Provider>;
}
```
`ToastContext` terpisah: `toast.show({ type, message })` → antrean maksimal 3, auto-dismiss 3 s. Karena modal kontak dipicu dari 3 tempat (tombol Hero, tombol Contact, `call chip`), state-nya **harus** global; yang lain tidak.

---

## 4. Skema Data (Source of Truth)

Seluruh konten tinggal di `src/data/` agar komponen tidak berisi teks keras (*hard-coded*).

**`certificates.json`** — gunakan file `gemini-code-….json` yang sudah ada, lalu **tambahkan** field:
```json
{
  "id": 7,
  "title": "Microsoft Excel: Data Visualization",
  "issuer": "MySkill",
  "role": "Short Class Completion",
  "date": "2024-04-24",
  "credentialId": "142843/EXL/LM/04/2024",
  "category": "Data Analytics",
  "thumb": "/assets/certificates/thumbs/cert-07.webp",
  "image": "/assets/certificates/cert-07.webp",
  "description": "(1–2 kalimat, diisi Rahmi)"
}
```
Catatan data: item `11` (NFSCC IT Club Member) dan beberapa lain memiliki `date: null` → UI harus menampilkan "—" atau menyembunyikan baris tanggal, **jangan** menampilkan teks "null". Urutkan default: terbaru dulu (item tanpa tanggal di akhir).

**`projects.js`**
```js
export const projects = [
  {
    slug: "nfscc-hub",
    title: "NFSCC HUB — Website Manajemen Organisasi",
    year: 2026,
    summary: "…",
    tags: ["React", "Dashboard"],
    cover: "/assets/projects/nfscc-hub/cover.webp",
    gallery: [],
    role: "", result: "", links: { demo: "", repo: "" }
  },
  // …4 proyek lain
];
```

**`skills.js`**: array grup → item `{ name, logo: "/assets/logos/excel.svg" }`.

---

## 5. Persyaratan Non-Fungsional

* **Performa:** `React.lazy` + `Suspense` untuk Lanyard, ModelViewer, DomeGallery. Canvas 3D hanya di-*mount* saat terlihat (`IntersectionObserver`) dan di-*unmount*/`frameloop="never"` saat keluar viewport. Batasi DPR (`dpr={[1, 1.5]}`). GLB < 3 MB (Draco), gambar sertifikat WebP.
* **Responsif:** *mobile-first*; breakpoint 640 / 768 / 1024 / 1280.
* **Aksesibilitas:** kontras teks ≥ 4.5:1 (emas **bukan** warna teks di atas cream), fokus terlihat, `prefers-reduced-motion` mematikan semua animasi dekoratif, alt text untuk semua gambar.
* **SEO & Share:** `<title>`, meta description, Open Graph (gambar 1200×630), favicon, `lang="id"`.
* **Fallback WebGL:** jika `WebGL` tidak tersedia atau perangkat lemah → tampilkan gambar statis lanyard/karakter.
* **Keamanan:** variabel `VITE_*` bersifat **publik** — hanya taruh Form ID Formspree/Public Key EmailJS, **jangan** secret key.

---

## 6. Rute

| Path | Halaman |
|---|---|
| `/` | Satu halaman: Hero · About · Showcase · Contact (anchor `#home #about #showcase #contact`) |
| `/projects/:slug` | Detail proyek |
| `*` | Halaman 404 bertema (tombol kembali ke `/`) |

---

## 7. Di Luar Cakupan (v1)

Blog, multi-bahasa, CMS, dark mode, analitik berbayar. (Analitik ringan seperti Vercel Analytics boleh ditambahkan belakangan.)

---

## 8. Open Items — Perlu Konfirmasi / Dilengkapi Rahmi

1. **Gambar sertifikat:** nama file final & format (disarankan `cert-01.webp` … `cert-11.webp`).
2. **Konten detail 5 proyek:** peran, hasil, screenshot, tautan demo/repo (jangan menambah klaim yang tidak ada di CV).
3. **Tautan LinkedIn** (URL profil) untuk footer.
4. **Layanan form email:** Formspree atau EmailJS? (atau cukup WhatsApp saja di v1).
5. **Klaim "dibalas dalam 1×24 jam"** — hanya dipakai jika Rahmi memang sanggup.
6. **Foto untuk kartu lanyard** dan **hasil GLB Meshy** (karakter 3D).
7. **Dome Gallery:** ada foto kampus/kegiatan? Jika tidak → pakai Education Timeline saja.
8. Apakah nomor telepon boleh tampil sebagai teks, atau cukup lewat tombol WhatsApp.
