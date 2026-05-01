const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "../assets/index-BAd8RW6B.js");
let s = fs.readFileSync(p, "utf8");

const guard = [
  ["__G1__", "split-to-dubrovnik"],
  ["__G2__", "Split-to-dubrovnik"],
  ["__G3__", "Split-airport-to-Dubrovnik"],
  ["__G4__", "split-to-Dubrovnik"],
  ["__G5__", "to-Dubrovnik"],
];
for (const [t, o] of guard) s = s.split(o).join(t);

// i18n route keys were misnamed "Dubrovnik*" for Zadar routes in some locales
s = s.split("DubrovnikDubrovnik").join("ZadarZadar");
s = s.split("DubrovnikSplit").join("ZadarSplit");
s = s.split("DubrovnikPula").join("ZadarPula");

const idRepl = ["DubrovnikCityCenter", "DubrovnikAirport"];
for (const id of idRepl) s = s.split(id).join(id.replace(/Dubrovnik/g, "Split"));

// Croatian / regional text
s = s.split("Dubrovnikačkog").join("Splitskog");
s = s.split("Dubrovnikskog").join("Splitskog");
s = s.split("Dubrovniker ").join("Split ");
s = s.split("Dubrovniku.").join("Splitu.");
s = s.split("Dubrovniku").join("Splitu");
s = s.split("Dubrovnika ").join("Split ");
s = s.split("Dubrovnika").join("Split");

// Remaining capital-D Dubrovnik (UI copy, SEO titles)
s = s.replace(/Dubrovnik/g, "Split");

for (const [t, o] of guard) s = s.split(t).join(o);

fs.writeFileSync(p, s, "utf8");
const out = fs.readFileSync(p, "utf8");
console.log("Dubrovnik left:", (out.match(/Dubrovnik/g) || []).length);
console.log("dubrovnik in slugs:", (out.match(/split-to-dubrovnik/g) || []).length);
console.log("Split-airport-to-Dubrovnik:", out.includes("Split-airport-to-Dubrovnik"));
