// src/hooks/useLanyardCard.js
// Card canvas: persis sesuai referensi visual pengguna
// 1. Foto full mengisi seluruh kartu (1024 x 1440)
// 2. Border marun mengelilingi kartu dengan rounded corners
// 3. Di kiri bawah: pill badge marun bertuliskan "Rahmi Atika, S. Kom."
// 4. Di bawah pill badge: teks "Fresh Graduate Teknik Informatika" warna marun
// Strap canvas: nama "RAHMI ATIKA" berulang di tali marun dengan aksen emas

import { useEffect, useState } from "react";

function roundRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function buildCardCanvas(photoImg) {
  const W = 1080;
  const H = 1440;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const cardRadius = 36;

  // ── 1. Base Badge Card ──────────────────────────────────────────────────
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 0, 0, W, H, cardRadius);
  ctx.clip();

  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, "#FFFFFF");
  bgGrad.addColorStop(0.12, "#FAFBFD");
  bgGrad.addColorStop(1, "#EFF1F5");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ── 2. Inset Photo Frame — LEBIH FRAMELESS (Border ramping 16px) ─────────
  // Border ramping di sekeliling kartu, slot lanyard tetap memiliki ruang aman di atas
  const padX = 16;
  const topPad = 120;
  const bottomPad = 16;
  const photoX = padX;
  const photoY = topPad;
  const photoW = W - padX * 2; // 1048px (jauh lebih frameless & lapang)
  const photoH = H - topPad - bottomPad; // 1304px
  const photoRadius = 18;

  if (photoImg && photoImg.width > 0 && photoImg.height > 0) {
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, photoX, photoY, photoW, photoH, photoRadius);
    ctx.clip();

    // Gambar foto agar mengisi frame secara proporsional dan terpusat (cover)
    const photoAspect = photoW / photoH;
    const imgAspect = photoImg.width / photoImg.height;
    let sw, sh, sx, sy;
    if (imgAspect > photoAspect) {
      sh = photoImg.height;
      sw = photoImg.height * photoAspect;
      sx = (photoImg.width - sw) / 2;
      sy = 0;
    } else {
      sw = photoImg.width;
      sh = photoImg.width / photoAspect;
      sx = 0;
      sy = 0;
    }

    ctx.drawImage(photoImg, sx, sy, sw, sh, photoX, photoY, photoW, photoH);

    // Subtle dark gradient vignette di bagian bawah foto agar teks putih sangat kontras dan terbaca jelas
    const textVignette = ctx.createLinearGradient(0, photoY + photoH - 250, 0, photoY + photoH);
    textVignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    textVignette.addColorStop(0.35, "rgba(0, 0, 0, 0.20)");
    textVignette.addColorStop(1, "rgba(0, 0, 0, 0.65)");
    ctx.fillStyle = textVignette;
    ctx.fillRect(photoX, photoY + photoH - 250, photoW, 250);

    // ── 3. Typography Minimalis & Elegan di Kiri Bawah (Tanpa pill badge!) ──
    const textPadX = photoX + 36;
    const nameY = photoY + photoH - 86;
    const titleY = photoY + photoH - 38;

    // Nama Lengkap: "Rahmi Atika, S. Kom."
    ctx.font = 'bold 44px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    ctx.fillText("Rahmi Atika, S. Kom.", textPadX, nameY);

    // Subtitle: "Fresh Graduate Teknik Informatika"
    ctx.font = '600 30px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    ctx.fillText("Fresh Graduate Teknik Informatika", textPadX, titleY);

    ctx.restore(); // Restore photo clip

    // Subtle fine border pada photo frame
    ctx.save();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    roundRect(ctx, photoX, photoY, photoW, photoH, photoRadius);
    ctx.stroke();
    ctx.restore();
  }

  // ── 4. Subtle Outer Card Rim ───────────────────────────────────────────
  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  roundRect(ctx, 1, 1, W - 2, H - 2, cardRadius);
  ctx.stroke();
  ctx.restore();

  // ── 5. Slot Punch Hole Outline Guide ───────────────────────────────────
  const slotX = (W - 228) / 2;
  const slotY = 56;
  const slotW = 228;
  const slotH = 48;
  const slotR = 24;

  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.10)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  roundRect(ctx, slotX, slotY, slotW, slotH, slotR);
  ctx.stroke();
  ctx.restore();

  ctx.restore(); // Restore outer clip

  return canvas;
}

// ── Strap canvas ──────────────────────────────────────────────────────────
// Lanyard paintStrap rotates this image 90deg, so text runs along the strap
function buildStrapCanvas() {
  const W = 512; // along-direction (panjang tali)
  const H = 192; // across-direction (lebar tali)
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Maroon gradient background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#260000");
  bg.addColorStop(0.5, "#4A0000");
  bg.addColorStop(1, "#260000");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Gold edge lines
  ctx.fillStyle = "rgba(212, 175, 55, 0.65)";
  ctx.fillRect(0, 10, W, 2.5);
  ctx.fillRect(0, H - 12.5, W, 2.5);

  // Diagonal weave texture
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  for (let i = 0; i < W + H; i += 14) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i - H, H);
    ctx.stroke();
  }
  ctx.restore();

  // "RAHMI ATIKA" repeated along strap
  ctx.fillStyle = "rgba(255, 253, 208, 0.65)";
  ctx.font = "bold 18px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const label = "RAHMI ATIKA";
  for (let x = 60; x < W + 60; x += 145) {
    ctx.fillText(label, x, H / 2);
  }

  return canvas;
}

// ── Hooks ─────────────────────────────────────────────────────────────────
export function useLanyardCard(photoUrl) {
  const [dataUrl, setDataUrl] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const generate = async () => {
      let img = null;
      if (photoUrl) {
        img = await new Promise((resolve) => {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = () => resolve(image);
          image.onerror = () => resolve(null);
          image.src = photoUrl;
        });
      }
      if (cancelled) return;
      const canvas = buildCardCanvas(img);
      if (canvas && !cancelled) setDataUrl(canvas.toDataURL("image/webp", 0.95));
    };
    generate();
    return () => {
      cancelled = true;
    };
  }, [photoUrl]);
  return dataUrl;
}

export function useLanyardStrap() {
  const [dataUrl, setDataUrl] = useState(null);
  useEffect(() => {
    const canvas = buildStrapCanvas();
    if (canvas) setDataUrl(canvas.toDataURL("image/webp", 0.9));
  }, []);
  return dataUrl;
}

