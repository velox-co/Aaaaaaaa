const fs = require("fs");
const file = "assets/index-A8fTCj9w.js";
let js = fs.readFileSync(file, "utf8");

const startToken = `c.paymentMethod==="paypal"?f.jsxs("div",{className:"space-y-2 bg-black/40 border border-white/5 p-4 rounded-lg mt-2 text-center relative"`;
const endToken = `CONFIRMER LA COMMANDE (",N.toFixed(2)," €)"]})]})})})`;

const startIdx = js.indexOf(startToken);
const endIdx = js.indexOf(endToken);

if (startIdx !== -1 && endIdx !== -1) {
  const targetText = js.slice(startIdx, endIdx + endToken.length);
  const replacementText = `c.paymentMethod==="paypal"?f.jsxs("div",{className:"space-y-3 bg-black/40 border border-white/5 p-4 rounded-lg mt-2 text-center relative",children:[f.jsxs("div",{className:"text-left mb-2.5 border-b border-white/5 pb-2.5",children:[f.jsx("span",{className:"text-xs font-bold text-white block",children:"Paiement Sécurisé Direct via PayPal"}),f.jsx("span",{className:"text-[10px] text-gray-500 block mt-0.5",children:"Vous allez être redirigé vers la page de paiement officielle de PayPal pour finaliser votre commande."})]}),f.jsxs("div",{className:"py-4 px-2 flex flex-col items-center justify-center gap-2 bg-amber-500/5 rounded border border-amber-500/10",children:[f.jsx("span",{className:"text-xs font-bold text-amber-400 uppercase tracking-wider",children:"🔒 Transactions 100% Cryptées & Sécurisées"}),f.jsxs("p",{className:"text-[10px] text-gray-400 max-w-sm mt-1",children:["Une fois que vous cliquerez sur le bouton de validation ci-dessous, la passerelle officielle PayPal s'ouvrira automatiquement pour régler votre achat de ",f.jsx("span",{className:"text-white font-bold",children:S.title})," d'un montant de ",f.jsx("span",{className:"text-cyan-400 font-bold",children:[N.toFixed(2)," €"]}),"."]})]})]}):null]})]})]}),f.jsx("div",{className:"pt-4 border-t border-white/10",children:f.jsx("button",{id:"checkout-btn-submit",type:"submit",disabled:h,className:`w-full py-3 rounded text-white font-sans text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 \${c.paymentMethod==="paypal"?"bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 shadow-[0_0_30px_rgba(245,158,11,0.2)] text-black font-extrabold":"bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] font-bold"}`,children:h?f.jsxs(f.Fragment,{children:[f.jsx("div",{className:"w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"}),f.jsx("span",{children:"TRAITEMENT..."})]}):f.jsxs(f.Fragment,{children:[f.jsx(K1,{className:"w-4 h-4"}),f.jsxs("span",{children:[c.paymentMethod==="paypal"?"PAYER VIA PAYPAL (":"CONFIRMER LA COMMANDE (",N.toFixed(2)," €)"]})]})})})`;

  js = js.replace(targetText, replacementText);
  fs.writeFileSync(file, js, "utf8");
  console.log("SUCCESS: Replaced PayPal container and universal submit button!");
} else {
  console.log("ERROR: Target indices not found!", startIdx, endIdx);
}
