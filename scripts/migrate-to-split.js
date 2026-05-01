/**
 * One-off migration: Dubrovnik hub -> Split hub for split-transfers.eu
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

function migrateBundle(file) {
  const p = path.join(root, file);
  let s = fs.readFileSync(p, "utf8");

  // SEO route keys — order avoids duplicate object keys after hub rename
  const keyPairs = [
    ['"Dubrovnik|Dubrovnik":', '"Split|Trogir":'], // long coastal hop; unique key
    ['"Dubrovnik|Split":', '"Split|Dubrovnik":'],
    ['"Dubrovnik Airport|Split":', '"Split Airport|Dubrovnik":'],
    ['"Dubrovnik Airport|Dubrovnik":', '"Split Airport|Split":'],
    ['"Dubrovnik Airport|', '"Split Airport|'],
    ['"Dubrovnik|Plitvice Lakes":', '"Split|Plitvice Lakes":'],
  ];
  for (const [a, b] of keyPairs) {
    if (!s.includes(a)) console.warn("missing key fragment:", a.slice(0, 40));
    s = s.split(a).join(b);
  }

  const rest = [
    ["Dubrovnik Transfers", "Split Transfers"],
    ["dubrovnik-transfers.hr", "split-transfers.eu"],
    ["Dubrovnik Airport", "Split Airport"],
    ["dubrovniktransfers.hr@gmail.com", "splittransfers.eu@gmail.com"],
    ["Dubrovnik-airport", "Split-airport"],
    ["Dubrovnik-city-center", "Split-city-center"],
    ["Dubrovnik-port", "Split-port"],
    ["Dubrovnik-bus-station", "Split-bus-station"],
    ["Dubrovnik-Old-Town", "Split-Old-Town"],
    ["Dubrovnik-old-town", "Split-old-town"],
    ["|Dubrovnik Transfers", "|Split Transfers"],
    ["from ZAD to the city", "from SPU to the city"],
    ["from ZAD toward", "from SPU toward"],
    ["(DBV)", "(SPU)"],
    [" DBV ", " SPU "],
    [" DBV)", " SPU)"],
    ["(DBV)", "(SPU)"],
  ];
  for (const [a, b] of rest) s = s.split(a).join(b);

  fs.writeFileSync(p, s, "utf8");
  console.log("wrote", file);
}

function replaceInFile(rel, pairs) {
  const p = path.join(root, rel);
  let s = fs.readFileSync(p, "utf8");
  for (const [a, b] of pairs) s = s.split(a).join(b);
  fs.writeFileSync(p, s, "utf8");
  console.log("wrote", rel);
}

migrateBundle("assets/index-BAd8RW6B.js");

const common = [
  ["https://www.dubrovnik-transfers.hr", "https://www.split-transfers.eu"],
  ["http://www.dubrovnik-transfers.hr", "https://www.split-transfers.eu"],
  ["dubrovnik-transfers.hr", "split-transfers.eu"],
  ["Dubrovnik Transfers", "Split Transfers"],
  ["Dubrovnik Airport", "Split Airport"],
  ["Dubrovnik-airport", "Split-airport"],
  ["Dubrovnik-city-center", "Split-city-center"],
  ["Dubrovnik-port", "Split-port"],
  ["Dubrovnik-bus-station", "Split-bus-station"],
  ["Dubrovnik-Old-Town", "Split-Old-Town"],
  ["Dubrovnik-old-town", "Split-old-town"],
  ["dubrovniktransfers.hr@gmail.com", "splittransfers.eu@gmail.com"],
  ["private transfers in Dubrovnik", "private transfers in Split"],
  ["transfers in Dubrovnik", "transfers in Split"],
  ["Book reliable private transfers in Dubrovnik", "Book reliable private transfers in Split"],
  ["Dubrovnik, Croatia", "Split, Croatia"],
  ["Dubrovnik airport", "Split airport"],
  ["Dubrovnik Airport (DBV)", "Split Airport (SPU)"],
  ["Dubrovnik Bus Station", "Split Bus Station"],
  ["Dubrovnik Central Station", "Split Central Station"],
  ["Dubrovnik City Center", "Split City Center"],
  ["Dubrovnik Old Town", "Split Old Town"],
  ["Dubrovnik Train Station", "Split Train Station"],
  ["city: \"Dubrovnik\"", "city: \"Split\""],
  ["city: 'Dubrovnik'", "city: 'Split'"],
  ["(DBV)", "(SPU)"],
];

replaceInFile("sitemap.xml", common);
replaceInFile("api/send-form.js", common);
replaceInFile("booking-form-script.js", common);
replaceInFile("simple-booking-script.js", common);
replaceInFile("booking-form-php-handler.php", common);
replaceInFile("elementor-booking-form.html", common);
replaceInFile("elementor-simple-booking-form.html", common);
