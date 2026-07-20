const fs = require("fs");
const vm = require("vm");

const jsOriginal = fs.readFileSync("assets/index-A8fTCj9w.js", "utf8");

// The exact stretch of characters from index 260921 to 260932 (length 12) is: "})]})})})})}"
const targetSeq = "})]})})})})}";
const prefix = jsOriginal.slice(0, 260921);
const suffix = jsOriginal.slice(260933);

console.log("Original Target Sequence in file:", targetSeq);

// Let's generate all 4096 subsets of this 12-char sequence
const found = [];

function generateSubsets(index, current) {
  if (index === targetSeq.length) {
    const candidateJs = prefix + current + suffix;
    try {
      new vm.Script(candidateJs, { filename: "candidate.js" });
      found.push(current);
    } catch (e) {
      // Ignored
    }
    return;
  }
  // Exclude current char
  generateSubsets(index + 1, current);
  // Include current char
  generateSubsets(index + 1, current + targetSeq[index]);
}

console.log("Testing all 4096 subsets of the bracket sequence...");
generateSubsets(0, "");

console.log("Found valid sequences:", found);

if (found.length > 0) {
  // Let's print the shortest valid sequence
  found.sort((a, b) => a.length - b.length);
  const best = found[0];
  console.log(`Shortest valid bracket sequence: "${best}"`);
  
  // Save it to index-A8fTCj9w.js
  const finalJs = prefix + best + suffix;
  fs.writeFileSync("assets/index-A8fTCj9w.js", finalJs, "utf8");
  console.log("SUCCESS! Restored syntax of assets/index-A8fTCj9w.js successfully.");
} else {
  console.log("Failed to find any valid sequence.");
}
