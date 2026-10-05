# Hora Balloon Decor SEO audit and implementation record

Audit scope: the source-controlled React/Vite website and production build output. Search volume, rankings, Search Console coverage, analytics, Core Web Vitals field data, Google Business Profile access, and third-party directory listings were not available. Scores and page priorities below are therefore engineering estimates, not performance measurements.

## Work completed in the codebase

- Added route-specific titles, descriptions, canonical URLs, robots directives, and Open Graph/Twitter metadata to static route shells generated after Vite builds.
- Kept only the canonical site URLs in the generated sitemap; removed trailing slash variants and interactive/noindex destinations.
- Removed the Vercel catch-all SPA rewrite that made every unknown URL appear to be a successful page. Vercel clean URLs and explicit permanent redirects now serve canonical routes and aliases; `public/404.html` is the not-found document.
- Added static shells for routes discoverable from the sitemap and app source, including product URLs derived from the current home-product catalogue.
- Added a small blog at `/blog` with three substantial planning articles and internal links to relevant services, Jaipur information, and contact.
- Added or improved page-level metadata, headings, local service content, FAQ content/schema, breadcrumbs, and related links on the homepage, service/collection, Jaipur, locality, blog, and contact surfaces.
- Added or aligned WebSite, LocalBusiness, Service, WebPage, FAQPage, BreadcrumbList, and Article structured data where page content supports it. No ratings or reviews were invented.
- Retained the existing phone, email, and address already in the site. Do not republish or alter business details without owner verification.
- No image files were bulk-renamed or recompressed. Key image alt/dimension/loading attributes were improved where handled in the page code; this does not constitute a complete media-library optimization.

## Keyword-to-page map

These are relevance-based targets, not claims about search volume or ranking. Use the primary term in the page title/H1/body where natural, with related terms in supporting copy and internal anchors.

| Keyword | Search intent | Target page | Priority | Where to use |
|---|---|---|---|---|
| balloon decoration in Jaipur | Local commercial | `/` | Primary | Homepage title/H1, intro, Jaipur service links |
| balloon decorators in Jaipur | Local commercial/provider selection | `/decorations/balloon` | Primary | Balloon service title/H1, service copy, contact CTA |
| birthday decoration in Jaipur | Local commercial | `/decorations/birthday` | Primary | Birthday page title/H1, options, FAQs |
| birthday balloon decoration Jaipur | Local commercial/service-specific | `/decorations/birthday-balloon-decoration` | Primary | Service title/H1, setup descriptions, related links |
| balloon decoration near me | Local commercial/mobile | `/city/jaipur` | Secondary | Jaipur service-area copy and contact CTA; do not force exact phrase into every page |
| birthday decoration cost in Jaipur | Pricing research | `/blog/birthday-decoration-cost-jaipur` | Primary | Article title, cost factors, quote-planning links |
| birthday decoration ideas in Jaipur | Informational/local | `/blog/birthday-decoration-ideas-jaipur` | Primary | Article title and practical planning sections |
| birthday room decoration ideas in Jaipur | Informational/commercial | `/blog/birthday-room-surprise-decoration` | Primary | Article title/content and room-decoration links |
| balloon arch decoration in Jaipur | Local commercial | `/decorations/birthday-balloon-arch` | Secondary | Arch page title/heading, image alt where accurate, service links |
| anniversary decoration in Jaipur | Local commercial | `/decorations/anniversary` | Primary | Service title/H1, options, FAQs |
| baby shower decoration in Jaipur | Local commercial | `/decorations/baby-shower` | Primary | Service title/H1, options, FAQs |
| kids birthday theme decoration in Jaipur | Local commercial | `/decorations/kids-birthday-themes` | Secondary | Kids-theme page, options and birthday cross-links |
| newborn welcome decoration in Jaipur | Local commercial | `/decorations/newborn-welcome` | Secondary | Service content, appropriate image alt, related links |
| balloon backdrop decoration in Jaipur | Local commercial | `/decorations/balloon-backdrops` | Secondary | Backdrop collection copy and related-service anchors |
| simple birthday decoration at home in Jaipur | Informational/commercial | `/blog/birthday-decoration-ideas-jaipur` | Secondary | Article section about compact home setups and linked service |

## Five priority pages: before/after summary

Priority reflects business relevance and intent coverage, not measured traffic. The original shared metadata and sparse/general page copy made page differentiation weaker.

