import sharp from "sharp";

async function run() {
  for (let active = 1; active <= 3; active++) {
    const d1Fill = active === 1 ? "#262626" : "#FAFAFC";
    const d2Fill = active === 2 ? "#262626" : "#FAFAFC";
    const d3Fill = active === 3 ? "#262626" : "#FAFAFC";

    const svg = `
      <svg width="300" height="420" xmlns="http://www.w3.org/2000/svg">
        <rect x="125" y="354" width="50" height="15" fill="#FAFAFC" />
        <circle cx="136" cy="361" r="3.5" fill="${d1Fill}" stroke="#262626" stroke-width="1.2" />
        <circle cx="150" cy="361" r="3.5" fill="${d2Fill}" stroke="#262626" stroke-width="1.2" />
        <circle cx="164" cy="361" r="3.5" fill="${d3Fill}" stroke="#262626" stroke-width="1.2" />
      </svg>
    `;

    await sharp("public/assets/images/about-frame-trimmed.png")
      .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
      .toFile(`public/assets/images/about-frame-${active}.png`);

    console.log(`Generated public/assets/images/about-frame-${active}.png`);
  }
}

run().catch(console.error);
