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
| `tilted card` | — | ⏳ Diverifikasi Phase 3.4 | Hover scale CSS |
| `pill nav` | — | ⏳ Diverifikasi Phase 3.4 | Custom tab component |
| `dome gallery` | — | Dinonaktifkan — menunggu foto asli dari Rahmi (HOLD, lihat seksi foto kegiatan) | Education Timeline (default) |
| `specular button` | — | ⏳ Diverifikasi Phase 3.5 | Custom button CSS |
| `call chip` | — | ⏳ Diverifikasi Phase 4 | Fixed button custom |
| `rubber segment` | — | ⏳ Diverifikasi Phase 3.4 | motion layout spring |
| `bell toggle` | — | ⏳ Diverifikasi Phase 4 | Custom toggle |

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

