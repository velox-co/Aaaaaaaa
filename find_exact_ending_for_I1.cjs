const vm = require("vm");
const fs = require("fs");

const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");
const startIdx = 241687;
const endIdx = 260933;

const componentCode = js.slice(startIdx, endIdx);

// We want to replace the ending after the button's inner span closes:
// 'N.toFixed(2)," €)"]})'
const fragmentSpanEnd = 'N.toFixed(2)," €)"]})';
const fragmentSpanEndIdx = componentCode.indexOf(fragmentSpanEnd);

if (fragmentSpanEndIdx === -1) {
  console.error("Could not find fragmentSpanEnd!");
  process.exit(1);
}

const splitPos = fragmentSpanEndIdx + fragmentSpanEnd.length;
const baseCode = componentCode.slice(0, splitPos);

const prefix = `
const f = { jsx: () => {}, jsxs: () => {}, Fragment: 'Fragment' };
const k = { useState: () => [{}, () => {}], useEffect: () => {}, useRef: () => ({ current: null }) };
const K1 = 'K1';
const Z0 = 'Z0';
`;

// Now let's try to append different combinations of closing brackets
// and verify if they compile as a valid standalone function block:
// "function I1(...) { ... <baseCode> <ending> }"
// We'll generate combinations of characters: ']', '}', ')'
const chars = [']', '}', ')'];
const foundEndings = [];

function recurse(current, depth) {
  if (depth > 12) return;
  if (current.length > 0) {
    // A function block must end with '}'
    const ending = current + "}";
    const fullCode = prefix + "const testComponent = " + baseCode + ending;
    try {
      new vm.Script(fullCode);
      foundEndings.push(ending);
    } catch (e) {
      // Failed
    }
  }
  for (const char of chars) {
    recurse(current + char, depth + 1);
  }
}

recurse("", 0);

console.log("Found working endings:");
console.log(foundEndings);
