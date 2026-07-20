const fs = require("fs");
const vm = require("vm");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

function checkPrefix(len) {
  const prefix = js.slice(0, len);
  try {
    new vm.Script(prefix, { filename: "prefix.js" });
    return "OK";
  } catch (e) {
    return e.message;
  }
}

// Let's first test where the error transitions from "Unexpected end of input" to "Unexpected token '}'"
let low = 0;
let high = js.length;
let resultIdx = -1;

while (low <= high) {
  let mid = Math.floor((low + high) / 2);
  let err = checkPrefix(mid);
  if (err.includes("Unexpected token '}'")) {
    resultIdx = mid;
    high = mid - 1; // Try to find a smaller prefix that still has the error
  } else {
    low = mid + 1;
  }
}

if (resultIdx !== -1) {
  console.log("Exact syntax error character index found:", resultIdx);
  console.log("Context around error index:");
  const start = Math.max(0, resultIdx - 100);
  const end = Math.min(js.length, resultIdx + 100);
  const context = js.slice(start, end);
  const indicator = " ".repeat(resultIdx - start) + "^";
  console.log("--- CONTEXT ---");
  console.log(context);
  console.log(indicator);
  console.log("----------------");
} else {
  console.log("Could not locate transition via binary search.");
}
