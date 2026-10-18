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

  const cardRadius = 42;

  // ── 1. Base Card Background (White studio backdrop) ───────────────────
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 0, 0, W, H, cardRadius);
  ctx.clip();

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, W, H);

  // ── 2. Foto Full Card (Foto utuh 100%, tidak terpotong) ───────────────
  if (photoImg && photoImg.width > 0 && photoImg.height > 0) {
    ctx.drawImage(photoImg, 0, 0, W, H);
  }

  // ── 3. Border Marun Mengelilingi Kartu ────────────────────────────────
  const borderWidth = 22;
  const borderInset = borderWidth / 2 + 6;
  ctx.strokeStyle = "#750000";
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  roundRect(
    ctx,
    borderInset,
    borderInset,
    W - borderInset * 2,
    H - borderInset * 2,
    cardRadius - 4
  );
  ctx.stroke();

  // ── 4. Pill Badge di Kiri Bawah: "Rahmi Atika, S. Kom." ───────────────
  const badgeText = "Rahmi Atika, S. Kom.";
  ctx.font = 'bold 44px "Inter", system-ui, -apple-system, sans-serif';
  const textMetrics = ctx.measureText(badgeText);
  const textWidth = textMetrics.width;

  const pillPadX = 40;
  const pillW = textWidth + pillPadX * 2;
  const pillH = 82;
  const pillR = pillH / 2;
  const pillX = 64;
  const pillY = H - 240;

  // Gambar capsule pill marun
  ctx.save();
  ctx.fillStyle = "#750000";
  ctx.beginPath();
  roundRect(ctx, pillX, pillY, pillW, pillH, pillR);
  ctx.fill();

  // Teks putih dalam pill badge
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(badgeText, pillX + pillW / 2, pillY + pillH / 2 + 2);
  ctx.restore();

  // ── 5. Teks di Bawah Pill: "Fresh Graduate Teknik Informatika" ────────
  ctx.save();
  ctx.font = 'bold 36px "Inter", system-ui, -apple-system, sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  // Drop shadow halus agar teks putih tampil kontras, tajam, dan elegan di atas blazer hitam
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Fresh Graduate Teknik Informatika", pillX + 6, pillY + pillH + 54);
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
