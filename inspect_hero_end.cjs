const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");

const endKeyword = 'glow-cyan"})]})})';
const endIdx = js.indexOf(endKeyword);
if (endIdx !== -1) {
  console.log("Found end keyword at:", endIdx);
  console.log("Before:", js.slice(endIdx - 100, endIdx));
  console.log("Keyword:", js.slice(endIdx, endIdx + endKeyword.length));
  console.log("After:", js.slice(endIdx + endKeyword.length, endIdx + endKeyword.length + 100));
} else {
  console.log("Not found!");
}
