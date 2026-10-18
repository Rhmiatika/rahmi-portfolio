# NOTES.md — Catatan Pengembangan Portofolio Rahmi Atika

> File ini diperbarui setiap kali ada keputusan penting, temuan React Bits, atau item TODO.

---

## TODO — Perlu Input / Keputusan Rahmi

- [x] **Foto profil:** ✅ `rahmi.webp` (55 KB), `rahmi-2/3.webp`, `og-image.jpg` (1200×630) — selesai Phase 2
- [x] **CV:** ✅ `public/assets/cv/CV_Rahmi_Atika.pdf` tersalin (186 KB)
- [x] **Model 3D:** ✅ `rahmi.glb` dikompres Draco → 496 KB (dari 6.1 MB, -92%)
- [x] **Sertifikat 11/11:** ✅ cert-01..cert-11 + thumbs lengkap — selesai Phase 2 audit
- [x] **cert-05:** ✅ Kuliah Umum Digital Transformation, 22 Feb 2024, No. 513/Sert/WK-1/STT-NF/II/2024 — gambar bersih
- [x] **cert-07:** ✅ MySkill Short Class Data Visualization, 24 Apr 2024, No. 142843/EXL/LM/04/2024 — gambar bersih
- [x] **URL LinkedIn:** ✅ `https://www.linkedin.com/in/rahmi-atika/` — sudah di `profile.js`
- [ ] **Foto kartu Lanyard:** Perlu tekstur kartu maroon/cream — Phase 3 task
- [ ] **Konten detail proyek:** Peran, hasil, screenshot, link demo/repo untuk 5 proyek — **diisi Rahmi** (PRD §8 item 2)
- [ ] **Formspree/EmailJS:** Ditunda v1. Isi `VITE_FORMSPREE_ID` di Vercel env kapan saja.
- [ ] **Suara UI (bell toggle):** Kode siap; file audio `.mp3` belum tersedia. Tombol disembunyikan hingga ada audio.
- [ ] **Dome Gallery:** Ada foto kegiatan di `public/assets/kegiatan/` (6 foto) — **keputusan Rahmi**: pakai Dome Gallery atau Education Timeline saja?
- [ ] **Deploy GitHub → Vercel:** Langkah di seksi "Git & Deploy" di bawah — dijalankan Rahmi

---

## Keputusan Desain

| Tanggal | Keputusan |
|---|---|
| 2026-10-18 | Foto 1 (`05.51.57.jpeg`) → `rahmi.webp` sebagai foto profil utama — dikonfirmasi Rahmi |
| 2026-10-18 | Kontak v1: WhatsApp deep link + salin email. Formspree/EmailJS stub disiapkan untuk aktivasi mudah |
| 2026-10-18 | CV: tombol Unduh aktif dengan path `/assets/cv/CV_Rahmi_Atika.pdf` |
| 2026-10-18 | Proyek: data dari CV saja (judul, tahun, ringkasan, tag). Tidak ada klaim di luar CV |
| 2026-10-18 | Model 3D: `rahmi.glb` Draco 496 KB sebagai placeholder hingga model Meshy final tersedia |
| 2026-10-18 | Phase 2 audit: `canvas` di-uninstall; `sharp` tetap sebagai devDependency untuk pengolahan aset |
| 2026-10-18 | cert-05 konfirmasi: isi = "Kuliah Umum Digital Transformation, 22 Feb 2024" — COCOK dengan JSON |
| 2026-10-18 | Foto yg ada orang lain di latar: kegiatan-01 s/d kegiatan-06 — **keputusan Rahmi** apakah oke tampil di publik |

---

## Rencana Pemakaian Aset Baru (di luar STYLING.md §8)

| Aset | Path | Rencana Pemakaian |
|---|---|---|
| `rahmi-formal.webp` | `/assets/images/rahmi-formal.webp` | Foto formal studio (lanyard card atau About card) |
| `rahmi-lanyard.webp` | `/assets/images/rahmi-lanyard.webp` | Foto potensial untuk tekstur kartu Lanyard |
| `kegiatan-01..06.webp` | `/assets/kegiatan/` | **Opsional** Dome Gallery di About §2.3 — belum aktif; tunggu keputusan Rahmi |
| Gallery NFSCC HUB (9 gambar) | `/assets/projects/nfscc-hub/gallery-*.webp` | Galeri halaman detail `/projects/nfscc-hub` |
| Gallery ATK Lamy (1 gambar) | `/assets/projects/atk-lamy/gallery-02.webp` | Galeri halaman detail `/projects/atk-lamy` |
| Cover SDIT Ar-Rohim | `/assets/projects/sdit-ar-rohim/cover.webp` | Cover kartu proyek |

**Foto yang memuat orang lain di latar:** `kegiatan-01` sampai `kegiatan-06` — **perlu konfirmasi Rahmi** sebelum ditampilkan di halaman publik.

**Usulan pemakaian foto profil (keputusan Rahmi):**

| Foto | Format | Usulan |
|---|---|---|
| `rahmi.webp` | Santai/kasual, 55 KB | **Hero** — foto utama (sudah dipilih Rahmi) |
| `rahmi-formal.webp` | Formal studio, 29 KB | **Profile Card** di About — tampilan lebih profesional |
| `rahmi-lanyard.webp` | Crop 600×600, 16 KB | Alternatif tekstur kartu Lanyard |
| `og-image.jpg` | 1200×630 | Open Graph / share preview — sudah set di `<meta>` |

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
| `split flap text` | — | ⏳ Diverifikasi Phase 3 | Animasi custom CSS |
| `stroke text` | — | ⏳ Diverifikasi Phase 3 | CSS `text-stroke` |
| `rotating text` | — | ⏳ Diverifikasi Phase 3 | `motion` AnimatePresence |
| `blur text` | — | ⏳ Diverifikasi Phase 3 | `motion` whileInView |
| `count up` | — | ⏳ Diverifikasi Phase 3 | Custom hook |
| `lanyard` | — | ⏳ Diverifikasi Phase 3 | Gambar statis |
| `model viewer` | — | ⏳ Diverifikasi Phase 3 | Gambar statis |
| `profile card` | — | ⏳ Diverifikasi Phase 3 | Kartu CSS biasa |
| `tilted card` | — | ⏳ Diverifikasi Phase 3 | Hover scale CSS |
| `pill nav` | — | ⏳ Diverifikasi Phase 3 | Custom tab component |
| `dome gallery` | — | ⏳ Diverifikasi Phase 3 | Education Timeline (default) |
| `specular button` | — | ⏳ Diverifikasi Phase 3 | Custom button CSS |
| `fuse button` | — | ⏳ Diverifikasi Phase 3 | Custom button CSS |
| `call chip` | — | ⏳ Diverifikasi Phase 3 | Fixed button custom |
| `rubber segment` | — | ⏳ Diverifikasi Phase 3 | motion layout spring |
| `bell toggle` | — | ⏳ Diverifikasi Phase 3 | Custom toggle |

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
| R2 | `card.glb` + `lanyard.png` belum ada | ⏳ Ambil dari repo React Bits di Phase 3 |
| R3 | Nama komponen React Bits berbeda | ⏳ Verifikasi saat Phase 3 coding per-komponen |
| R4 | LinkedIn URL sudah diisi | ✅ `https://www.linkedin.com/in/rahmi-atika/` |
| R5 | CV PDF tersedia | ✅ 186 KB di `/assets/cv/CV_Rahmi_Atika.pdf` |
| R6 | Form email (Formspree/EmailJS) | ⏳ Stub sudah siap; aktifkan saat Rahmi daftar akun |
