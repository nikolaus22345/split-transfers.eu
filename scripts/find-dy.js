const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const needle = 'dy={"/';
const i = s.indexOf(needle);
console.log("idx", i);
console.log(s.slice(i, i + 2500));
