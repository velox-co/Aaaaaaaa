const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

const target = "checkout-btn-submit";
const idx = js.indexOf(target);
if (idx !== -1) {
  console.log("Found button at index:", idx);
  console.log("=== AFTER BUTTON ===");
  console.log(js.slice(idx - 100, idx + 1200));
} else {
  console.log("Button not found!");
}
