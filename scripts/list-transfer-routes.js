const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const m = s.match(/path:"transfers\/[^"]+"/g) || [];
const tr = s.match(/path:"transfer[^"]+"/g) || [];
const filtered = m.filter(
  (x) => x.includes("airport") || x.toLowerCase().includes("dubrovnik")
);
console.log(filtered.join("\n"));
console.log("transfer-* routes", tr.length, tr.slice(0, 40).join("\n"));

const needle = 'path:"transfers/Split-airport-to-Dubrovnik"';
const i = s.indexOf(needle);
console.log("\nCONTEXT Split-airport-to-Dubrovnik:\n", s.slice(i - 100, i + 180));

const j = s.indexOf('path:"transfers/Split-airport-to-split"');
console.log("\nCONTEXT airport-to-split:\n", s.slice(j - 50, j + 120));
