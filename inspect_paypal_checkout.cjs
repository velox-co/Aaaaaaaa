const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

const target = "Paiement Sécurisé Direct via PayPal";
const idx = js.indexOf(target);
if (idx !== -1) {
  console.log("Found at index:", idx);
  console.log("=== BEFORE ===");
  console.log(js.slice(idx - 1000, idx));
  console.log("=== AFTER ===");
  console.log(js.slice(idx, idx + 1500));
} else {
  console.log("Target text not found!");
}
