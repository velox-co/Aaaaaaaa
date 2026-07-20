const fs = require("fs");
const vm = require("vm");

const code = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");
try {
  new vm.Script(code, { filename: "index.js" });
  console.log("No syntax errors found in assets/index-A8fTCj9w.js.bak!");
} catch (e) {
  console.error("Syntax Error Details:");
  console.error(e.message);
  console.error("Stack trace line of error:");
  console.error(e.stack);
}
