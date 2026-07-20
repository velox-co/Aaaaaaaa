const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

const startIdx = js.indexOf('f.jsx("style",');
if (startIdx !== -1) {
  console.log("Found f.jsx('style', at index:", startIdx);
  console.log(js.slice(startIdx, startIdx + 2000));
} else {
  console.log("Not found!");
}
