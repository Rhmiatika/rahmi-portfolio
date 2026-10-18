// scripts/crop-certs.mjs
// Crop toolbar browser dari cert-05 dan cert-07
import sharp from "sharp";
import { copyFileSync, unlinkSync } from "fs";
import path from "path";

const certDir = "public/assets/certificates";
const thumbDir = certDir + "/thumbs";

async function cropAndSave({ name, left, top, width, height }) {
  const src = path.join(certDir, `${name}.webp`);
  const tmp = path.join(certDir, `${name}-crop-tmp.webp`);
  const thumb = path.join(thumbDir, `${name}.webp`);

  console.log(`\nProcessing ${name}...`);

  // Step 1: extract → tmp
  await sharp(src)
    .extract({ left, top, width, height })
    .webp({ quality: 88 })
    .toFile(tmp);
  console.log(`  Cropped → tmp`);

  // Step 2: overwrite original
  copyFileSync(tmp, src);
  unlinkSync(tmp);
  console.log(`  Saved → ${src}`);

  // Step 3: regenerate thumb
  await sharp(src)
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumb);
  console.log(`  Thumb → ${thumb}`);
}

// cert-05: ada sidebar thumbnail kiri (~338px) + toolbar atas (~61px)
// gambar sertifikat certif mulai dari x=338 lebar 1262, y=61 tinggi 841
await cropAndSave({
  name: "cert-05",
  left: 338, top: 61, width: 1262, height: 841,
});

// cert-07: sidebar tidak ada, certif centered, padding gelap kiri ~404px
// certif lebar ~958, tinggi ~620
await cropAndSave({
  name: "cert-07",
  left: 404, top: 61, width: 958, height: 620,
});

console.log("\nDone.");
