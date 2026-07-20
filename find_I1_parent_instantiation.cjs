const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

// Search for any use of I1 in the bundle
let pos = 0;
while (true) {
  pos = js.indexOf("I1", pos);
  if (pos === -1) break;
  // Print some context around occurrences of I1 (excluding function definitions)
  if (pos < 230000 || pos > 260000) {
    console.log(`Found I1 reference at ${pos}: ...${js.slice(pos - 60, pos + 80)}...`);
  }
  pos += 2;
}
