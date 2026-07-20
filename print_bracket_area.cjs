const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

const start = js.indexOf("CONFIRMER LA COMMANDE (");
const end = js.indexOf("function W1");
if (start !== -1 && end !== -1) {
  console.log("=== BRACKET AREA ===");
  console.log(js.slice(start, end));
  console.log("====================");
} else {
  console.log("Not found!");
}
