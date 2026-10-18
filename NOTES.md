# NOTES.md — Catatan Pengembangan Portofolio Rahmi Atika

> File ini diperbarui setiap kali ada keputusan penting, temuan React Bits, atau item TODO.

---

## TODO — Perlu Input / Keputusan Rahmi

- [x] **Foto profil Hero:** `rahmi.webp` (santai/kasual) — dikonfirmasi Rahmi
- [x] **Foto About/Profile Card:** `rahmi-formal.webp` (studio, lebih profesional) — diputuskan AI, dikonfirmasi Rahmi
- [x] **Foto kegiatan NFSCC:** OK tampil publik (kegiatan-01..06, aktivitas NFSCC) — dikonfirmasi Rahmi
- [x] **Education Dome Gallery:** pakai kegiatan-01..06 untuk STT-NF sementara; foto kuliah/wisuda asli menyusul
- [x] **Education placeholders:** `stt-nf.webp` dan `smk.webp` (maroon/cream gradient) tersedia di `/assets/education/`
- [x] **GitHub remote:** `https://github.com/Rhmiatika/rahmi-portfolio.git` — tersambung
- [x] **Push ke GitHub:** BERHASIL 2026-10-18, 263 objects, 71.43 MiB ✅
- [ ] **Deploy Vercel:** import repo `Rhmiatika/rahmi-portfolio` di vercel.com (lihat langkah di bawah)
- [ ] **Foto wisuda / foto kampus STT-NF:** taruh di `asset/` → proses ke `public/assets/education/stt-nf-real.webp` dan update `gallery[]` di `profile.js`
- [ ] **Foto SMK (opsional):** taruh di `asset/` → proses ke `public/assets/education/smk-real.webp`
- [ ] **Konten detail proyek:** peran, hasil, screenshot, link demo/repo untuk 5 proyek — **diisi Rahmi** (PRD §8 item 2)
- [ ] **Formspree/EmailJS:** daftar akun → isi `VITE_FORMSPREE_ID` di Vercel env — opsional v1
- [ ] **[PERLU KEPUTUSAN] skills.js — item tidak ada di CV/LinkedIn:**
  - `InShot` (grup Design & Video) — tidak disebutkan di CV. Hapus atau tambahkan ke CV?
  - `FTK Imager` & `Autopsy` (grup Data & Security) — ada di kurikulum TI tapi tidak disebutkan eksplisit di CV/LinkedIn. Tampilkan atau sembunyikan?
- [ ] **[PERLU KEPUTUSAN] LinkedIn di Footer:** `profile.contact.linkedin` sudah terisi `https://www.linkedin.com/in/rahmi-atika/` → LinkedIn **tampil** di footer. Jika ingin disembunyikan, hapus nilai atau ganti ke `""` di `profile.js`.

- [ ] **Foto kartu Lanyard:** tekstur kartu maroon/cream — Phase 3

---

## Keputusan Desain

