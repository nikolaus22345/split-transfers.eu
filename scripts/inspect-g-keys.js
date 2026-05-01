const fs = require("fs");
const s = fs.readFileSync(
  "c:/Users/Korisnik/Desktop/split-transfers.eu/assets/index-BAd8RW6B.js",
  "utf8"
);
const start = s.indexOf("LX=(e,t)=>{const G={");
if (start < 0) {
  console.log("G not found");
  process.exit(1);
}
const sub = s.slice(start, start + 200000);
const keys = [];
const re = /"([^"]+\|[^"]+)":/g;
let m;
while ((m = re.exec(sub)) && keys.length < 200) keys.push(m[1]);
const dub = keys.filter((k) => /dubrovnik/i.test(k));
const airportDub = keys.filter((k) => /airport/i.test(k) && /dubrovnik/i.test(k));
console.log("Dubrovnik keys:", dub);
console.log("Airport Dubrovnik:", airportDub);
console.log("Split|Split:", keys.filter((k) => k === "Split|Split"));
