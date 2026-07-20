const fs = require("fs");
const vm = require("vm");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");
try {
  new vm.Script(js, { filename: "assets/index-A8fTCj9w.js" });
  console.log("NO ERROR!");
} catch (e) {
  console.log(e.stack || e);
}
