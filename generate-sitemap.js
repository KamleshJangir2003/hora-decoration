const fs = require('fs');
const path = require('path');

const base = 'https://www.horaballoondecor.com';
const lastmod = new Date().toISOString().slice(0, 10);
const routes = [
  ['/', 1.0],
  ['/city/jaipur', 0.9],
  ['/areas/mansarovar/', 0.8],
  ['/areas/mangyawas/', 0.8],
  ['/areas/vaishali-nagar/', 0.8],
  ['/areas/malviya-nagar/', 0.8],
  ['/areas/jagatpura/', 0.8],
  ['/areas/jhotwara/', 0.8],
  ['/areas/pratap-nagar/', 0.8],
  ['/areas/sanganer/', 0.8],
  ['/areas/durgapura/', 0.8],
  ['/areas/tonk-road/', 0.8],
  ['/areas/c-scheme/', 0.8],
  ['/areas/raja-park/', 0.8],
  ['/areas/sodala/', 0.8],
  ['/areas/vidhyadhar-nagar/', 0.8],
  ['/areas/civil-lines/', 0.8],
  ['/birthday-decorations', 0.9],
  ['/kids-theme-decorations', 0.9],
  ['/baby-welcome-decorations', 0.9],
  ['/baby-shower-decorations', 0.9],
  ['/anniversary-decorations', 0.9],
  ['/party-decorations', 0.8],
  ['/haldi-decorations', 0.8],
  ['/room-decorations', 0.8],
  ['/balloon-bouquets', 0.8],
  ['/candle-light-dinner', 0.8],
  ['/flower-decorations', 0.7],
  ['/office-decorations', 0.7],
  ['/premium-decorations', 0.7],
  ['/terrace-decorations', 0.7],
  ['/housewarming-decorations', 0.7],
  ['/congratulation-decorations', 0.7],
  ['/retirement-decorations', 0.7],
  ['/halloween-decorations', 0.7],
  ['/ganpati-decorations', 0.7],
  ['/jain-festival-decorations', 0.7],
  ['/diwali-decorations', 0.7],
  ['/new-year-decorations', 0.7],
  ['/christmas-decorations', 0.7],
  ['/guruji-decorations', 0.7],
  ['/bachelorette-decoration', 0.7],
  ['/ceremony-decorations', 0.7],
  ['/canopy-decorations', 0.8],
  ['/proposal-decorations', 0.8],
  ['/car-boot-decorations', 0.8],
  ['/contact', 0.6],
  ['/about', 0.6],
  ['/privacy-policy', 0.6],
  ['/terms', 0.6],
  ['/cancellation-policy', 0.6],
];

const entries = routes.map(([route, priority]) =>
  `  <url><loc>${base}${route}</loc><lastmod>${lastmod}</lastmod><priority>${priority.toFixed(1)}</priority></url>`
);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries,
  '</urlset>',
  '',
].join('\n');

const publicDir = path.join(__dirname, 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml created with ${routes.length} URLs`);
