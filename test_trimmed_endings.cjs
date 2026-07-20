const acorn = require("acorn");
const fs = require("fs");

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

// Let's try different trimmings of the ending:
// The ending is: "})})})})}"
// We can try different sub-lengths or replacements of the ending.
const endingBase = '})})})})}';

for (let i = 1; i <= endingBase.length; i++) {
  const ending = endingBase.slice(0, endingBase.length - i);
  const codeToTest = prefix + "const testComponent = " + componentCode.slice(0, componentCode.length - endingBase.length) + ending + ";";
  try {
    acorn.parse(codeToTest, { ecmaVersion: 2022, sourceType: "module" });
    console.log(`TRIMMING ${i} CHARS PASSED! Ending was: '${ending}'`);
  } catch (e) {
    // console.log(`Trimming ${i} failed:`, e.message);
  }
}
