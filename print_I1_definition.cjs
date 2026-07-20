const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");

const startKeyword = "function I1({";
const startIdx = js.indexOf(startKeyword);

if (startIdx !== -1) {
  console.log("Found function I1 at:", startIdx);
  // Find where function W1 starts right after it
  const endKeyword = "function W1({";
  const endIdx = js.indexOf(endKeyword, startIdx);
  if (endIdx !== -1) {
    console.log("Found function W1 at:", endIdx);
    const componentCode = js.slice(startIdx, endIdx);
    console.log("Length of component code:", componentCode.length);
    console.log("Last 200 characters of component code:");
    console.log(componentCode.slice(-200));
  }
} else {
  console.log("Not found!");
}
