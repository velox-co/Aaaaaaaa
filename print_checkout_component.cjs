const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");

const startIdx = 255000;
const endIdx = 261500;
console.log("Printing index range:", startIdx, "to", endIdx);
console.log(js.slice(startIdx, endIdx));
