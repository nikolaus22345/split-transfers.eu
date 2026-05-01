const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "../assets/index-BAd8RW6B.js");
let s = fs.readFileSync(p, "utf8");
const rsq = "\u2019"; // ’

const longAirportBlock =
  '"Split Airport|Split":{title:"Split Airport to Split transfer | Split Transfers",meta:"Long-distance private transfer from Split Airport to Split along the A1 coastal corridor. Comfortable vehicles for 140+ km journeys.",h1:"Southbound Dalmatia in one booking",p1:"Need to continue your holiday in Split after touching down in Split? A private transfer connects both hubs efficiently while you relax between Adriatic hotspots.",h2:"Highway-aware routing",p2:"Your driver plans around seasonal traffic near urban exits and ferry connections. Rest stops are available on longer legs if you wish.",h3:"Families and inter-city movers",p3:"Fixed route pricing suits travellers who want certainty when connecting flight schedules with cruise or ferry plans in Split."}';
const longAirportFixed =
  '"Split Airport|Dubrovnik":{title:"Split Airport to Dubrovnik transfer | Split Transfers",meta:"Long-distance private transfer from Split Airport to Dubrovnik along the A1 coastal corridor. Comfortable vehicles for 140+ km journeys.",h1:"Southbound Dalmatia in one booking",p1:"Landing at Split Airport and heading to Dubrovnik? A private transfer connects both hubs efficiently while you relax along the coast.",h2:"Highway-aware routing",p2:"Your driver plans around seasonal traffic near urban exits and ferry connections. Rest stops are available on longer legs if you wish.",h3:"Families and inter-city movers",p3:"Fixed route pricing suits travellers who want certainty when connecting flight schedules with cruise or ferry plans in Dubrovnik."}';

const cityBlock =
  `"Split|Split":{title:"Split to Split private transfer | Split Transfers",meta:"Door-to-door private transfer from Split to Split. Ideal hop between two Dalmatian capitals with fixed pricing.",h1:"City-to-city without rental stress",p1:"Swap Split${rsq}s Roman streets for Split${rsq}s Diocletian backdrop in one direct ride. Skip parking puzzles in both centres and keep your group together.",h2:"Scheduled to your timetable",p2:"Pick your departure from hotels or ferry points in Split—we align pickup with your checkout or tour end.",h3:"Leisure or business hop",p3:"Comfortable seats, luggage space, and professional drivers keep the journey productive or restful, your choice."}`;
const cityFixed =
  `"Split|Dubrovnik":{title:"Split to Dubrovnik private transfer | Split Transfers",meta:"Door-to-door private transfer from Split to Dubrovnik. Coastal hop with fixed pricing and a professional driver.",h1:"City-to-city without rental stress",p1:"Leave Split${rsq}s Diocletian quarter for Dubrovnik${rsq}s walled old town in one direct ride. Skip parking puzzles and keep your group together.",h2:"Scheduled to your timetable",p2:"Pick your departure from hotels or the port in Split—we align pickup with your checkout or tour end.",h3:"Leisure or business hop",p3:"Comfortable seats, luggage space, and professional drivers keep the journey productive or restful, your choice."}`;

if (!s.includes(longAirportBlock)) {
  console.error("long airport block not found");
  process.exit(1);
}
s = s.split(longAirportBlock).join(longAirportFixed);

if (!s.includes(cityBlock)) {
  console.error("city block not found");
  process.exit(1);
}
s = s.split(cityBlock).join(cityFixed);

fs.writeFileSync(p, s, "utf8");
console.log("SEO route keys fixed.");