| Tanggal | Keputusan |
|---|---|
| 2026-10-18 | Foto 1 (`05.51.57.jpeg`) → `rahmi.webp` sebagai foto profil Hero — dikonfirmasi Rahmi |
| 2026-10-18 | Foto About/Profile Card: `rahmi-formal.webp` (foto studio, lebih profesional) — diputuskan bersama |
| 2026-10-18 | Kontak v1: WhatsApp deep link + salin email. Formspree/EmailJS stub disiapkan |
| 2026-10-18 | CV: tombol Unduh aktif `/assets/cv/CV_Rahmi_Atika.pdf` |
| 2026-10-18 | Proyek: data dari CV saja. Tidak ada klaim di luar CV |
| 2026-10-18 | Model 3D: `rahmi.glb` Draco 496 KB sebagai placeholder hingga model Meshy final |
| 2026-10-18 | Phase 2 audit: `canvas` di-uninstall; `sharp` tetap devDependency |
| 2026-10-18 | cert-05: "Kuliah Umum Digital Transformation, 22 Feb 2024" — COCOK dengan JSON |
| 2026-10-18 | Foto kegiatan NFSCC: OK tampil publik (bukan foto pribadi sensitif) — konfirmasi Rahmi |
| 2026-10-18 | Education: Dome Gallery aktif untuk STT-NF dengan kegiatan-01..06 sementara; SMK pakai Timeline |
| 2026-10-18 | GitHub: `https://github.com/Rhmiatika/rahmi-portfolio.git` — remote tersambung |
| 2026-10-18 | Tech Stack: Logo CapCut diperbarui ke vektor resmi ByteDance (squircle hitam + ikon pita) |
| 2026-10-18 | Layout: Margin/spacing antara About dan Portofolio diperkecil agar lebih proporsional |
| 2026-10-18 | Mobile UX: Card Pengalaman (NFSCC) diperbaiki agar pill periode (2024–2025) & lokasi (Depok) konsisten berada di sisi kanan pada mobile |
| 2026-10-18 | Responsive Split: Pemisahan tegas styling FHD (≥1400px: 60:40, font besar 6.25rem+, lanyard 0.46, padding murni 32px) dan Laptop HD (1024–1399px: 65:35, font 3.65rem, lanyard 0.41, padding 60px skala 15 via `.portfolio-container`) |
| 2026-10-18 | Typography & Padding Harmony: Nama header FHD diperbesar sedikit (6.75rem+), deskripsi diselaraskan identik di semua section (0.88rem di HD laptop, 1.05rem di FHD), dan padding HD laptop dinaikkan ke 80px (5rem, skala 20-25) |

---

## Rencana Pemakaian Aset Baru (di luar STYLING.md §8)

| Aset | Path | Rencana Pemakaian |
|---|---|---|
| `rahmi-formal.webp` | `/assets/images/rahmi-formal.webp` | **About / Profile Card** (lebih profesional dari kasual) |
| `rahmi-lanyard.webp` | `/assets/images/rahmi-lanyard.webp` | Alternatif tekstur kartu Lanyard — Phase 3 |
| `kegiatan-01..06.webp` | `/assets/kegiatan/` | **HOLD** — lihat kebijakan di bawah |
| Gallery NFSCC HUB (9 gambar) | `/assets/projects/nfscc-hub/gallery-*.webp` | Galeri halaman detail `/projects/nfscc-hub` |
| Gallery ATK Lamy (1 gambar) | `/assets/projects/atk-lamy/gallery-02.webp` | Galeri halaman detail `/projects/atk-lamy` |
| Cover SDIT Ar-Rohim | `/assets/projects/sdit-ar-rohim/cover.webp` | Cover kartu proyek |

---

## Kebijakan Education Placeholder (WAJIB DIBACA Phase 3)

> **`stt-nf.webp` dan `smk.webp` di `/assets/education/` adalah PLACEHOLDER gradient — BUKAN foto asli.**

Aturan untuk Phase 3:
- **Education Timeline:** tampilkan tanpa `<img>` jika foto asli belum ada. Gunakan ikon institusi atau warna latar saja.
- **Dome Gallery STT-NF:** JANGAN diaktifkan dulu. Tunggu konfirmasi Rahmi soal foto kegiatan (lihat seksi kegiatan di bawah).
- **Saat foto asli tersedia:** Rahmi taruh di `asset/` → AI proses → timpa file di `/assets/education/` → hapus `_note` placeholder.
- **`smk.webp`:** hanya placeholder, belum ada foto asli SMK.

---

## Audit Foto Kegiatan (kegiatan-01..06) — HOLD

> **Semua 6 foto memuat orang lain yang teridentifikasi jelas. JANGAN dipakai di Dome Gallery sebelum Rahmi konfirmasi.**

