const fs = require("fs");
const js = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

let stack = [];
let inString = null; // null, '"', "'", '`'
let escape = false;

for (let i = 0; i < js.length; i++) {
  const char = js[i];
  
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
  
  // Ignore single-line comments (though rare in minified files)
  if (char === "/" && js[i + 1] === "/") {
    while (i < js.length && js[i] !== "\n") {
      i++;
    }
    continue;
  }
  
  // Ignore multi-line comments
  if (char === "/" && js[i + 1] === "*") {
    i += 2;
    while (i < js.length && !(js[i] === "*" && js[i + 1] === "/")) {
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
  const last = stack[stack.length - 1];
  console.log(`Last unclosed: '${last.char}' at index ${last.index}`);
  printContext(last.index);
} else {
  console.log("No bracket mismatches found!");
}

function printContext(index) {
  const start = Math.max(0, index - 100);
  const end = Math.min(js.length, index + 100);
  const context = js.slice(start, end);
  const indicator = " ".repeat(index - start) + "^";
  console.log("--- CONTEXT ---");
  console.log(context);
  console.log(indicator);
  console.log("----------------\n");
}
