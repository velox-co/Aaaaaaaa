const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

let idx = -1;
let occurrences = [];
while ((idx = js.indexOf('f.jsx("style"', idx + 1)) !== -1) {
  occurrences.push(idx);
}

console.log("Found style block occurrences at indices:", occurrences);
occurrences.forEach((idx, i) => {
  console.log(`\nOccurrence ${i + 1} at index ${idx}:`);
  console.log(js.slice(idx, idx + 400));
});