| File | Deskripsi | Orang Lain Terlihat Jelas? | Status |
|---|---|---|---|
| `kegiatan-01.webp` | Foto bersama di ruang kelas/aula besar (sepertinya foto grup NFSCC besar) | **YA — puluhan orang** | HOLD |
| `kegiatan-02.webp` | Anggota NFSCC berseragam di kelas, ada yang menatap kamera | **YA — wajah jelas** | HOLD |
| `kegiatan-03.webp` | Foto grup besar aula, banyak peserta | **YA — banyak orang** | HOLD |
| `kegiatan-04.webp` | Rapat NFSCC, beberapa orang dari belakang/samping | **YA — ada wajah terlihat** | HOLD |
| `kegiatan-05.webp` | Satu orang presentasi di depan layar (orientasi miring) | **YA — satu orang jelas** | HOLD |
| `kegiatan-06.webp` | Evaluasi/presentasi divisi, beberapa orang berdiri di depan | **YA — wajah jelas** | HOLD |

**Aksi yang dibutuhkan dari Rahmi:**
- [ ] Konfirmasi apakah foto kegiatan-01 s/d 06 BOLEH dipublikasikan di portofolio
- [ ] Jika ya semua: Dome Gallery aktif dengan ke-6 foto tersebut
- [ ] Jika tidak semua: pilih mana yang boleh, sisanya diganti foto lain atau Dome Gallery dinonaktifkan

---

---

## React Bits — Status Verifikasi

> Nama komponen di PRD/STYLING perlu diverifikasi di reactbits.dev sebelum digunakan.
> Akan diisi saat Phase 3 coding.

| Nama di PRD/STYLING | Nama Persis di reactbits.dev | Status | Fallback |
|---|---|---|---|
| `target cursor` | TargetCursor | ✅ File ada di `reactbits/TargetCursor.jsx` | — |
| `animated content` | AnimatedContent | ✅ File ada di `reactbits/AnimatedContent.jsx` | — |
| `radient` | Radient | ✅ File ada di `reactbits/Radient.jsx` | — |
| `swipe toast` | SwipeToast | ✅ File ada di `reactbits/SwipeToast.jsx` | — |
| `split flap text` | **SplitFlapText** (dikonfirmasi via reactbits.dev) | ✅ Custom fallback — CATATAN: reactbits.dev hanya CLI/shadcn; dibuat custom berkualitas tinggi (flip board papan cream, teks maroon, garis gold) | Custom CSS flip animation |
| `stroke text` | **StrokeText** (dikonfirmasi via reactbits.dev) | ✅ Custom fallback — CSS `-webkit-text-stroke`, fill animate on load/hover | CSS `text-stroke` |
| `rotating text` | **RotatingText** (dikonfirmasi via reactbits.dev) | ✅ Implemented — `motion/react` AnimatePresence slide-up | `motion` AnimatePresence |
| `fuse button` | **FuseButton** (dikonfirmasi via reactbits.dev) | ✅ Custom fallback — ripple effect, primer maroon + outline, min-h 48px | Custom button CSS |
| `lanyard` | **Lanyard** (dikonfirmasi via reactbits.dev) | ✅ **Source asli dari registry JSON** (pure Three.js, 47 KB) — `frontImage` prop untuk foto, no external GLB needed | Foto statis (`LanyardFallback`) |
| `blur text` | **BlurText** | ✅ Custom — kata per kata blur-fade, IntersectionObserver once, reduced-motion. reactbits.dev hanya punya CLI. | Custom IntersectionObserver |
| `count up` | **CountUp** | ✅ Custom — ease-out-quad, viewport trigger once, decimals, suffix support | Custom hook |
| `model viewer` | — | ⏳ Ditunda ke Phase 4 — foto formal statis dipakai di ProfileCard About. **Revisi pemilik** | Foto statis `rahmi-formal.webp` |
| `profile card` | **ProfileCard** | ✅ Custom — foto formal 3:4, overlay gradient maroon, badge, border tipis | CSS custom |
| `tilted card` | **TiltedCard** | ✅ Custom — CSS 3D tilt mengikuti kursor mouse (`perspective(600px)` + rotateX/Y), hover scale, smooth reset transition | Hover scale CSS |
| `pill nav` | **PillTabs** | ✅ Custom — controlled navigation tersinkronisasi dengan URL search params `?tab=...`, ARIA tablist/tab/tabpanel, keyboard focus | Custom tab component |
| `dome gallery` | — | Dinonaktifkan — menunggu foto asli dari Rahmi (HOLD, lihat seksi foto kegiatan) | Education Timeline (default) |
| `specular button` | **SpecularButton** | ✅ Custom fallback — specular highlight radial-gradient bergerak mengikuti kursor, ripple on click, tampilan cream/gold di atas maroon, min-h 52px | Custom CSS mousemove |
| `call chip` | **CallChip** | ✅ Custom fallback — FAB fixed bottom-right, buka ContactModal via UIContext, sembunyi saat #contact terlihat (IntersectionObserver), safe-area-inset-bottom iOS, 390px aman | Custom IntersectionObserver |
| `rubber segment` | **RubberSegment** | ✅ Custom — elastic spring indicator (`cubic-bezier(0.34, 1.56, 0.64, 1)`) pada PillTabs bergerak mulus mengikuti tab aktif | motion layout spring |
| `bell toggle` | — | ⏳ Diverifikasi Phase 4 | Custom toggle |

