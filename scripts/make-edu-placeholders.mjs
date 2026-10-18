// scripts/make-edu-placeholders.mjs
import sharp from "sharp";
import { mkdirSync } from "fs";

mkdirSync("public/assets/education", { recursive: true });

const items = [
  {
    file: "public/assets/education/stt-nf.webp",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#6B0F1A"/>
        <stop offset="1" stop-color="#3D0710"/>
      </linearGradient></defs>
      <rect width="800" height="600" fill="url(#g)"/>
      <text x="400" y="260" font-family="Georgia,serif" font-size="30" fill="#F5F0E8" text-anchor="middle">STT Terpadu Nurul Fikri</text>
      <text x="400" y="310" font-family="Georgia,serif" font-size="20" fill="#D4AF37" text-anchor="middle">S1 Teknik Informatika · 2022–2026</text>
      <text x="400" y="360" font-family="Arial,sans-serif" font-size="15" fill="#F5F0E8" opacity="0.45" text-anchor="middle">[ Foto menyusul ]</text>
    </svg>`,
  },
  {
    file: "public/assets/education/smk.webp",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#EDE8DA"/>
        <stop offset="1" stop-color="#D6CFBD"/>
      </linearGradient></defs>
      <rect width="800" height="600" fill="url(#g)"/>
      <text x="400" y="260" font-family="Georgia,serif" font-size="30" fill="#3D0710" text-anchor="middle">SMK Negeri 19 Jakarta</text>
      <text x="400" y="310" font-family="Georgia,serif" font-size="20" fill="#6B0F1A" text-anchor="middle">Multimedia · 2019–2022</text>
      <text x="400" y="360" font-family="Arial,sans-serif" font-size="15" fill="#3D0710" opacity="0.45" text-anchor="middle">[ Foto menyusul ]</text>
    </svg>`,
  },
];

for (const { file, svg } of items) {
  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(file);
  console.log("OK", file);
}
console.log("Done.");
