const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const needle = '"/transfers/Split-to-dubrovnik":{en:{h1:';
const i = s.indexOf(needle);
console.log("N$ dubrovnik idx", i);
console.log(s.slice(i, i + 700));
