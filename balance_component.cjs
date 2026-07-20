const fs = require("fs");

const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");
const startIdx = 241687;
const endIdx = 260933;

const code = js.slice(startIdx, endIdx);

let stack = [];
let inString = null; // null, '"', "'", '`'
let escape = false;

for (let i = 0; i < code.length; i++) {
  const char = code[i];
  
  if (escape) {
    escape = false;
    continue;
  }
  
  if (char === "\\") {
    escape = true;
    continue;
  }
  
  // Handle strings
  if (inString) {
    if (char === inString) {
      inString = null;
    }
    continue;
  }
  
  if (char === '"' || char === "'" || char === "`") {
    inString = char;
    continue;
  }
  
  // Ignore single-line comments
  if (char === "/" && code[i + 1] === "/") {
    while (i < code.length && code[i] !== "\n") {
      i++;
    }
    continue;
  }
  
  // Ignore multi-line comments
  if (char === "/" && code[i + 1] === "*") {
    i += 2;
    while (i < code.length && !(code[i] === "*" && code[i + 1] === "/")) {
      i++;
    }
    i++;
    continue;
  }
  
  // Track brackets
  if (char === "(" || char === "{" || char === "[") {
    stack.push({ char, index: i });
  } else if (char === ")" || char === "}" || char === "]") {
    if (stack.length === 0) {
      console.log(`Mismatch found! Extra closing '${char}' at index ${i}`);
      printContext(i);
      process.exit(1);
    }
    const last = stack.pop();
    const expected = { ")": "(", "}": "{", "]": "[" }[char];
    if (last.char !== expected) {
      console.log(`Mismatch found! Expected closing for '${last.char}' (from index ${last.index}) but found '${char}' at index ${i}`);
      console.log("Context of opening bracket:");
      printContext(last.index);
      console.log("Context of mismatched closing bracket:");
      printContext(i);
      process.exit(1);
    }
  }
}

if (stack.length > 0) {
  console.log(`Unclosed brackets remain! Count: ${stack.length}`);
  for (const item of stack) {
    console.log(`Unclosed: '${item.char}' at index ${item.index}`);
    printContext(item.index);
  }
} else {
  console.log("No bracket mismatches found!");
}

function printContext(index) {
  const start = Math.max(0, index - 50);
  const end = Math.min(code.length, index + 50);
  const context = code.slice(start, end);
  const indicator = " ".repeat(index - start) + "^";
  console.log("--- CONTEXT ---");
  console.log(context);
  console.log(indicator);
  console.log("----------------\n");
}
