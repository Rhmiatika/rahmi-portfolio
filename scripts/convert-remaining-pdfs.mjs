/**
 * scripts/convert-remaining-pdfs.mjs
 * Konversi 3 PDF sertifikat yang belum diproses ke WebP
 * Semua PDF ini berbasis gambar (teks tidak extractable) atau teks minimal
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
await ensureDir(CERT_OUT); await ensureDir(THUMB_OUT);

// 3 PDF yang belum dikonversi
const pdfCerts = [
  { file: "Rahmi Atika - Sertifikat Kuliah Umum Semester Ganjil TA 2022_2023.pdf", id: "04" },
  { file: "Rahmi Atika - Sertifikat Kuliah Umum STT Terpadu Nurul Fikri TA 2022_2023 Genap.pdf", id: "05" },
  { file: "Salinan Rahmi Atika - E-Certif SC Data Visualization MySkill.pdf", id: "07" },
];

for (const { file, id } of pdfCerts) {
  const fullPath = path.join(SERTIF_DIR, file);
  const data = new Uint8Array(await readFile(fullPath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const page = await pdf.getPage(1);
  const ops = await page.getOperatorList();
  
  // Collect all image object names
  const imgNames = [];
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject ||
        ops.fnArray[i] === pdfjsLib.OPS.paintInlineImageXObject) {
      if (ops.argsArray[i]?.[0]) imgNames.push(ops.argsArray[i][0]);
    }
  }

  // Also check for form XObjects that contain images
  console.log(`${file}: found ${imgNames.length} image ops`);

  if (imgNames.length === 0) {
    // Try to get page common objects
    console.log(`  → No direct images, trying commonObjs...`);
    // Wait for page rendering to populate objs
    try {
      const viewport = page.getViewport({ scale: 2.0 });
      // For text-based PDFs with embedded images, we need a different approach
      // Use page dimensions to create a placeholder with metadata
      console.log(`  → Page size: ${viewport.width}x${viewport.height} (scale 2)`);
    } catch(e) { console.log('  error:', e.message); }
    console.log(`  ⚠ Skipping ${id} — no images found (text-based PDF)`);
    continue;
  }

  let bestImg = null, bestSize = 0;
  for (const name of imgNames) {
    try {
      const img = page.objs.get(name);
      if (img?.data) {
        const sz = img.width * img.height;
        if (sz > bestSize) { bestSize = sz; bestImg = img; }
      }
    } catch(e) { /* skip */ }
  }

  if (!bestImg) {
    console.log(`  ⚠ Could not extract image data from ${file}`);
    continue;
  }

  const { width, height, data: imgData } = bestImg;
  const totalPixels = width * height;
  const channels = imgData.length === totalPixels * 4 ? 4 :
                   imgData.length === totalPixels * 3 ? 3 : 4;
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

  console.log(`  ✓ cert-${id} — ${(existsSync(fullDst) ? (await import("fs")).statSync(fullDst).size / 1024 : 0).toFixed(0)} KB`);
}
console.log("✅ Done");
