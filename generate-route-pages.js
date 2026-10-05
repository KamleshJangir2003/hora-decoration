const fs = require('fs');
const path = require('path');

const root = __dirname;
const distDir = path.join(root, 'dist');
const shellPath = path.join(distDir, 'index.html');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const base = 'https://www.horaballoondecor.com';
const source = fs.readFileSync(path.join(root, 'src', 'main.jsx'), 'utf8');
const blogSource = fs.readFileSync(path.join(root, 'src', 'blog-content.js'), 'utf8');
const shell = fs.readFileSync(shellPath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');

const aliases = {
  '/birthday-decorations': '/decorations/birthday',
  '/kids-theme-decorations': '/decorations/kids-theme-decor',
  '/baby-welcome-decorations': '/decorations/newborn-welcome',
  '/baby-shower-decorations': '/decorations/baby-shower',
  '/haldi-decorations': '/decorations/haldi-decoration',
  '/anniversary-decorations': '/decorations/anniversary',
  '/room-decorations': '/decorations/romantic-room-decoration',
  '/balloon-bouquets': '/decorations/balloon',
  '/proposal-decorations': '/decorations/proposal-decoration'
};
const excluded = new Set(Object.keys(aliases));
const noindex = new Set(['/search', '/cart', '/checkout', '/wishlist', '/login', '/account', '/account/orders']);
const routes = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(match => new URL(match[1]).pathname)
);

