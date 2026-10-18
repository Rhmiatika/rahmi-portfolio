// src/hooks/useLanyardCard.js
// Card canvas: foto FULL ukuran (984x1000px dari 1024x1440), nama, gelar, bidang
// Foto digambar upright dengan cover fit, tanpa distorsi / rotasi
// Strap canvas: "RAHMI ATIKA" berulang di tali maroon dengan aksen emas

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

  // ── Background gradient kartu ──────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#500000");
  bg.addColorStop(1, "#260000");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle diagonal texture
  ctx.save();
  ctx.globalAlpha = 0.035;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  for (let i = -H; i < W + H; i += 22) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + H, H);
    ctx.stroke();
  }
  ctx.restore();

  // ── Gold accent border atas ────────────────────────────────────────────
  ctx.fillStyle = "#D4AF37";
  ctx.fillRect(0, 0, W, 8);

  // ── Area Foto: FULL WIDTH, besar & dominan (980 x 990 px) ──────────────
  const PW = 976;
  const PH = 990;
  const PX = (W - PW) / 2; // = 24px
  const PY = 32;
  const PR = 16;

  // Bayangan foto
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 8;
  ctx.beginPath();
  roundRect(ctx, PX, PY, PW, PH, PR);
  ctx.fillStyle = "#1A0000";
  ctx.fill();
  ctx.restore();

  // Gambar foto (upright, cover fit)
  if (photoImg && photoImg.width > 0 && photoImg.height > 0) {
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, PX, PY, PW, PH, PR);
    ctx.clip();

    const imgW = photoImg.width;
    const imgH = photoImg.height;
    const imgAspect = imgW / imgH;
    const targetAspect = PW / PH;

    let sx = 0, sy = 0, sw = imgW, sh = imgH;
    if (imgAspect > targetAspect) {
      sw = imgH * targetAspect;
      sx = (imgW - sw) / 2;
    } else {
      sh = imgW / targetAspect;
      // Sedikit geser ke atas agar kepala dan hijab pas di dalam frame
      sy = Math.max(0, (imgH - sh) * 0.08);
    }

    ctx.drawImage(photoImg, sx, sy, sw, sh, PX, PY, PW, PH);
    ctx.restore();
  } else {
    // Fallback jika foto belum termuat
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, PX, PY, PW, PH, PR);
    ctx.clip();
    ctx.fillStyle = "#4A0000";
    ctx.fillRect(PX, PY, PW, PH);
    ctx.fillStyle = "#6B0000";
    ctx.beginPath();
    ctx.arc(PX + PW / 2, PY + 300, 180, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Border emas elegan di sekeliling foto
  ctx.save();
  ctx.strokeStyle = "rgba(212, 175, 55, 0.75)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  roundRect(ctx, PX - 1, PY - 1, PW + 2, PH + 2, PR + 1);
  ctx.stroke();
  ctx.restore();

  // ── Area Bawah / Card Footer (DY = 1022 hingga 1440) ───────────────────
  const DY = PY + PH; // = 1022

  // Gradient gelap maroon pekat untuk bagian teks nama & identitas
  const footerGrad = ctx.createLinearGradient(0, DY - 20, 0, H);
  footerGrad.addColorStop(0, "rgba(42,0,0,0.92)");
  footerGrad.addColorStop(0.2, "rgba(35,0,0,0.98)");
  footerGrad.addColorStop(1, "rgba(24,0,0,1)");
  ctx.fillStyle = footerGrad;
  ctx.fillRect(0, DY - 20, W, H - (DY - 20));

  // Garis emas pemisah foto dan teks
  const goldGrad = ctx.createLinearGradient(50, 0, W - 50, 0);
  goldGrad.addColorStop(0, "transparent");
  goldGrad.addColorStop(0.25, "#D4AF37");
  goldGrad.addColorStop(0.75, "#D4AF37");
  goldGrad.addColorStop(1, "transparent");
  ctx.fillStyle = goldGrad;
  ctx.fillRect(50, DY + 16, W - 100, 2.5);

  // Kategori ID Card
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(212, 175, 55, 0.85)";
  ctx.font = "600 24px Arial, sans-serif";
  ctx.fillText("PORTOFOLIO  ·  IDENTITAS RESMI", W / 2, DY + 46);

  // Nama Lengkap "Rahmi Atika" — besar, anggun
  ctx.fillStyle = "#FFFEE8";
  ctx.font = "bold 82px Georgia, 'Playfair Display', serif";
  ctx.fillText("Rahmi Atika", W / 2, DY + 120);

  // Gelar & Lulusan
  ctx.fillStyle = "#D4AF37";
  ctx.font = "600 46px Georgia, serif";
  ctx.fillText("S.Kom.", W / 2, DY + 185);

  // Separator tipis
  ctx.fillStyle = "rgba(212, 175, 55, 0.35)";
  ctx.fillRect(160, DY + 218, W - 320, 1.5);

  // Bidang Spesialisasi LinkedIn: Administrative & Digital Archiving Specialist
  ctx.fillStyle = "rgba(255, 253, 208, 0.95)";
  ctx.font = "600 36px Arial, sans-serif";
  ctx.fillText("Administrative & Digital Archiving Specialist", W / 2, DY + 262);

  // Baris Tambahan: Data Management · Teknik Informatika
  ctx.fillStyle = "rgba(212, 175, 55, 0.82)";
  ctx.font = "400 30px Arial, sans-serif";
  ctx.fillText("Data Management  ·  Teknik Informatika", W / 2, DY + 312);

  // Bottom gold bar penutup kartu
  ctx.fillStyle = "#D4AF37";
  ctx.fillRect(0, H - 8, W, 8);

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
      if (canvas && !cancelled) setDataUrl(canvas.toDataURL("image/webp", 0.94));
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