| Page | Before | After implemented |
|---|---|---|
| Homepage `/` | Global metadata duplicated at the app root; broad catalogue-led page with limited local context. | Unique title/description/canonical/social metadata; Jaipur-focused H1 and supporting copy; visible FAQs with matching FAQ schema; internal paths to services, locality information, blog, and contact. |
| Birthday `/decorations/birthday` | Collection page relied on shared/default metadata and limited contextual planning information. | Dedicated title/description, clearer heading hierarchy and supporting content, relevant FAQ/schema and links to birthday balloon options, Jaipur and contact. |
| Balloon `/decorations/balloon` | Broad service intent was not clearly distinguished from other decoration collections. | Dedicated balloon-decorator metadata and copy, related balloon-service links, FAQ/schema and direct contact path. |
| Jaipur `/city/jaipur` | City page title duplicated the homepage target; local service intent and metadata were less differentiated. | Distinct title/description/canonical, Jaipur service information, local Service and breadcrumb schema, and internal paths to relevant services/contact. |
| Mansarovar `/areas/mansarovar` | Locality pages had duplicated/template-like signals and limited connected navigation. | Distinct locality title/description, area-specific introduction/service context/FAQ data, breadcrumb and Service schema, related-area/service links, and contact CTA. Other retained area pages use their own area data rather than blanket title substitutions. |

## Architecture and internal-link plan

Current functional hierarchy:

```text
Home
├── Service/occasion collections
│   ├── Related individual service collections
│   └── Product detail routes (noindex)
├── Jaipur service page
│   └── Retained locality pages
├── Blog
│   └── Three published planning articles
└── Contact / policies
```

The header/footer and contextual page links connect important routes; service and area pages link to relevant collections, Jaipur information, and contact. Blog articles link to relevant service pages and contact. Sitemap membership is restricted to canonical, intended indexable pages. Login, cart, search, checkout, wishlist, account and product-detail routes are excluded from the sitemap or marked noindex as applicable. Legacy category aliases redirect to their canonical destinations.

The code audit did not find evidence of an orphan among the routes deliberately included in the sitemap. A full rendered-link crawl (including runtime product feeds), Search Console coverage review, and external backlink crawl are still required after deployment. Locality copy should remain only where it can be kept meaningfully distinct and operationally accurate; do not add more neighborhood URLs merely to multiply landing pages.

## Locality page disposition

The existing service-area set retained in the sitemap is Mansarovar, Mangyawas, Vaishali Nagar, Malviya Nagar, Jagatpura, Jhotwara, Pratap Nagar, Sanganer, Durgapura, Tonk Road, C-Scheme, Raja Park, Sodala, Vidhyadhar Nagar, and Civil Lines. Each is backed by area-specific page data, links, and FAQs rather than a blind word replacement. No local branch, landmark partnership, on-site availability, or neighborhood customer claim has been added. Reconfirm that the business actually serves each area and review each page for genuinely useful local details before expanding this set.

## Blog and supporting article plan

The blog is a small, design-preserving route within the existing application. Three useful articles are published in source; the remainder below are ideas, not published content. Publish only after a human confirms service details and adds original guidance or project imagery.

| # | Status | Topic / suggested title | Target keyword | Intent | Suggested URL | Internal links | Target service page |
|---|---|---|---|---|---|---|---|
| 1 | Published | Birthday Decoration Ideas in Jaipur: Plan a Setup That Fits Your Space | birthday decoration ideas in Jaipur | Informational/local | `/blog/birthday-decoration-ideas-jaipur` | Birthday collection, birthday balloon setup, Jaipur, contact | `/decorations/birthday` |
| 2 | Published | Birthday Decoration Cost in Jaipur: What Affects Your Quote? | birthday decoration cost in Jaipur | Commercial research | `/blog/birthday-decoration-cost-jaipur` | Birthday collection, balloon arch, Jaipur, contact | `/decorations/birthday` |
| 3 | Published | Birthday Room Surprise Decoration: A Practical Planning Guide | birthday room decoration ideas in Jaipur | Informational/commercial | `/blog/birthday-room-surprise-decoration` | Room decoration, birthday collection, Jaipur, contact | `/decorations/romantic-room-decoration` |
| 4 | Planned | Balloon Decoration Ideas for Birthday Parties: Choose a Setup for Your Space | balloon decoration ideas for birthday party | Informational/commercial | `/blog/balloon-decoration-ideas-birthday-party` | Birthday balloon, arch, backdrop, contact | `/decorations/birthday-balloon-decoration` |
| 5 | Planned | Anniversary Decoration Ideas in Jaipur: Room, Backdrop and Balloon Options | anniversary decoration ideas in Jaipur | Informational/local | `/blog/anniversary-decoration-ideas-jaipur` | Anniversary, room decoration, Jaipur, contact | `/decorations/anniversary` |
| 6 | Planned | Baby Shower Decoration Ideas in Jaipur: Themes and Setup Questions | baby shower decoration ideas in Jaipur | Informational/local | `/blog/baby-shower-decoration-ideas-jaipur` | Baby shower, balloon backdrops, Jaipur, contact | `/decorations/baby-shower` |
| 7 | Planned | Balloon Decoration for a Home Birthday Party: Space and Setup Checklist | balloon decoration for home birthday party | Informational/commercial | `/blog/balloon-decoration-home-birthday-party` | Birthday, arches, room surprise, contact | `/decorations/birthday-balloon-decoration` |
| 8 | Planned | Simple Balloon Decoration Ideas for a Small Party | simple balloon decoration ideas for small party | Informational | `/blog/simple-balloon-decoration-small-party` | Balloon collection, birthday, contact | `/decorations/balloon` |
| 9 | Planned | How to Choose a Balloon Decorator in Jaipur: Questions Before Booking | how to choose a balloon decorator in Jaipur | Commercial research | `/blog/choose-balloon-decorator-jaipur` | Jaipur, birthday, balloon collection, contact | `/decorations/balloon` |
| 10 | Planned | Event Decoration Ideas in Jaipur: Match the Setup to the Occasion | event decoration ideas in Jaipur | Informational/local | `/blog/event-decoration-ideas-jaipur` | Relevant occasion collections, Jaipur, contact | `/party-decorations` |

