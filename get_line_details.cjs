const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");
const lines = js.split("\n");
const line199 = lines[198]; // 0-indexed is 198

console.log("Line 199 total length:", line199.length);

// Print in 100-character chunks
for (let i = 0; i < line199.length; i += 100) {
  console.log(`${String(i).padStart(6, " ")}: ${line199.slice(i, i + 100)}`);
}
