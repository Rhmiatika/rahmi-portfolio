/**
 * scripts/convert-assets.mjs
 * Konversi foto profil dan sertifikat ke WebP menggunakan sharp
 * Tidak menyentuh folder asset/ — hanya salin + konversi ke public/
 */
import sharp from "sharp";
import { readFile, writeFile, mkdir, copyFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

// ─── A. FOTO PROFIL ────────────────────────────────────────────────────────────
const GAMBAR = path.join(ROOT, "asset/gambar");
const IMAGES_OUT = path.join(ROOT, "public/assets/images");
await ensureDir(IMAGES_OUT);

const photoMap = [
  { src: "WhatsApp Image 2026-10-18 at 05.51.57.jpeg",    dst: "rahmi.webp",   maxW: 1200 },
  { src: "WhatsApp Image 2026-10-18 at 05.51.58 (1).jpeg", dst: "rahmi-2.webp", maxW: 1200 },
  { src: "WhatsApp Image 2026-10-18 at 05.51.58 (2).jpeg", dst: "rahmi-3.webp", maxW: 1200 },
];

for (const { src, dst, maxW } of photoMap) {
  const srcPath = path.join(GAMBAR, src);
  const dstPath = path.join(IMAGES_OUT, dst);
  await sharp(srcPath)
    .resize({ width: maxW, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(dstPath);
  const { size } = (await import("fs")).statSync(dstPath);
  console.log(`✓ ${dst} — ${(size / 1024).toFixed(0)} KB`);
}

// ─── OG IMAGE 1200×630 dari Foto 1 ────────────────────────────────────────────
const ogSrc = path.join(GAMBAR, "WhatsApp Image 2026-10-18 at 05.51.57.jpeg");
const ogDst = path.join(IMAGES_OUT, "og-image.jpg");

// Foto 1 adalah portrait ~700px wide. Kita resize ke 1200 tinggi, crop center 1200×630
await sharp(ogSrc)
  .resize(1200, 1200, { fit: "contain", background: { r: 245, g: 245, b: 220, alpha: 1 } }) // cream bg
  .extract({ left: 0, top: 285, width: 1200, height: 630 }) // ambil bagian tengah
  .jpeg({ quality: 85 })
  .toFile(ogDst);
const ogStat = (await import("fs")).statSync(ogDst);
console.log(`✓ og-image.jpg — ${(ogStat.size / 1024).toFixed(0)} KB`);

// ─── B. SERTIFIKAT (hanya JPG/PNG — PDF dihandle terpisah) ────────────────────
const SERTIF_SRC = path.join(ROOT, "asset/sertif");
const CERT_OUT = path.join(ROOT, "public/assets/certificates");
const THUMB_OUT = path.join(CERT_OUT, "thumbs");
await ensureDir(CERT_OUT);
await ensureDir(THUMB_OUT);

// Mapping: {srcFile, certId} — hanya JPG/PNG (PDF menyusul)
const certMap = [
  // ID disesuaikan setelah pemetaan dikonfirmasi
  { src: "Salinan Rahmi Atika.jpg",      id: "02" }, // Pra Latihan Dasar Manajemen Kepemimpinan
  { src: "Salinan Rahmi Atika (1).jpg",  id: "08" }, // Talkshow Pendidikan Seksual
  { src: "Salinan Rahmi Atika (2).jpg",  id: "03" }, // GDSC Member
  { src: "Rahmi Atika.png",              id: "06" }, // Webinar Red Team (NFSCC Cyber)
  { src: "Salinan Rahmi Atika.png",      id: "11" }, // NFSCC IT Club Member
  { src: "Salinan Rahmi Atika (1).png",  id: "10" }, // Webinar Blue Team (NFSCC Cyber)
];

for (const { src, id } of certMap) {
  const srcPath = path.join(SERTIF_SRC, src);
  const certDst = path.join(CERT_OUT, `cert-${id}.webp`);
  const thumbDst = path.join(THUMB_OUT, `cert-${id}.webp`);

  await sharp(srcPath)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(certDst);

  await sharp(srcPath)
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbDst);

  const full = (await import("fs")).statSync(certDst).size;
  const thumb = (await import("fs")).statSync(thumbDst).size;
  console.log(`✓ cert-${id} | full: ${(full/1024).toFixed(0)} KB | thumb: ${(thumb/1024).toFixed(0)} KB`);
}

console.log("\n✅ Konversi selesai. PDF harus dikonversi secara manual (lihat catatan).");
