const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes("node_modules")) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith(".js") || file.endsWith(".cjs")) {
        results.push(file);
      }
    }
  });
  return results;
}

console.log("All JS/CJS files in workspace:", walk("."));
