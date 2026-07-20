const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");
const lines = js.split("\n");

// We saw the error was at line 199 (1-indexed). Let's print lines 190 to 210 to inspect them!
const startLine = 190;
const endLine = 210;

for (let i = startLine - 1; i < endLine && i < lines.length; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
