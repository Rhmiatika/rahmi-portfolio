/**
 * scripts/fix-cert05.mjs
 * Khusus cert-05: ambil gambar dari PDF dengan commonObjs (lazy loaded)
 */
import sharp from "sharp";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const file = "Rahmi Atika - Sertifikat Kuliah Umum STT Terpadu Nurul Fikri TA 2022_2023 Genap.pdf";
const fullPath = path.join(ROOT, "asset/sertif", file);

const data = new Uint8Array(await readFile(fullPath));
const pdf = await pdfjsLib.getDocument({ data }).promise;
const page = await pdf.getPage(1);
const ops = await page.getOperatorList();

// Trigger image loading by waiting for objs to populate
const imgNames = [];
for (let i = 0; i < ops.fnArray.length; i++) {
  if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
    imgNames.push(ops.argsArray[i][0]);
  }
}
console.log("Image names:", imgNames);

// Wait for all images to be resolved
await Promise.all(imgNames.map(name => page.objs.ensure(name)));

let bestImg = null, bestSize = 0;
for (const name of imgNames) {
  const img = page.objs.get(name);
  console.log(name, "→", img ? `${img.width}x${img.height} ch:${img.data?.length}` : "null");
  if (img?.data) {
    const sz = img.width * img.height;
    if (sz > bestSize) { bestSize = sz; bestImg = img; }
  }
}

if (bestImg) {
  const { width, height, data: imgData } = bestImg;
  const totalPixels = width * height;
  const channels = imgData.length === totalPixels * 4 ? 4 :
                   imgData.length === totalPixels * 3 ? 3 : 4;
  const rawBuf = Buffer.from(imgData);
  const outFull = path.join(ROOT, "public/assets/certificates/cert-05.webp");
  const outThumb = path.join(ROOT, "public/assets/certificates/thumbs/cert-05.webp");
  await sharp(rawBuf, { raw: { width, height, channels } }).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 85 }).toFile(outFull);
  await sharp(rawBuf, { raw: { width, height, channels } }).resize({ width: 600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(outThumb);
  console.log("✓ cert-05 done");
} else {
  console.log("⚠ No image found — cert-05 will remain null (text-based PDF with vector graphics)");
}
