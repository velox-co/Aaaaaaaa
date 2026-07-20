const fs = require("fs");
const vm = require("vm");

const js = fs.readFileSync("assets/index-A8fTCj9w.js.bak", "utf8");

const startKeyword = 'f.jsxs("header",';
const endKeyword = 'glow-cyan"})]})})';

const startIdx = js.indexOf(startKeyword);
const endIdx = js.indexOf(endKeyword, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error("COULD NOT FIND BOUNDS!");
  process.exit(1);
}

const actualEndIdx = endIdx + endKeyword.length;

const replacementCode = `f.jsxs("header",{className:"relative w-full z-40 carbon-bg border-b border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden",children:[` +
  `f.jsx("div",{className:"absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[120px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"}),` +
  `f.jsxs("div",{className:"max-w-7xl mx-auto px-6 pt-8 pb-10 flex flex-col items-center relative z-10",children:[` +
    `f.jsxs("div",{className:"w-full flex items-center justify-between gap-4 md:grid md:grid-cols-12",children:[` +
      `f.jsxs("nav",{className:"hidden md:flex col-span-5 items-center justify-end gap-12 pr-6 relative py-4 w-full",children:[` +
        `f.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-white/25"}),` +
        `f.jsxs("button",{onClick:()=>ie("products-section"),className:"relative hover:text-cyan-300 text-cyan-400 font-sans text-sm tracking-[0.2em] font-extrabold uppercase transition-all duration-300 cursor-pointer px-4 py-2 rounded-t bg-gradient-to-t from-cyan-500/10 via-cyan-500/5 to-transparent",children:["Products",f.jsx("span",{className:"absolute bottom-[-1px] left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_12px_#22d3ee] rounded-full"})]}),` +
        `f.jsx("button",{onClick:()=>ie("hydrophobic-beading-demo"),className:"hover:text-cyan-400 text-gray-400 font-sans text-sm tracking-[0.2em] font-extrabold uppercase transition-colors duration-300 cursor-pointer px-4 py-2",children:"Technology"})` +
      `]}),` +
      `f.jsxs("div",{className:"col-span-2 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-[1.05] mx-auto relative z-20",children:[` +
        `f.jsx("div",{className:"relative w-24 h-24 flex items-center justify-center filter drop-shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all duration-300 group-hover:drop-shadow-[0_0_30px_rgba(6,182,212,0.85)]",children:f.jsx(xs,{className:"w-22 h-22",accentColor:"cyan"})})` +
      `]}),` +
      `f.jsxs("nav",{className:"hidden md:flex col-span-5 items-center justify-start gap-12 pl-6 relative py-4 w-full",children:[` +
        `f.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/25 via-white/10 to-transparent"}),` +
        `f.jsx("button",{onClick:()=>m("about"),className:"hover:text-cyan-400 text-gray-400 font-sans text-sm tracking-[0.2em] font-extrabold uppercase transition-colors duration-300 cursor-pointer px-4 py-2",children:"About"}),` +
        `f.jsx("button",{onClick:()=>m("contact"),className:"hover:text-cyan-400 text-gray-400 font-sans text-sm tracking-[0.2em] font-extrabold uppercase transition-colors duration-300 cursor-pointer px-4 py-2",children:"Contact"})` +
      `]}),` +
      `f.jsx("button",{id:"mobile-menu-toggle",onClick:()=>p(!h),className:"md:hidden p-2 rounded-lg border border-white/10 bg-black/40 text-gray-400 hover:text-white transition-colors cursor-pointer ml-auto",children:h?f.jsx(pr,{className:"w-6 h-6"}):f.jsx(B1,{className:"w-6 h-6"})})` +
    `]}),` +
    `f.jsx("h1",{className:"text-4xl sm:text-5xl font-sans font-black tracking-[0.3em] pl-[0.3em] mt-6 uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]",children:"VELOX"}),` +
    `f.jsxs("div",{className:"mt-4 flex flex-col items-center space-y-3 px-4 text-center",children:[` +
      `f.jsx("h2",{className:"text-lg sm:text-xl lg:text-2xl font-sans font-black tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-400 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]",children:"PROTECTION BEYOND COMPARE"}),` +
      `f.jsx("div",{className:"w-24 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee]"})` +
    `]})` +
  `]}),` +
  `h&&f.jsxs("div",{id:"mobile-dropdown-menu",className:"md:hidden bg-[#05080f]/95 backdrop-blur-md border-t border-b border-white/5 px-6 py-5 flex flex-col gap-4 text-xs font-mono text-left tracking-wider shadow-inner",children:[` +
    `f.jsx("button",{onClick:()=>{p(!1);ie("products-section")},className:"py-2 text-gray-300 hover:text-cyan-400 font-bold uppercase transition-colors",children:"PRODUCTS"}),` +
    `f.jsx("button",{onClick:()=>{p(!1);ie("hydrophobic-beading-demo")},className:"py-2 text-gray-300 hover:text-cyan-400 font-bold uppercase transition-colors",children:"TECHNOLOGY"}),` +
    `f.jsx("button",{onClick:()=>{p(!1);m("about")},className:"py-2 text-gray-300 hover:text-cyan-400 font-bold uppercase transition-colors",children:"ABOUT"}),` +
    `f.jsx("button",{onClick:()=>{p(!1);m("contact")},className:"py-2 text-gray-300 hover:text-cyan-400 font-bold uppercase transition-colors",children:"CONTACT"})` +
  `]})` +
`]})`;

const updatedJs = js.slice(0, startIdx) + replacementCode + js.slice(actualEndIdx);

fs.writeFileSync("assets/index-A8fTCj9w-test.js", updatedJs, "utf8");
console.log("Wrote test file.");

try {
  new vm.Script(updatedJs, { filename: "test_replaced.js" });
  console.log("SYNTAX VALIDATION PASSED!");
} catch (e) {
  console.error("SYNTAX VALIDATION FAILED:");
  console.error(e.message);
  console.error(e.stack);
}