for (const match of source.matchAll(/['"](\/(?:[a-zA-Z0-9_-]+\/?)+)['"]/g)) {
  routes.add(match[1]);
}
for (const match of source.matchAll(/path="(\/(?:[a-zA-Z0-9_-]+\/?)+)"/g)) {
  routes.add(match[1]);
}
for (const match of blogSource.matchAll(/slug:\s*'([^']+)'/g)) {
  routes.add(`/blog/${match[1]}`);
}
for (const match of source.matchAll(/homeProduct\('([^']+)'/g)) {
  const slug = match[1]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  routes.add(`/decor/${slug}`);
}
routes.add('/search');
routes.add('/cart');
routes.add('/checkout');
routes.add('/wishlist');
routes.add('/login');
routes.add('/account');
routes.add('/account/orders');
for (const route of excluded) routes.delete(route);
const normalizedRoutes = new Set(
  [...routes].map(route => route.replace(/\/+$/, '') || '/')
);
routes.clear();
for (const route of normalizedRoutes) routes.add(route);

const areaMetadata = new Map();
const jaipurAreas = source.match(/const jaipurAreaPages=\[([\s\S]*?)\n\];/);
if (jaipurAreas) {
  for (const match of jaipurAreas[1].matchAll(/\{slug:'([^']+)',name:'([^']+)',title:'([^']+)',description:'([^']+)'/g)) {
    areaMetadata.set(`/areas/${match[1]}`, { title: match[3], description: match[4] });
  }
}

const blogMetadata = new Map();
for (const match of blogSource.matchAll(/slug:\s*'([^']+)',[\s\S]*?title:\s*'([^']+)',\s*description:\s*'([^']+)'/g)) {
  blogMetadata.set(`/blog/${match[1]}`, {
    title: `${match[2]} | Hora Balloon Decor`,
    description: match[3]
  });
}

const specificMetadata = new Map([
  ['/', {
    title: 'Balloon Decoration in Jaipur | Hora Balloon Decor',
    description: 'Explore birthday, anniversary, baby shower and room balloon decoration in Jaipur. Browse styles and ask Hora Balloon Decor about designs and availability.'
  }],
  ['/city/jaipur', {
    title: 'Jaipur Balloon Decor Services | Hora Balloon Decor',
    description: 'Explore balloon, birthday, anniversary and baby shower decoration services in Jaipur. Contact Hora Balloon Decor to discuss designs and check event availability.'
  }],
  ['/decorations/birthday', {
    title: 'Birthday Decoration in Jaipur | Hora Balloon Decor',
    description: 'Browse birthday decoration ideas in Jaipur, from balloon arches and backdrops to home and kids’ celebration setups. Ask about your date and venue.'
  }],
  ['/decorations/birthday-balloon-decoration', {
    title: 'Birthday Balloon Decoration Jaipur | Hora Balloon Decor',
    description: 'Explore birthday balloon decoration in Jaipur, including arches, themed backdrops and milestone designs. Contact us to discuss setup details.'
  }],
  ['/decorations/balloon', {
    title: 'Balloon Decorators in Jaipur | Hora Balloon Decor',
    description: 'Explore balloon decoration in Jaipur, including arches, garlands, bouquets and backdrops. Share your venue and date to ask about availability.'
  }],
  ['/decorations/anniversary', {
    title: 'Anniversary Decoration in Jaipur | Hora Balloon Decor',
    description: 'Plan anniversary balloon and room decoration in Jaipur. Browse romantic setups and contact Hora Balloon Decor to discuss your event.'
  }],
  ['/decorations/baby-shower', {
    title: 'Baby Shower Decoration in Jaipur | Hora Balloon Decor',
    description: 'Explore baby shower decoration in Jaipur, including themed balloon setups and backdrops. Share your venue, date and design preferences.'
  }],
  ['/decorations/romantic-room-decoration', {
    title: 'Room Decoration in Jaipur | Hora Balloon Decor',
    description: 'Browse room and surprise decoration ideas in Jaipur for birthdays and anniversaries. Ask about setup options for your space and date.'
  }],
  ['/contact', {
    title: 'Contact Hora Balloon Decor | Jaipur Balloon Decoration',
    description: 'Contact Hora Balloon Decor to discuss balloon decoration in Jaipur. Call or WhatsApp +91 7023972708 with your date, venue and event details.'
  }],
  ['/blog', {
    title: 'Jaipur Decoration Planning Guides | Hora Balloon Decor',
    description: 'Practical guides for planning birthday, balloon and room decoration in Jaipur, including setup choices, booking details and questions to ask.'
  }]
]);

const escapeHtml = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');
const humanize = value => value
  .split('/')
  .filter(Boolean)
  .at(-1)
  .replace(/-/g, ' ')
  .replace(/\b\w/g, character => character.toUpperCase());

function metadataFor(route) {
  const cleanRoute = route === '/' ? '/' : route.replace(/\/+$/, '');
  const exact = specificMetadata.get(cleanRoute) || areaMetadata.get(cleanRoute) || blogMetadata.get(cleanRoute);
  if (exact) return exact;
  const name = humanize(cleanRoute);
  return {
    title: `${name} in Jaipur | Hora Balloon Decor`,
    description: `Explore ${name.toLowerCase()} designs from Hora Balloon Decor in Jaipur. Contact us with your event date and location to discuss details and availability.`
  };
}
function isNoindex(route) {
  return noindex.has(route) || route.startsWith('/decor/') || route.startsWith('/product/');
}

function replaceTag(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace('</head>', `    ${replacement}\n  </head>`);
}

function replaceMeta(html, attribute, name, content) {
  const attributePattern = new RegExp(`\\b${attribute}\\s*=\\s*(["'])${name}\\1`, 'i');
  const contentPattern = /\bcontent\s*=\s*(["'])[\s\S]*?\1/i;
  let replaced = false;
  html = html.replace(/<meta\b[^>]*>/gs, tag => {
    if (!attributePattern.test(tag)) return tag;
    replaced = true;
    const escapedContent = escapeHtml(content);
    if (contentPattern.test(tag)) {
      return tag.replace(contentPattern, `content="${escapedContent}"`);
    }
    return tag.replace(/\s*\/?>$/, ending => ` content="${escapedContent}"${ending}`);
  });

  if (replaced) return html;
  return html.replace('</head>', `    <meta ${attribute}="${name}" content="${escapeHtml(content)}" />\n  </head>`);
}

function htmlForRoute(route) {
  const metadata = metadataFor(route);
  const canonical = `${base}${route === '/' ? '/' : route.replace(/\/+$/, '')}`;
  let html = shell.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`);
  html = replaceMeta(html, 'name', 'description', metadata.description);
  html = replaceMeta(html, 'name', 'robots', isNoindex(route) ? 'noindex,follow' : 'index,follow,max-image-preview:large');
  html = replaceTag(html, /<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = replaceMeta(html, 'property', 'og:title', metadata.title);
  html = replaceMeta(html, 'property', 'og:description', metadata.description);
  html = replaceMeta(html, 'property', 'og:url', canonical);
  html = replaceMeta(html, 'property', 'og:type', route.startsWith('/blog/') ? 'article' : 'website');
  html = replaceMeta(html, 'name', 'twitter:title', metadata.title);
  html = replaceMeta(html, 'name', 'twitter:description', metadata.description);
  if (route !== '/') {
    html = html.replace(/<link\b(?=[^>]*data-critical-hero)[^>]*\/>\s*/g, '');
  }
  return html;
}

let generatedCount = 0;
for (const route of routes) {
  if (route === '/' || route.includes('?') || route.includes('#')) continue;
  const normalized = route.replace(/\/+$/, '');
  if (!normalized) continue;
  const outputPath = path.join(distDir, `${normalized.slice(1)}.html`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, htmlForRoute(normalized), 'utf8');
  generatedCount++;
}

console.log(`Generated static route shells with unique metadata for ${generatedCount} routes`);
