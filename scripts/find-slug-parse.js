const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const needles = ["-to-", "slugTo", "parseRoute", "routeFrom", "transferSlug"];
for (const n of needles) {
  let c = 0;
  let i = 0;
  while ((i = s.indexOf(n, i)) !== -1 && c < 3) {
    console.log("\n---", n, "at", i);
    console.log(s.slice(i, i + 200));
    i++;
    c++;
  }
}
