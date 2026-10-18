# NOTES.md — Catatan Pengembangan Portofolio Rahmi Atika

> File ini diperbarui setiap kali ada keputusan penting, temuan React Bits, atau item TODO.

---

## TODO — Perlu Input Rahmi

- [ ] **Foto profil:** Konfirmasi apakah menggunakan `WhatsApp Image 2026-10-18 at 05.51.57.jpeg` (Foto 1 — rekomendasi) atau foto lain. Setelah dikonfirmasi, simpan sebagai `public/assets/images/rahmi.webp`.
- [ ] **URL LinkedIn:** Isi placeholder `https://linkedin.com/in/rahmiatika` di `src/data/profile.js`.
- [ ] **CV:** Taruh file `CV_Rahmi_Atika.pdf` di `public/assets/cv/`. Tombol "Unduh CV" sudah mengarah ke path yang benar.
- [ ] **Pemetaan sertifikat:** 11 file di `asset/sertif/` perlu dicocokkan ke 11 item `certificates.json` (3 PDF harus dikonversi ke WebP dulu). Dilakukan di Phase 2.
- [ ] **Konten detail proyek:** Peran, hasil, screenshot, link demo/repo untuk 5 proyek. Jangan mengarang — diisi Rahmi.
- [ ] **Formspree/EmailJS:** Ditunda. Kode sudah disiapkan. Isi `VITE_FORMSPREE_ID` di Vercel Environment Variables kapan saja.
- [ ] **Suara UI (bell toggle):** File suara belum tersedia. Toggle tetap berfungsi secara visual; suara diaktifkan saat file tersedia.

---

## Keputusan Desain

| Tanggal | Keputusan |
|---|---|
| 2026-10-18 | Foto 1 (`05.51.57.jpeg`) direkomendasikan sebagai foto profil — menunggu konfirmasi Rahmi |
| 2026-10-18 | Kontak v1: WhatsApp deep link + salin email. Formspree/EmailJS stub disiapkan untuk aktivasi mudah |
| 2026-10-18 | CV: tombol Unduh aktif dengan path `/assets/cv/CV_Rahmi_Atika.pdf`; file ditaruh Rahmi |
| 2026-10-18 | Proyek: data dari CV saja (judul, tahun, ringkasan, tag). Tidak ada klaim di luar CV |
| 2026-10-18 | Model 3D: `rahmi.glb` (6.1 MB) dipakai sebagai placeholder; kompresi Draco saat Phase 2 |

---

## React Bits — Status Verifikasi

> Nama komponen di PRD/STYLING perlu diverifikasi di reactbits.dev sebelum digunakan.
> Diisi saat Phase 2–3.

| Nama di PRD/STYLING | Nama Persis di reactbits.dev | Status | Fallback |
|---|---|---|---|
| `split flap text` | — | ⏳ Belum diverifikasi | Animasi custom CSS |
| `stroke text` | — | ⏳ Belum diverifikasi | CSS `text-stroke` |
| `rotating text` | — | ⏳ Belum diverifikasi | `motion` AnimatePresence |
| `blur text` | — | ⏳ Belum diverifikasi | `motion` whileInView |
| `count up` | — | ⏳ Belum diverifikasi | Custom hook |
| `lanyard` | — | ⏳ Belum diverifikasi | Gambar statis |
| `model viewer` | — | ⏳ Belum diverifikasi | Gambar statis |
| `profile card` | — | ⏳ Belum diverifikasi | Kartu CSS biasa |
| `tilted card` | — | ⏳ Belum diverifikasi | Hover scale CSS |
| `pill nav` | — | ⏳ Belum diverifikasi | Custom tab component |
| `dome gallery` | — | ⏳ Belum diverifikasi | Education Timeline (default) |
| `specular button` | — | ⏳ Belum diverifikasi | Custom button CSS |
| `fuse button` | — | ⏳ Belum diverifikasi | Custom button CSS |
| `call chip` | — | ⏳ Belum diverifikasi | Fixed button custom |
| `rubber segment` | — | ⏳ Belum diverifikasi | motion layout spring |
| `swipe toast` | — | ⏳ Belum diverifikasi | Custom toast |
| `bell toggle` | — | ⏳ Belum diverifikasi | Custom toggle |
| `radient` | — | ⏳ Belum diverifikasi | CSS radial-gradient animated |
| `target cursor` | — | ⏳ Belum diverifikasi | Native cursor |
| `animated content` | — | ⏳ Belum diverifikasi | `motion` whileInView |

---

## Risiko Aktif

| # | Risiko | Status |
|---|---|---|
| R1 | GLB karakter 6.1 MB — perlu Draco | ⏳ Phase 2 |
| R2 | 3 sertifikat PDF perlu konversi ke WebP | ⏳ Phase 2 |
| R3 | `card.glb` + `lanyard.png` belum ada | ⏳ Ambil dari repo React Bits di Phase 3 |
| R4 | Nama komponen React Bits berbeda | ⏳ Verifikasi di Phase 2 sebelum install |
| R5 | LinkedIn URL kosong | ⏳ Menunggu Rahmi |
| R6 | CV PDF belum ada | ⏳ Menunggu Rahmi |