---

## Phase 3.4 — Deviasi & Catatan Implementasi (2026-10-18)

| Item | Deviasi / Catatan |
|---|---|
| **PillTabs & URL Sync** | Controlled tab navigation (`Projects`, `Certificates`, `Tech Stack`) dengan URL search params `?tab=projects\|certificates\|tech-stack`. `useSearchParams` dengan `{ replace: true, preventScrollReset: true }` menjaga histori browser tetap bersih |
| **RubberSegment Indicator** | Transisi indikator tab menggunakan kalkulasi `getBoundingClientRect` dinamis dengan easing kurva elastis spring maroon (`cubic-bezier(0.34, 1.56, 0.64, 1)`) |
| **Code Splitting (Lazy Tabs)** | `ProjectsGrid`, `CertificatesGrid`, dan `TechStackGrid` di-lazy load terpisah via `React.lazy` + `Suspense`, menjaga bundle awal tetap kecil (< 10 kB total chunk) |
| **TiltedCard (Certificates)** | Dibuat dengan CSS 3D matrix transform kalkulasi real-time kursor mouse (-0.5 s/d 0.5 X/Y) memberikan efek kedalaman interaktif tanpa menambah library berat |
| **CertificateModal (Portal & A11y)** | Render via `createPortal` ke `document.body`, mendukung keyboard navigation (`Escape` untuk tutup, `ArrowLeft`/`ArrowRight` untuk prev/next sertifikat), focus trap, scroll lock, dan backdrop click dismiss |
| **ProjectDetail & Galeri** | Halaman `/projects/:slug` dilengkapi dengan tombol kembali ke `/?tab=projects#showcase`, cover proyek, galeri screenshot dengan interaksi lightbox modal navigasi, peran, hasil, link demo/repo, dan tautan otomatis ke proyek berikutnya |
| **Tech Stack & Logo SVGs** | 16 logo SVG resmi/standar (MS Office, Google Workspace, Canva, CapCut, HTML/CSS/PHP/React, FTK Imager, Autopsy, KNIME) dibuat di `public/assets/logos/` lengkap dengan fallback initial badge jika ada kegagalan load |

---

## Revisi Pemilik — Sesi Showcase & Standardisasi (2026-10-18)

