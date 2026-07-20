const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

const startKeyword = 'f.jsxs("header"';
const startIdx = js.indexOf(startKeyword);
if (startIdx !== -1) {
  console.log("Found header start at index:", startIdx);
  // Let's print about 3000 characters to cover the entire header and hero sections
  console.log(js.slice(startIdx - 500, startIdx + 2500));
} else {
  console.log("Not found!");
}
