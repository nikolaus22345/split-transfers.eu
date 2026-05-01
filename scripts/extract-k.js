const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const i = s.indexOf("k$=()=>{");
console.log(s.slice(i, i + 800));
