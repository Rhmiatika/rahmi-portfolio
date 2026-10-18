/**
 * scripts/read-certs.mjs
 * Membaca teks dari semua file PDF menggunakan pdfjs-dist
 */
import { readFile } from "fs/promises";
import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// pdfjs-dist ESM import
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERTIF_DIR = path.join(__dirname, "../asset/sertif");

const files = readdirSync(SERTIF_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));

for (const file of files) {
  const fullPath = path.join(SERTIF_DIR, file);
  try {
    const data = new Uint8Array(await readFile(fullPath));
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;
    let fullText = "";
    for (let p = 1; p <= Math.min(pdf.numPages, 2); p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const pageText = content.items.map((i) => i.str).join(" ");
      fullText += pageText + "\n";
    }
    console.log("=".repeat(80));
    console.log("FILE:", file);
    console.log("PAGES:", pdf.numPages);
    console.log("TEXT:", fullText.slice(0, 800).replace(/\s+/g, " ").trim());
    console.log();
  } catch (err) {
    console.log("=".repeat(80));
    console.log("FILE:", file, "— ERROR:", err.message);
  }
}
