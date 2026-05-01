const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const start = s.indexOf("DN={");
let end = s.indexOf("},KU=(e,t,r)=>{");
if (end < 0) end = s.indexOf("},qU=()=>{");
console.log("start", start, "end", end, "len", end - start);
const dn = end > start ? s.slice(start, end + 1) : "";
console.log(dn.slice(0, 2500));
console.log("\n...tail...\n", dn.slice(-800));
const pl = dn.indexOf('"Plitvice Lakes"');
console.log("\nAfter Plitvice:", dn.slice(pl, pl + 200));
