const vm = require("vm");
const fs = require("fs");

const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");
const startIdx = 241687;
const endIdx = 260933;

const componentCode = js.slice(startIdx, endIdx);

// Find the closure of the fragment
const fragmentEndWord = 'N.toFixed(2)," €)"]})]})';
const fragmentEndPos = componentCode.indexOf(fragmentEndWord);

if (fragmentEndPos === -1) {
  console.error("Could not find fragment end word!");
  process.exit(1);
}

const splitPos = fragmentEndPos + fragmentEndWord.length;
const componentCodeWithoutEnd = componentCode.slice(0, splitPos);
console.log("Keep code ends with:", componentCodeWithoutEnd.slice(-100));
console.log("Original ending we are replacing was:", componentCode.slice(splitPos));

// Standard dummy environment to check syntax
const prefix = `
const f = { jsx: () => {}, jsxs: () => {}, Fragment: 'Fragment' };
const k = { useState: () => [{}, () => {}], useEffect: () => {}, useRef: () => ({ current: null }) };
const K1 = 'K1';
const Z0 = 'Z0';
`;

const chars = [']', '}', ')'];
const possibleEndings = [];
function recurse(current, depth) {
  if (depth > 8) return;
  if (current.length > 0) {
    possibleEndings.push(current + "}");
    possibleEndings.push(current);
  }
  for (const char of chars) {
    recurse(current + char, depth + 1);
  }
}
recurse("", 0);

console.log(`Testing ${possibleEndings.length} combinations...`);

let found = [];
for (const ending of possibleEndings) {
  const fullCode = prefix + "const testComponent = " + componentCodeWithoutEnd + ending;
  try {
    new vm.Script(fullCode);
    found.push(ending);
  } catch (e) {
    // Fails syntax check
  }
}

console.log("Combinations that compiled successfully:");
console.log(found);