| Item | Revisi & Penyesuaian |
|---|---|
| **Keselarasan Tema & Judul Showcase** | Mengganti judul kustom Showcase dengan komponen standar `<SectionHeading eyebrow="Portofolio" title="Karya & Keahlian" />` agar font dan warna marun/gold identik 100% dengan section About & Hero; menghapus background kontras berlebih dan menyelaraskan gradien krem halus. |
| **Kartu Proyek Lebih Kompak** | Padding kartu proyek diperkecil (`p-3.5 sm:p-4`), ukuran tipografi dan tag disesuaikan agar lebih ringkas, rasio thumbnail 16:10, dan gap grid diperketat (`gap-4 sm:gap-5`). |
| **Backdrop Modal Sertifikat & Lightbox** | Menghapus semburat merah pada backdrop popup modal, diganti dengan blur netral gelap yang elegan (`bg-black/75 backdrop-blur-md`); tombol silang (✕) diubah menjadi putih bersih dengan hover merah menyala (`hover:bg-red-600 hover:text-white`). |
| **Tech Stack Square Cards** | Kartu keahlian (`SkillLogo`) diubah menjadi rasio kotak 1:1 (`aspect-square`) dengan tata letak ikon dan nama skill yang rapi terpusat di tengah kartu. |
| **Konsistensi Kata Ganti ("Aku")** | Mengubah seluruh kata ganti "saya" menjadi "aku" di seluruh komponen publik portofolio: "Tentang Saya" → "Tentang Aku", "Siapa Saya" → "Siapa Aku", "Hubungi Saya" → "Hubungi Aku", "Peran Saya" → "Peran Aku", dan "Saya siap berkontribusi" → "Aku siap berkontribusi". |
| **Logo Tech Stack (Brand Resmi)** | 13 logo brand resmi disimpan lokal di `public/assets/logos/`. Sumber: vscode-icons via Iconify (Word/Excel/PPT), logos via Iconify (Google Drive, React, PHP, HTML5, CSS3), simple-icons+warna brand (Google Docs biru, Google Sheets hijau, Canva teal, KNIME kuning). CapCut dibuat sendiri — tidak tersedia di Simple Icons/Iconify. |
| **CapCut logo** | ⚠️ Buatan sendiri (kotak hitam + segitiga play + garis cut). Jika logo resmi tersedia di Simple Icons di masa depan, ganti `/assets/logos/capcut.svg`. |
| **Kartu Tech Stack Kompak** | Revisi pemilik: kartu diperkecil ke `w-24 h-24` (96px) di mobile dan `w-28 h-28` (112px) di sm+. flex-wrap justify-start gap-3, min 3 kartu per baris di 390px. Logo 40-44px object-contain. `motion-reduce:transition-none` aktif. |


---

---

## Phase 3.1/3.2 — Deviasi & Catatan Implementasi (2026-10-18)

| Item | Deviasi / Catatan |
|---|---|
| **SplitFlapText** | reactbits.dev hanya punya CLI (shadcn), tidak bisa di-fetch HTML source. Dibuat custom high-fidelity: papan cream-50, teks maroon, garis tengah gold, stagger per karakter. CLI install (`npx shadcn`) gagal karena network timeout. Dicatat di NOTES.md per instruksi STYLING.md §3 |
| **StrokeText** | reactbits.dev: nama sama, source tidak bisa di-extract. Custom: `-webkit-text-stroke` 2px maroon, fill transparan → maroon setelah 600ms load + hover. `paintOrder: stroke fill` agar teks tidak terpotong |
| **RotatingText** | Custom dengan `motion/react` AnimatePresence slide-up (y: 100%→0%→-100%), interval 2.5s, aria-live polite |
| **FuseButton** | Custom: ripple (fuse spark) via DOM injection on click, primer maroon/cream, outline maroon, `min-h-[44px]/[52px]`, mendukung `as` prop untuk `<a>` tag |
| **Lanyard** | **SOURCE ASLI dari reactbits.dev registry JSON** (`Lanyard-JS-TW.json`, 47 KB, pure Three.js). Tidak butuh `card.glb`/`lanyard.png` eksternal — geometri dan tekstur di-generate procedurally. `frontImage` prop diisi `/assets/images/rahmi-lanyard.webp` |
| **Lanyard card.glb/lanyard.png** | Tidak dibutuhkan (Lanyard pure Three.js). `public/assets/lanyard/` hanya berisi `.gitkeep`. Dicatat sebagai R2 sudah resolved |
| **Tekstur kartu Lanyard kustom** | `frontImage={profile.photoLanyard}` diset ke `rahmi-lanyard.webp`. **TODO**: crop 600×600 portrait agar terlihat bagus di kartu. Saat ini foto penuh |
| **Preload GLB** | Menggunakan `<link rel="preload" as="fetch">` bukan `useGLTF.preload` (Lanyard tidak pakai @react-three/fiber). Preload dilakukan di `useEffect` Splash |
| **Foto Wisuda (Education)** | 3 foto asli dari `asset/foto kuliah wisuda/` berhasil dikonversi ke WebP di `public/assets/education/` dan ditampilkan di kartu STT Nurul Fikri dengan lightbox preview interaktif |
| **Foto Kegiatan (NFSCC)** | 5 foto asli dari `asset/Kegiatan-20261018T005847Z-1-001/` dikonversi ke WebP di `public/assets/kegiatan/` (`nfscc-01` s.d. `nfscc-05`) dan ditampilkan di kartu NFSCC dengan galeri interaktif + LightboxModal navigasi prev/next |
| **Foto PKL (Telkom)** | 4 foto asli dari `asset/kegiatan telkom/` dikonversi ke WebP di `public/assets/telkom/` (`telkom-01` s.d. `telkom-04`) dan ditampilkan di kartu Telkom Indonesia dengan label "Dokumentasi PKL" + LightboxModal navigasi prev/next |
| **Spacing Section About** | Padding atas pada `#about` dikurangi dari `py-20 sm:py-28` menjadi `pt-6 sm:pt-10 pb-20 sm:pb-28` agar judul "Siapa Saya / Tentang Saya" lebih dekat ke Hero section |
| **Favicon 1:1 Presisi** | Favicon diganti dengan crop proporsional 1:1 (circular badge marun-emas + multi-resolusi 16px, 32px, 180px, 192px) dari foto formal agar tidak gepeng di tab browser |
| **Judul Tab & Meta** | Diselaraskan menjadi "Rahmi Atika — Administrative & Digital Archiving, Data Management" di `index.html` dan `profile.js` |
| **Three.js shader warning** | Console menampilkan standard Three.js WebGL shader precision warnings — bukan error aplikasi, tidak perlu ditangani |

