const fs = require('fs');
const path = require('path');

const base = 'https://www.horaballoondecor.com';
const routes = [
  '/',
  '/city/jaipur',
  '/areas/mansarovar',
  '/areas/mangyawas',
  '/areas/vaishali-nagar',
  '/areas/malviya-nagar',
  '/areas/jagatpura',
  '/areas/jhotwara',
  '/areas/pratap-nagar',
  '/areas/sanganer',
  '/areas/durgapura',
  '/areas/tonk-road',
  '/areas/c-scheme',
  '/areas/raja-park',
  '/areas/sodala',
  '/areas/vidhyadhar-nagar',
  '/areas/civil-lines',
  '/decorations/birthday',
  '/decorations/birthday-balloon-decoration',
  '/decorations/1st-birthday-decor',
  '/decorations/kids-birthday-themes',
  '/decorations/birthday-balloon-arch',
  '/decorations/birthday-party-backdrops',
  '/decorations/balloon',
  '/decorations/balloon-arches',
  '/decorations/balloon-bouquets',
  '/decorations/organic-balloon-decor',
  '/decorations/number-balloons',
  '/decorations/balloon-backdrops',
  '/decorations/anniversary',
  '/decorations/romantic-room-decoration',
  '/decorations/anniversary-balloon-decor',
  '/decorations/candlelight-setup',
  '/decorations/proposal-decoration',
  '/decorations/surprise-decoration',
  '/decorations/baby-shower',
  '/decorations/baby-shower-decor',
  '/decorations/newborn-welcome',
  '/decorations/naming-ceremony',
  '/decorations/kids-theme-decor',
  '/decorations/first-birthday',
  '/decorations/wedding',
  '/decorations/engagement-decoration',
  '/decorations/haldi-decoration',
  '/decorations/mehendi-decoration',
  '/decorations/wedding-backdrops',
  '/party-decorations',
  '/stage-decorations',
  '/canopy-decorations',
  '/car-boot-decorations',
  '/candle-light-dinner',
  '/flower-decorations',
  '/office-decorations',
  '/premium-decorations',
  '/terrace-decorations',
  '/housewarming-decorations',
  '/congratulation-decorations',
  '/retirement-decorations',
  '/halloween-decorations',
  '/ganpati-decorations',
  '/jain-festival-decorations',
  '/diwali-decorations',
  '/new-year-decorations',
  '/christmas-decorations',
  '/guruji-decorations',
  '/bachelorette-decoration',
  '/ceremony-decorations',
  '/contact',
  '/about',
  '/privacy-policy',
  '/terms',
  '/cancellation-policy',
  '/blog',
  '/blog/birthday-decoration-ideas-jaipur',
  '/blog/birthday-decoration-cost-jaipur',
  '/blog/birthday-room-surprise-decoration'
];

if (new Set(routes).size !== routes.length) {
  throw new Error('Sitemap route list contains duplicate URLs.');
}

const escapeXml = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(route => `  <url><loc>${escapeXml(base + route)}</loc></url>`),
  '</urlset>',
  ''
].join('\n');

const publicDir = path.join(__dirname, 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml created with ${routes.length} canonical URLs`);
