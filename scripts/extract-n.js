const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const start = s.indexOf('N$={"/');
console.log("start", start);
const chunk = s.slice(start, start + 12000);
const dub = chunk.indexOf("dubrovnik");
console.log("first dubrovnik in chunk", dub, chunk.slice(dub - 80, dub + 450));
const k = chunk.indexOf("}},k$=()=>{const e=cn()");
console.log("k marker", k, chunk.slice(k - 120, k + 30));
