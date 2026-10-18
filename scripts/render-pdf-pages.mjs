/**
 * scripts/render-pdf-pages.mjs
 * Render halaman pertama PDF cert-05 dan cert-07 ke PNG via pdfjs-dist (legacy build)
 * kemudian konversi ke WebP dengan sharp.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { existsSync, readFileSync, writeFileSync, statSync } from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { createCanvas } from "canvas";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

async function ensureDir(d) { if (!existsSync(d)) await mkdir(d, { recursive: true }); }

// Import pdfjs-dist legacy — use pathToFileURL for Windows compatibility
const pdfjsPath = path.join(ROOT, "node_modules/pdfjs-dist/legacy/build/pdf.mjs");
const pdfjsLib = await import(pathToFileURL(pdfjsPath).href);


const PDFS = [
  {
    id: "cert-05",
    src: path.join(ROOT, "asset/sertif/Rahmi Atika - Sertifikat Kuliah Umum STT Terpadu Nurul Fikri TA 2022_2023 Genap.pdf"),
  },
  {
    id: "cert-07",
    src: path.join(ROOT, "asset/sertif/Salinan Rahmi Atika - E-Certif SC Data Visualization MySkill.pdf"),
  },
];

const certOut   = path.join(ROOT, "public/assets/certificates");
const thumbsOut = path.join(ROOT, "public/assets/certificates/thumbs");
await ensureDir(certOut);
await ensureDir(thumbsOut);

for (const { id, src } of PDFS) {
  console.log(`\nRendering ${id}...`);
  try {
    const data = new Uint8Array(readFileSync(src));
    const loadingTask = pdfjsLib.getDocument({ data, useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const scale = 2.5;
    const viewport = page.getViewport({ scale });

    const canvas = createCanvas(Math.round(viewport.width), Math.round(viewport.height));
    const ctx = canvas.getContext("2d");

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;

    const pngBuf = canvas.toBuffer("image/png");
    const tmpPng = path.join(ROOT, `scripts/tmp-${id}.png`);
    writeFileSync(tmpPng, pngBuf);

    // Convert to WebP full
    await sharp(tmpPng)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 87 })
      .toFile(path.join(certOut, `${id}.webp`));

    // Thumbnail
    await sharp(tmpPng)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(thumbsOut, `${id}.webp`));

    const { size: sz1 } = (await import("fs")).statSync(path.join(certOut, `${id}.webp`));
    const { size: sz2 } = (await import("fs")).statSync(path.join(thumbsOut, `${id}.webp`));
    console.log(`  ✅ ${id}.webp — ${Math.round(sz1/1024)} KB  |  thumb: ${Math.round(sz2/1024)} KB`);
  } catch (err) {
    console.error(`  ❌ GAGAL: ${err.message}`);
  }
}
console.log("\nSelesai.");
