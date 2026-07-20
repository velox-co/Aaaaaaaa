const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

const keywords = ["Products", "Produits", "Technology", "Technologie", "About", "A propos", "Contact", "PROTECTION BEYOND COMPARE"];
for (const kw of keywords) {
  let idx = 0;
  while ((idx = js.indexOf(kw, idx)) !== -1) {
    console.log(`Keyword: "${kw}" found at index: ${idx}`);
    console.log("Surrounding:", js.slice(Math.max(0, idx - 500), idx + 500));
    console.log("\n==================================================\n");
    idx += kw.length;
  }
}