---

## Git & Deploy — Langkah untuk Rahmi

```bash
# 1. Buat repo GitHub (jalankan di terminal, atau via github.com → New Repository)
git remote add origin https://github.com/<username>/rahmi-portfolio.git
git push -u origin master

# 2. Import di Vercel
# Buka https://vercel.com → Add New → Project → Import Git Repository
# Pilih repo di atas
# Framework Preset : Vite
# Build Command    : npm run build
# Output Directory : dist
# Klik Deploy

# 3. Isi Environment Variables di Vercel (Settings → Environment Variables):
# VITE_WHATSAPP_NUMBER = 6281386426793
# VITE_CONTACT_EMAIL   = rahmiatika231@gmail.com
# VITE_FORMSPREE_ID    = (kosongkan dulu, isi saat Formspree aktif)

# 4. Redeploy setelah set env vars.
# 5. Uji: buka URL Vercel, refresh di /projects/nfscc-hub → tidak 404
```

---

## Risiko Aktif

| # | Risiko | Status |
|---|---|---|
| R1 | GLB karakter model final (Meshy) | ⏳ Placeholder `rahmi.glb` sudah ada; ganti saat model Meshy selesai |
| R2 | `card.glb` + `lanyard.png` | ✅ **Resolved** — Lanyard pure Three.js, tidak butuh aset eksternal |
| R3 | Nama komponen React Bits berbeda | ✅ Diverifikasi semua Phase 3.1/3.2 (lihat tabel di atas) |
| R4 | LinkedIn URL sudah diisi | ✅ `https://www.linkedin.com/in/rahmi-atika/` |
| R5 | CV PDF tersedia | ✅ 186 KB di `/assets/cv/CV_Rahmi_Atika.pdf` |
| R6 | Form email (Formspree/EmailJS) | ⏳ Stub sudah siap; aktifkan saat Rahmi daftar akun |
| R7 | Lanyard chunk 587 KB (gzip 151 KB) | ✅ Sudah di-split via `React.lazy` — dimuat saat kolom kanan terlihat |
| R8 | Tekstur foto Lanyard kustom | ⏳ `rahmi-lanyard.webp` belum di-crop 600×600 — tampil foto penuh sementara |

