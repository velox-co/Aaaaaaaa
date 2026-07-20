const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

const startIdx = js.indexOf("function xs(");
if (startIdx !== -1) {
  console.log("Found function xs( at index:", startIdx);
  console.log(js.slice(startIdx, startIdx + 8000));
} else {
  console.log("NOT FOUND!");
}
