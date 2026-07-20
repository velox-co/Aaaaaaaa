const fs = require("fs");
const css = fs.readFileSync("assets/index-B2XwqEbY.css", "utf8");

let idx = 0;
while ((idx = css.indexOf("carbon-bg", idx)) !== -1) {
  console.log("Found carbon-bg in CSS at index:", idx);
  console.log(css.slice(Math.max(0, idx - 100), idx + 400));
  idx += "carbon-bg".length;
}
