const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");

const startKeyword = 'f.jsx("style",{children:`';
const startIdx = js.indexOf(startKeyword);

if (startIdx !== -1) {
  console.log("Found style block start at:", startIdx);
  console.log(js.slice(startIdx, startIdx + 1500));
} else {
  console.log("NOT FOUND!");
}
