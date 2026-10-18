/**
 * scripts/process-all-assets.mjs
 * Proses semua aset baru:
 * A. IMG_5370.JPG → rahmi-formal.webp (foto studio, dipakai untuk About + Lanyard)
 * B. asset/Kegiatan → public/assets/kegiatan/ (6 foto, WebP 1200px + thumbs 600px)
 * C. asset/project → public/assets/projects/ (cover + gallery per proyek)
 */
import sharp from "sharp";
import { readdir, mkdir, copyFile } from "fs/promises";
import { existsSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

async function ensureDir(d) { if (!existsSync(d)) await mkdir(d, { recursive: true }); }

async function toWebP(src, dst, maxW = 1200, quality = 85) {
  await sharp(src)
    .resize({ width: maxW, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dst);
  const kb = Math.round(statSync(dst).size / 1024);
  console.log(`  ✓ ${path.basename(dst)} — ${kb} KB`);
}

// ─── A. Foto formal studio ────────────────────────────────────────────────────
console.log("\n=== A. Foto formal ===");
const imagesOut = path.join(ROOT, "public/assets/images");
await ensureDir(imagesOut);

await toWebP(
  path.join(ROOT, "asset/IMG_5370.JPG"),
  path.join(imagesOut, "rahmi-formal.webp"),
  1200, 88
);
// Versi portrait crop untuk lanyard card (square 600x600)
await sharp(path.join(ROOT, "asset/IMG_5370.JPG"))
  .resize(600, 600, { fit: "cover", position: "top" })
  .webp({ quality: 88 })
  .toFile(path.join(imagesOut, "rahmi-lanyard.webp"));
console.log(`  ✓ rahmi-lanyard.webp (600x600 crop)`);

// ─── B. Foto kegiatan ─────────────────────────────────────────────────────────
console.log("\n=== B. Foto kegiatan ===");
const kegiatanSrc = path.join(ROOT, "asset/Kegiatan-20261018T005847Z-1-001/Kegiatan");
const kegiatanOut = path.join(ROOT, "public/assets/kegiatan");
const kegiatanThumb = path.join(kegiatanOut, "thumbs");
await ensureDir(kegiatanOut);
await ensureDir(kegiatanThumb);

const kegiatanFiles = (await readdir(kegiatanSrc))
  .filter(f => /\.(jpe?g|png)$/i.test(f));

for (let i = 0; i < kegiatanFiles.length; i++) {
  const src = path.join(kegiatanSrc, kegiatanFiles[i]);
  const id = String(i + 1).padStart(2, "0");
  await toWebP(src, path.join(kegiatanOut, `kegiatan-${id}.webp`), 1200, 82);
  await toWebP(src, path.join(kegiatanThumb, `kegiatan-${id}.webp`), 500, 75);
}

// ─── C. Screenshot proyek ─────────────────────────────────────────────────────
console.log("\n=== C. Proyek assets ===");

// NFSCC HUB — cover + gallery
const nfsccSrc = path.join(ROOT, "asset/project/NFSCC HUB-20261018T005758Z-1-001/NFSCC HUB");
const nfsccOut = path.join(ROOT, "public/assets/projects/nfscc-hub");
await ensureDir(nfsccOut);

// Cover = NFSCC HUB 1.png (screenshot besar)
await toWebP(
  path.join(nfsccSrc, "NFSCC HUB 1.png"),
  path.join(nfsccOut, "cover.webp"),
  1200, 85
);

// Gallery = semua localhost_5173_*.png
const nfsccGallery = (await readdir(nfsccSrc)).filter(f => f.startsWith("localhost_"));
for (let i = 0; i < nfsccGallery.length; i++) {
  const src = path.join(nfsccSrc, nfsccGallery[i]);
  const dstName = nfsccGallery[i].replace(/[^a-zA-Z0-9.]/g, "-").replace(/-+/g, "-") + ".webp";
  await toWebP(src, path.join(nfsccOut, `gallery-${String(i+1).padStart(2,"0")}.webp`), 1200, 82);
}

// ATK Lamy
const atkOut = path.join(ROOT, "public/assets/projects/atk-lamy");
await ensureDir(atkOut);
await toWebP(path.join(ROOT, "asset/project/ATK Lamy 1.png"), path.join(atkOut, "cover.webp"), 1200, 85);
await toWebP(path.join(ROOT, "asset/project/ATK Lamy 2.png"), path.join(atkOut, "gallery-02.webp"), 1200, 82);

// SDIT Ar-Rohim
const sditOut = path.join(ROOT, "public/assets/projects/sdit-ar-rohim");
await ensureDir(sditOut);
await toWebP(path.join(ROOT, "asset/project/SDIT Arrahim.png"), path.join(sditOut, "cover.webp"), 1200, 85);

console.log("\n✅ Semua aset selesai diproses");
