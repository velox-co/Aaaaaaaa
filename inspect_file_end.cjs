const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");
console.log("File length:", js.length);
console.log("=== LAST 2000 CHARACTERS ===");
console.log(js.slice(-2000));
