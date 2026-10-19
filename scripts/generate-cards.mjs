import sharp from "sharp";

async function createCards() {
  const cardW = 600;
  const cardH = 840;
  const innerW = 520;
  const innerH = 660;
  const innerLeft = 40;
  const innerTop = 40;

  // Photos:
  // Photo 1: about-photo-1-fit.webp
  // Photo 2: about-photo-2-fit.webp
  // Photo 3: about-photo-3-fit.webp
  const photos = [
    "public/assets/images/about/about-photo-1-fit.webp",
    "public/assets/images/about/about-photo-2-fit.webp",
    "public/assets/images/about/about-photo-3-fit.webp",
  ];

  for (let i = 0; i < 3; i++) {
    const active = i + 1;
    const framePath = `public/assets/images/about-frame-${active}.png`;

    // 2x frame: resize to 600x840
    const frame2x = await sharp(framePath)
      .resize(cardW, cardH, { fit: "fill" })
      .toBuffer();

    // Photo inside rounded inner window
    // Create rounded mask for photo
    const roundedMask = Buffer.from(`
      <svg width="${innerW}" height="${innerH}">
        <rect x="0" y="0" width="${innerW}" height="${innerH}" rx="28" ry="28" fill="#FFF" />
      </svg>
    `);

    const maskedPhoto = await sharp(photos[i])
      .resize(innerW, innerH, { fit: "cover" })
      .composite([{ input: roundedMask, blend: "dest-in" }])
      .toBuffer();

    // Combine on white card background
    await sharp({
      create: {
        width: cardW,
        height: cardH,
        channels: 4,
        background: { r: 250, g: 250, b: 252, alpha: 1 },
      },
    })
      .composite([
        { input: maskedPhoto, top: innerTop, left: innerLeft },
        { input: frame2x, top: 0, left: 0 },
      ])
      .webp({ quality: 92 })
      .toFile(`public/assets/images/about/about-card-${active}.webp`);

    console.log(`Generated public/assets/images/about/about-card-${active}.webp`);
  }
}

createCards().catch(console.error);