## Backlink and citation strategy

No backlink has been created or verified by this code change. Research and pursue only genuine business citations and editorial/partner references:

1. Claim/verify the Google Business Profile and keep the exact business name, phone, website and verified service area consistent.
2. Check eligibility and maintain a consistent listing in major map/business platforms (for example Bing Places and Apple Business Connect).
3. Evaluate established India/Rajasthan/Jaipur business directories and event-vendor directories manually for active listings, editorial standards, duplicate policies, and fees before submitting.
4. Ask real Jaipur venues, photographers, caterers, event planners, and wedding/event partners about useful vendor-resource pages or project credits; request attribution only for real work.
5. Offer original, useful event-planning material or photography to relevant Jaipur/Rajasthan publishers; prioritize editorial relevance over exact-match anchor links.
6. Audit existing citations for exact NAP consistency. Do not buy bulk links, create fake profiles, or mass-submit spun descriptions.

Use [`backlink-tracker.csv`](./backlink-tracker.csv) to record researched opportunities and verified outcomes. Rows are intentionally empty until a specific opportunity and URL are checked.

## Technical and content issues / remaining actions

### Fixed in source/build

- Global/root SEO component that could overwrite route-specific metadata.
- Duplicate or generic titles/descriptions on key pages and selected route shells.
- Canonical aliases and sitemap URLs that were not aligned with canonical routes.
- Sitemap entries for noncanonical trailing-slash locality paths and non-indexable commerce/search routes.
- Broad Vercel fallback that caused arbitrary unknown paths to return the SPA with HTTP 200.
- Missing blog content/linking and route-specific static metadata coverage.
- Structured data on relevant pages, aligned with visible content and without fabricated claims.

### Still requires owner access or live verification

- In Search Console/Bing Webmaster Tools, submit the sitemap and inspect indexing, duplicate canonicals, and excluded URLs after deployment.
- Verify post-deploy Vercel redirects and status codes: homepage/services/localities/blog should return 200; an unknown path should return 404; each alias should redirect permanently.
- Confirm business address, service area, phone, email, and every locality served with the business owner. Update structured data consistently if any fact is not current.
- Test live forms, WhatsApp links, menu, product paths, and images on mobile and desktop after deployment; client-side build alone cannot verify third-party services or form delivery.
- Measure mobile Core Web Vitals using field data and PageSpeed Insights. Review the large legacy image library; selectively compress/convert safe assets and add explicit dimensions/accurate alt text without changing customer-visible imagery.
- Check actual rankings, query impressions, conversions, and search demand before changing keyword priorities. No keyword volumes or ranking guarantees are asserted here.
- Research existing citations/backlinks, fill the tracker only with verified URLs, and follow platform rules.
- Review the remaining collection pages for unique, useful copy. Their large catalog and shared rendering make a full human content-quality review necessary before claiming every catalogue page is unique.

## Estimated website health (code audit, not analytics)

| Category | Score |
|---|---:|
| Technical SEO | 76/100 |
| On-page SEO | 70/100 |
| Content | 65/100 |
| Local SEO | 72/100 |
| Performance | 62/100 |
| Internal Linking | 72/100 |
| Schema | 82/100 |
| Overall SEO Health (unweighted mean) | 71/100 |

### Priorities

- **CRITICAL:** None confirmed in the local code/build after the static route-shell change; verify production status codes after deploy.
- **HIGH:** Live route/redirect/404 verification; business NAP/service-area verification; Search Console indexing review.
- **MEDIUM:** Image payload and Core Web Vitals work; full review of all collection/product content; manually verify directory and citation opportunities.
- **LOW:** Publish additional blog pieces only when original, accurate, genuinely useful content is ready.
