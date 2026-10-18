// src/hooks/useLanyardCard.js
// Generates a professional ID card canvas texture for Lanyard
// Returns a dataURL that is passed as frontImage prop
// Photo is rotated -90deg to fix the orientation issue

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
  const W = 1024;
  const H = 1440;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#6B0000");
  bg.addColorStop(1, "#3A0000");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Stripe texture
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  for (let i = -H; i < W + H; i += 24) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke();
  }
  ctx.restore();

  // Top gold bar
  ctx.fillStyle = "#C9A84C";
  ctx.fillRect(0, 0, W, 10);

  // Header band
  ctx.fillStyle = "rgba(255,255,255,0.10)";
  ctx.fillRect(0, 10, W, 110);
  ctx.fillStyle = "#F5EDD6";
  ctx.font = "bold 38px 'Playfair Display', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("PORTOFOLIO", W / 2, 66);
  ctx.fillStyle = "#C9A84C";
  ctx.font = "500 26px 'Inter', Arial, sans-serif";
  ctx.fillText("RAHMI ATIKA", W / 2, 102);

  // Photo
  const PW = 580, PH = 580, PX = (W - PW) / 2, PY = 148, PR = 18;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = 32; ctx.shadowOffsetY = 8;
  ctx.beginPath(); roundRect(ctx, PX, PY, PW, PH, PR); ctx.fillStyle = "#2A0000"; ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = "#C9A84C"; ctx.lineWidth = 4;
  ctx.beginPath(); roundRect(ctx, PX - 2, PY - 2, PW + 4, PH + 4, PR + 2); ctx.stroke();
  ctx.restore();

  if (photoImg) {
    ctx.save();
    ctx.beginPath(); roundRect(ctx, PX, PY, PW, PH, PR); ctx.clip();
    ctx.translate(PX + PW / 2, PY + PH / 2);
    ctx.rotate(-Math.PI / 2);
    const ia = photoImg.width / photoImg.height;
    const tW = PH, tH = PW;
    let dw, dh;
    if (ia > tW / tH) { dh = tH; dw = dh * ia; } else { dw = tW; dh = dw / ia; }
    ctx.drawImage(photoImg, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
  } else {
    ctx.save();
    ctx.beginPath(); roundRect(ctx, PX, PY, PW, PH, PR); ctx.clip();
    ctx.fillStyle = "#5A0000"; ctx.fillRect(PX, PY, PW, PH);
    ctx.fillStyle = "#800000";
    ctx.beginPath(); ctx.arc(PX + PW / 2, PY + 220, 120, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // Divider 1
  const DY = PY + PH + 28;
  const gr = ctx.createLinearGradient(80, 0, W - 80, 0);
  gr.addColorStop(0, "transparent"); gr.addColorStop(0.2, "#C9A84C");
  gr.addColorStop(0.8, "#C9A84C"); gr.addColorStop(1, "transparent");
  ctx.fillStyle = gr; ctx.fillRect(80, DY, W - 160, 2);

  // Name
  ctx.fillStyle = "#F5EDD6";
  ctx.font = "bold 72px 'Playfair Display', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("Rahmi Atika", W / 2, DY + 80);
  ctx.fillStyle = "#C9A84C";
  ctx.font = "500 44px 'Playfair Display', Georgia, serif";
  ctx.fillText("S.Kom.", W / 2, DY + 136);

  // Divider 2
  ctx.fillStyle = "rgba(201,168,76,0.35)"; ctx.fillRect(160, DY + 158, W - 320, 1);

  // Bidang
  ctx.fillStyle = "rgba(245,237,214,0.78)";
  ctx.font = "400 33px 'Inter', Arial, sans-serif";
  ctx.fillText("Digital Archiving · Data Management", W / 2, DY + 208);

  // Bottom gold bar
  ctx.fillStyle = "#C9A84C"; ctx.fillRect(0, H - 10, W, 10);

  // Barcode decoration
  ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = "#F5EDD6";
  const BY = H - 58, BX = (W - 240) / 2;
  [3,1,2,1,3,2,1,2,1,3,1,2,3,1,2,1,3,2,1].forEach((w, i) => {
    if (i % 2 === 0) ctx.fillRect(BX + i * 14, BY, w * 4, 22);
  });
  ctx.restore();

  return canvas;
}

export function useLanyardCard(photoUrl) {
  const [dataUrl, setDataUrl] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const generate = async () => {
      let img = null;
      if (photoUrl) {
        img = await new Promise(resolve => {
          const image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = () => resolve(image);
          image.onerror = () => resolve(null);
          image.src = photoUrl;
        });
      }
      if (cancelled) return;
      const canvas = buildCardCanvas(img);
      if (canvas && !cancelled) setDataUrl(canvas.toDataURL("image/webp", 0.92));
    };
    generate();
    return () => { cancelled = true; };
  }, [photoUrl]);
  return dataUrl;
}

// ── Strap canvas: nama "RAHMI ATIKA" berulang di sepanjang tali ──────────
// Lanyard paintStrap: gambar dirotate 90deg saat digambar di strap
// Sehingga image harus landscape (wide x narrow) agar teks horizontal = vertikal di strap
function buildStrapCanvas() {
  const W = 512; // "along" direction — panjang tali
  const H = 192; // "across" direction — lebar tali
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background maroon gradient
  const bg = ctx.createLinearGradient(0, 0, H, 0);
  bg.addColorStop(0, "#2A0000");
  bg.addColorStop(0.5, "#4A0000");
  bg.addColorStop(1, "#2A0000");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Edge stripes gold
  ctx.fillStyle = "rgba(201,168,76,0.5)";
  ctx.fillRect(0, 8, W, 2);
  ctx.fillRect(0, H - 10, W, 2);

  // Diagonal pattern lines
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  for (let i = 0; i < W + H; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i - H, H);
    ctx.stroke();
  }
  ctx.restore();

  // Text "RAHMI ATIKA" berulang
  ctx.fillStyle = "rgba(245,237,214,0.55)";
  ctx.font = "bold 18px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const label = "RAHMI ATIKA";
  const spacing = 140;
  const count = Math.ceil(W / spacing) + 1;
  for (let i = 0; i < count; i++) {
    ctx.fillText(label, i * spacing + 30, H / 2);
  }

  return canvas;
}

export function useLanyardStrap() {
  const [dataUrl, setDataUrl] = useState(null);
  useEffect(() => {
    const canvas = buildStrapCanvas();
    if (canvas) setDataUrl(canvas.toDataURL("image/webp", 0.85));
  }, []);
  return dataUrl;
}
