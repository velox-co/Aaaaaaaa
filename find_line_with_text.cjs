const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");
const lines = js.split("\n");

let found = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("Paiement Sécurisé Direct")) {
    console.log(`Found on line ${i + 1}:`);
    console.log(lines[i].slice(0, 1000));
    found = true;
    break;
  }
}
if (!found) {
  console.log("NOT FOUND!");
}
