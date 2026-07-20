import Jimp from "jimp";

async function analyze() {
  console.log("Loading image...");
  const img = await Jimp.read("/tmp/logo_page.png");
  const width = img.bitmap.width;
  const height = img.bitmap.height;
  console.log(`Dimensions: ${width}x${height}`);

  // We want to find clusters of bright pixels
  // Let's divide the image into a grid of 100x100 blocks
  const gridDivs = 100;
  const blockW = Math.floor(width / gridDivs);
  const blockH = Math.floor(height / gridDivs);

  const luminosityGrid = [];

  for (let gy = 0; gy < gridDivs; gy++) {
    for (let gx = 0; gx < gridDivs; gx++) {
      let totalLuminosity = 0;
      let cyanPixels = 0;

      const startX = gx * blockW;
      const startY = gy * blockH;

      for (let y = startY; y < startY + blockH; y += 4) {
        for (let x = startX; x < startX + blockW; x += 4) {
          const idx = (width * y + x) * 4;
          const r = img.bitmap.data[idx];
          const g = img.bitmap.data[idx + 1];
          const b = img.bitmap.data[idx + 2];

          // Luminosity formula
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          totalLuminosity += lum;

          // Check if pixel is cyan/blue-ish (like the logo glow)
          // Cyan has high G and B, and low to medium R
          if (b > 150 && g > 150 && r < 180) {
            cyanPixels++;
          }
        }
      }

      const avgLum = totalLuminosity / ((blockW * blockH) / 16);
      if (avgLum > 30 || cyanPixels > 5) {
        luminosityGrid.push({ gx, gy, avgLum, cyanPixels });
      }
    }
  }

  // Print top regions
  luminosityGrid.sort((a, b) => b.cyanPixels - a.cyanPixels);
  console.log("Top 15 cyan-rich regions (grid cells):");
  luminosityGrid.slice(0, 15).forEach(c => {
    console.log(`Cell: (${c.gx}, ${c.gy}) | X: ${c.gx * blockW} to ${(c.gx+1) * blockW} | Y: ${c.gy * blockH} to ${(c.gy+1) * blockH} | Cyan Count: ${c.cyanPixels} | Avg Lum: ${c.avgLum.toFixed(1)}`);
  });
}

analyze().catch(err => console.error(err));
