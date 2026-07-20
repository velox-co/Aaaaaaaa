const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");

const startIdx = 248000;
const endIdx = 255500;
console.log(js.slice(startIdx, endIdx));
