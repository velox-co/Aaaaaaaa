const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");

const startKeyword = 'f.jsxs("header",';
const endKeyword = 'glow-cyan"})]})})';

const startIdx = js.indexOf(startKeyword);
const endIdx = js.indexOf(endKeyword, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const actualEndIdx = endIdx + endKeyword.length;
  console.log("Slice Start Edge:");
  console.log("Before: '" + js.slice(startIdx - 50, startIdx) + "'");
  console.log("Start: '" + js.slice(startIdx, startIdx + 50) + "'");
  
  console.log("\nSlice End Edge:");
  console.log("End: '" + js.slice(actualEndIdx - 50, actualEndIdx) + "'");
  console.log("After: '" + js.slice(actualEndIdx, actualEndIdx + 50) + "'");
} else {
  console.log("Keywords not found!");
}
