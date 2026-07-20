const fs = require("fs");
const vm = require("vm");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");
try {
  new vm.Script(js, { filename: "assets/index-A8fTCj9w.js" });
  console.log("SUCCESS");
} catch (e) {
  console.log("Error Message:", e.message);
  if (e.stack) {
    const lines = e.stack.split("\n");
    // Find the line with the code (usually lines[1]) and the caret line (lines[2])
    const codeLine = lines[1] || "";
    const caretLine = lines[2] || "";
    const caretIdx = caretLine.indexOf("^");
    if (caretIdx !== -1) {
      console.log("Error at column:", caretIdx);
      console.log("Context around error:");
      console.log(codeLine.slice(Math.max(0, caretIdx - 100), Math.min(codeLine.length, caretIdx + 100)));
      console.log(" ".repeat(Math.min(caretIdx, 100)) + "^");
    } else {
      console.log("Caret not found. Stack lines count:", lines.length);
      console.log(lines.slice(0, 5).join("\n"));
    }
  }
}
