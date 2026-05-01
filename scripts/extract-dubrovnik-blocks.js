const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const needles = [
  '"/transfers/Split-to-dubrovnik"',
  '"/transfers/split-to-dubrovnik"',
  "Split-airport-to-Dubrovnik",
  "split-airport-to-dubrovnik",
  "transfer-Split-split",
];
for (const n of needles) {
  const i = s.indexOf(n);
  console.log("\n===", n, "idx", i);
  if (i >= 0) console.log(s.slice(i, i + 700));
}

const bad = "Split to Split Transfer";
let j = 0;
let count = 0;
while ((j = s.indexOf(bad, j)) !== -1 && count < 5) {
  console.log("\n=== BAD at", j);
  console.log(s.slice(j - 120, j + 400));
  j++;
  count++;
}

const airportDub = "Split-airport-to-Dubrovnik";
const k = s.indexOf(airportDub);
console.log("\n=== airport dubrovnik context", k);
if (k >= 0) console.log(s.slice(k - 200, k + 500));
