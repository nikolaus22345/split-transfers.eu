const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const needle = '"/transfers/Split-to-dubrovnik":{en:{h1:';
const i = s.indexOf(needle);
console.log("Capital Split idx", i);
const j = s.indexOf('"/transfers/split-to-dubrovnik":{');
console.log("lower idx", j, j >= 0 ? s.slice(j, j + 200) : "");
