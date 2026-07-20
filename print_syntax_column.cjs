const fs = require("fs");
const vm = require("vm");

const code = fs.readFileSync("assets/index-A8fTCj9w-test.js", "utf8");
try {
  new vm.Script(code, { filename: "test_replaced.js" });
  console.log("Passed!");
} catch (e) {
  console.log("Error message:", e.message);
  console.log("Error constructor name:", e.constructor.name);
  
  // Print properties of the error object safely
  for (const prop of Object.getOwnPropertyNames(e)) {
    if (prop === 'stack') continue; // Skip large stack trace
    console.log(`${prop}:`, e[prop]);
  }
}
