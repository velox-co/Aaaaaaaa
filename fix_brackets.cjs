const fs = require("fs");
const vm = require("vm");

let js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

const target = `CONFIRMER LA COMMANDE (",N.toFixed(2)," €)"]})]})})})})]})]})]})}`;
const replacement = `CONFIRMER LA COMMANDE (",N.toFixed(2)," €)"]})]})})})}`;

if (js.includes(target)) {
  js = js.replace(target, replacement);
  fs.writeFileSync("assets/index-A8fTCj9w.js", js, "utf8");
  console.log("Replaced target brackets!");
  
  // Try to compile
  try {
    new vm.Script(js, { filename: "assets/index-A8fTCj9w.js" });
    console.log("SYNTAX IS 100% CORRECT!");
  } catch (e) {
    console.log("Syntax error remains:", e.message);
  }
} else {
  console.log("Target bracket sequence not found!");
}
