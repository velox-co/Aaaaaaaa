const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

const startKeyword = 'f.jsxs("header",';
const endKeyword = 'glow-cyan"})]})})';

const startIdx = js.indexOf(startKeyword);
const endIdx = js.indexOf(endKeyword, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const actualEndIdx = endIdx + endKeyword.length;
  console.log(`Start index: ${startIdx}, End index: ${actualEndIdx}`);
  console.log("Header-Hero block content:");
  console.log(js.slice(startIdx, actualEndIdx));
} else {
  console.log("Could not find start/end bounds.");
  if (startIdx !== -1) {
    console.log("Found start, but not end. Printing from start:");
    console.log(js.slice(startIdx, startIdx + 1500));
  }
}
