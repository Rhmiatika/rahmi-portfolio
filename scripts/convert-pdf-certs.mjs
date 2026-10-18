/**
 * scripts/convert-pdf-certs.mjs
 * Konversi 2 PDF image-based ke WebP menggunakan pdfjs-dist + sharp
 * PDF-nya berisi gambar embedded (bukan teks), jadi kita render halaman ke image
 */
import sharp from "sharp";
import { readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SERTIF_DIR = path.join(ROOT, "asset/sertif");
const CERT_OUT = path.join(ROOT, "public/assets/certificates");
const THUMB_OUT = path.join(CERT_OUT, "thumbs");

async function ensureDir(d) { if (!existsSync(d)) await mkdir(d, { recursive: true }); }
await ensureDir(CERT_OUT);
await ensureDir(THUMB_OUT);

// PDF image-based: extract embedded images from each PDF page
const pdfCerts = [
  { file: "Salinan RAHMI ATIKA (1).pdf", id: "09" },  // ORMIK 2022
  { file: "Salinan Rahmi Atika.pdf",     id: "03" },  // ASTRO 2023 Volunteer
];

for (const { file, id } of pdfCerts) {
  const fullPath = path.join(SERTIF_DIR, file);
  const data = new Uint8Array(await readFile(fullPath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  // Extract all image objects from page 1
  const page = await pdf.getPage(1);
  const ops = await page.getOperatorList();
  const imgNames = [];
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
      imgNames.push(ops.argsArray[i][0]);
    }
  }

  if (imgNames.length === 0) {
    console.log(`⚠ No embedded images in ${file} — skipping`);
    continue;
  }

  // Get largest image
  let bestImg = null;
  let bestSize = 0;
  for (const name of imgNames) {
    const img = await page.objs.get(name);
    if (img && img.data) {
      const sz = img.width * img.height;
      if (sz > bestSize) { bestSize = sz; bestImg = img; }
    }
  }

  if (!bestImg) {
    console.log(`⚠ Could not extract image from ${file}`);
    continue;
  }

  const { width, height, data: imgData, kind } = bestImg;
  // Detect channels: kind===1 means RGBA (4ch), kind===2 means RGB (3ch), or infer from data length
  const totalPixels = width * height;
  const dataLen = imgData.length;
  const channels = dataLen === totalPixels * 4 ? 4 : dataLen === totalPixels * 3 ? 3 : 4;
  const rawBuf = Buffer.from(imgData);
  const fullDst = path.join(CERT_OUT, `cert-${id}.webp`);
  const thumbDst = path.join(THUMB_OUT, `cert-${id}.webp`);

  await sharp(rawBuf, { raw: { width, height, channels } })
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(fullDst);

  await sharp(rawBuf, { raw: { width, height, channels } })
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbDst);

  const full = existsSync(fullDst) ? (await import("fs")).statSync(fullDst).size : 0;
  console.log(`✓ cert-${id} (${file}) — full: ${(full/1024).toFixed(0)} KB`);
}

console.log("✅ PDF cert conversion done");
