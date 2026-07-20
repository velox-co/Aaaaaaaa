const fs = require("fs");
const acorn = require("acorn");

const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");
const startIdx = 241687;
const endIdx = 260933;

const componentCode = js.slice(startIdx, endIdx);

const prefix = `
const f = { jsx: () => {}, jsxs: () => {}, Fragment: 'Fragment' };
const k = { useState: () => [{}, () => {}], useEffect: () => {}, useRef: () => ({ current: null }) };
const K1 = 'K1';
const Z0 = 'Z0';

`;

const fullCode = prefix + "const testComponent = " + componentCode + ";";

try {
  acorn.parse(fullCode, { ecmaVersion: 2022, sourceType: "module" });
  console.log("Component parsed successfully!");
} catch (e) {
  console.error("Acorn Parse Error in component:");
  console.error("Message:", e.message);
  console.error("Position in fullCode:", e.pos);
  const relPos = e.pos - prefix.length - "const testComponent = ".length;
  console.error("Position in component code:", relPos);
  
  if (relPos >= 0 && relPos < componentCode.length) {
    const start = Math.max(0, relPos - 150);
    const end = Math.min(componentCode.length, relPos + 150);
    const context = componentCode.slice(start, end);
    const indicator = " ".repeat(relPos - start) + "^";
    console.log("\n--- CONTEXT OF ERROR ---");
    console.log(context);
    console.log(indicator);
    console.log("------------------------\n");
  }
}
