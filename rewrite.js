const fs = require('fs');
let src = fs.readFileSync('src/main.jsx', 'utf8');

const START = 'function CityLanding({page})';
const END_MARKER = '\nfunction AreaLanding({page})';

const si = src.indexOf(START);
const ei = src.indexOf(END_MARKER);

if (si < 0) { console.error('START not found'); process.exit(1); }
if (ei < 0) { console.error('END not found'); process.exit(1); }

console.log('Found CityLanding at', si, 'to', ei);

const before = src.slice(0, si);
const after = src.slice(ei);

const newFn = `function CityLanding({page}){
const [sort,setSort]=useState('Popularity');
const shown=[...page.items].sort((a,b)=>sort==='Popularity'?b.reviews-a.reviews:sort==='New Arrivals'?b.id-a.id:sort==='Price: Low to High'?a.price-b.price:b.price-a.price);
const ex=page.extra||{};
const isAhmedabad=page.slug==='ahmedabad';
const isGandhinagar=page.slug==='gandhinagar';
const faqSchema=ex.faqs?{'@context':'https://schema.org','@type':'FAQPage',mainEntity:ex.faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}:null;
const breadcrumbSchema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:DOMAIN+'/'},{'@type':'ListItem',position:2,name:'Decoration Services',item:DOMAIN+'/decorations/birthday'},{'@type':'ListItem',position:3,name:page.city+' Decoration Services',item:DOMAIN+'/city/'+page.slug}]};
const bizSchema={'@context':'https://schema.org','@type':'LocalBusiness',name:'Hora Balloon Decor',description:page.description,url:DOMAIN+'/city/'+page.slug,telephone:'+919785516343',email:'eliteballoondecor12@gmail.com',address:{'@type':'PostalAddress',streetAddress:'Judges Bunglow Rd, Bodakdev',addressLocality:'Ahmedabad',addressRegion:'Gujarat',addressCountry:'IN'},areaServed:[page.city,...page.areas.map(([area])=>area)],hasOfferCatalog:{'@type':'OfferCatalog',name:'Decoration Services in '+page.city,itemListElement:[{'@type':'Offer',itemOffered:{'@type':'Service',name:'Birthday Decoration in '+page.city}},{'@type':'Offer',itemOffered:{'@type':'Service',name:'Balloon Decoration in '+page.city}},{'@type':'Offer',itemOffered:{'@type':'Service',name:'Anniversary Decoration in '+page.city}},{'@type':'Offer',itemOffered:{'@type':'Service',name:'Baby Shower Decoration in '+page.city}},{'@type':'Offer',itemOffered:{'@type':'Service',name:'Home Decoration in '+page.city}}]}};
const schema={'@context':'https://schema.org','@graph':[bizSchema,breadcrumbSchema,...(faqSchema?[faqSchema]:[])]};
return <main className="listing">
<PageSEO
  title={page.title+' | Hora Balloon Decor'}
  description={page.description}
  schema={schema}
  canonical={DOMAIN+'/city/'+page.slug}
  ogImage='https://cdn.7eventzz.com/images/11/de3c853c-f969-4706-a549-69e17774e648.webp'
/>
<nav aria-label="Breadcrumb" className="crumb"><Link to="/">Home</Link> / <Link to="/decorations/birthday">Decoration Services</Link> / {page.city}</nav>

{isAhmedabad&&<section className="cityHero"><div><span>TRUSTED DECORATION SERVICE</span><h1>Decoration Services in Ahmedabad</h1><p>Hora Balloon Decor provides professional birthday decoration, balloon decoration, anniversary decoration, baby shower decoration and home decoration services across Ahmedabad. Our verified decorators bring everything to your doorstep \u2014 from Bopal and Satellite to Navrangpura and Maninagar \u2014 and set it all up for you. Packages start at \u20b9999.</p><div className="heroBtns"><Link className="btn" to="/decorations/birthday">Explore Birthday Decoration Packages \u2192</Link><a className="heroBtnWa" href="https://wa.me/919785516343"><WhatsAppIcon/> Book on WhatsApp</a></div></div><img src="https://cdn.7eventzz.com/images/11/de3c853c-f969-4706-a549-69e17774e648.webp" alt="Birthday balloon decoration setup in Ahmedabad home" loading="lazy"/></section>}

{isGandhinagar&&<section className="cityHero"><div><span>TRUSTED DECORATION SERVICE</span><h1>Decoration Services in Gandhinagar</h1><p>Hora Balloon Decor provides professional birthday decoration, balloon decoration, anniversary decoration, baby shower decoration, room decoration and party decoration services across Gandhinagar. Our verified decorators bring everything to your doorstep \u2014 from Kudasan and Sargasan to Raysan, Randesan, GIFT City and Infocity \u2014 and set it all up for you. Decoration packages starting from \u20b9999.</p><div className="heroBtns"><Link className="btn" to="/decorations/birthday">Explore Birthday Decoration Packages \u2192</Link><a className="heroBtnWa" href="https://wa.me/919785516343"><WhatsAppIcon/> Book Birthday Decoration in Gandhinagar</a></div></div><img src="https://cdn.7eventzz.com/images/11/de3c853c-f969-4706-a549-69e17774e648.webp" alt="Birthday balloon decoration setup in Gandhinagar home" loading="lazy"/></section>}

{!isAhmedabad&&!isGandhinagar&&<section className="cityHero"><div><span>FAST, BEAUTIFUL SETUPS</span><h1>Balloon Decoration in {page.city}<br/><i>for Birthdays &amp; Parties</i></h1><p>{page.description}</p><Link className="btn" to="/decorations/birthday">Explore decorations \u2192</Link></div><img src={\`https://picsum.photos/seed/city-hero-\${page.slug}/1200/600\`} alt={\`Balloon decoration in \${page.city} for birthdays and parties\`} loading="lazy"/></section>}

<div className="cityRating"><b>\u2605 4.8</b><span>48,605 ratings \u00b7 Verified decorators \u00b7 Same-day setup</span></div>

<section className="cityCategories">
  <h2>Popular Decoration Services in {page.city}</h2>
  <div className="cityCategoryGrid">{cityCategories.map(([name,image,path])=><Link to={path} className="cityCategoryCard" key={name}><img src={image} alt={\`\${name} in \${page.city}\`} loading="lazy"/><span>{name}</span></Link>)}</div>
  <div className="citySort" role="group" aria-label="Sort city decorations">{['Popularity','New Arrivals','Price: Low to High','Price: High to Low'].map(option=><button className={sort===option?'active':''} onClick={()=>setSort(option)} key={option}>{option}</button>)}</div>
</section>

<div className="grid cityGrid">{shown.map(p=><ProductCard p={p} hideCart key={p.id}/>)}</div>

<section className="cityInfoSection"><div className="cityInfoMain">

{isAhmedabad&&ex.services&&<>
  <h2>{ex.tagline}</h2>
  <p>{ex.about}</p>
  {ex.why&&<div className="cityWhyList">{ex.why.map(w=><span key={w}><Check size={15}/> {w}</span>)}</div>}
  <div className="cityServiceSections">{ex.services.map(s=><div className="cityServiceBlock" key={s.heading}><h2>{s.heading}</h2><p>{s.body}</p><Link to={s.link}>{s.linkText} \u2192</Link></div>)}</div>
</>}

{isGandhinagar&&ex.services&&<>
  <h2>Decoration Services Across Gandhinagar</h2>
  <p>{ex.about}</p>
  {ex.why&&<div className="cityWhyList">{ex.why.map(w=><span key={w}><Check size={15}/> {w}</span>)}</div>}
  <div className="cityServiceSections">
    <div className="cityServiceBlock"><h2>Birthday Decoration in Gandhinagar</h2><p>{ex.services[0].body}</p><Link to={ex.services[0].link}>{ex.services[0].linkText} \u2192</Link></div>
    <div className="cityServiceBlock"><h2>Balloon Decoration in Gandhinagar</h2><p>{ex.services[1].body}</p><Link to={ex.services[1].link}>{ex.services[1].linkText} \u2192</Link></div>
    <div className="cityServiceBlock"><h2>Anniversary Decoration in Gandhinagar</h2><p>{ex.services[2].body}</p><Link to={ex.services[2].link}>{ex.services[2].linkText} \u2192</Link></div>
    <div className="cityServiceBlock"><h2>Baby Shower &amp; Baby Welcome Decoration</h2><p>{ex.services[3].body}</p><Link to={ex.services[3].link}>{ex.services[3].linkText} \u2192</Link></div>
    <div className="cityServiceBlock"><h2>Room, Home &amp; Surprise Decoration</h2><p>{ex.services[4].body}</p><Link to={ex.services[4].link}>{ex.services[4].linkText} \u2192</Link></div>
    <div className="cityServiceBlock"><h2>Party, Wedding &amp; Event Decoration</h2><p>{ex.services[5].body}</p><Link to={ex.services[5].link}>{ex.services[5].linkText} \u2192</Link></div>
  </div>
  <div className="cityServiceBlock"><h2>Why Choose Our Decoration Services in Gandhinagar</h2><p>We are a trusted decoration service covering all Gandhinagar sectors, key localities and corporate zones. Every package includes all materials \u2014 balloons, backdrop, props and professional setup. Our decorators arrive on time, complete the setup and clear everything after your event. Whether you need birthday decoration at home in Kudasan, balloon decoration for a party in Sargasan, anniversary room decoration in Randesan or corporate event decoration at GIFT City \u2014 we handle it all. Packages start from \u20b9999 with transparent pricing and no hidden charges.</p></div>
</>}

{!isAhmedabad&&!isGandhinagar&&<>
  <h2>{ex.tagline||\`Balloon Decoration in \${page.city}\`}</h2>
  <p>{ex.about||page.description}</p>
  {ex.why&&<div className="cityWhyList">{ex.why.map(w=><span key={w}><Check size={15}/> {w}</span>)}</div>}
</>}

<div className="cityServiceLinks"><h3>Popular services in {page.city}</h3><div className="cityServiceGrid"><Link to="/decorations/birthday">\uD83C\uDF82 Birthday Decoration</Link><Link to="/decorations/anniversary">\uD83D\uDC91 Anniversary Decoration</Link><Link to="/baby-shower-decorations">\uD83C\uDF7C Baby Shower Decoration</Link><Link to="/balloon-bouquets">\uD83C\uDF88 Balloon Bouquets</Link><Link to="/proposal-decorations">\uD83D\uDC8D Proposal Decoration</Link><Link to="/car-boot-decorations">\uD83D\uDE97 Car Boot Surprise</Link><Link to="/room-decorations">\uD83C\uDF39 Room Decoration</Link><Link to="/canopy-decorations">\u2728 Canopy Decoration</Link></div></div>

</div><div className="cityInfoSide"><div className="cityAreaBox">

{isAhmedabad&&ex.areaGroups&&<>
  <h2>Areas We Serve in Ahmedabad</h2>
  <p>We provide decoration services across all major localities in Ahmedabad. Here's a quick overview of the areas we cover:</p>
  {ex.areaGroups.map(g=><div className="cityAreaGroup" key={g.region}><h3>{g.region}</h3><p>{g.areas}</p></div>)}
  <p style={{marginTop:'1rem',fontSize:'.9rem'}}>Don't see your area? <a href="https://wa.me/919785516343">WhatsApp us</a> \u2014 we likely serve it too.</p>
</>}

{isGandhinagar&&ex.areaGroups&&<>
  <h2>Areas We Serve in Gandhinagar</h2>
  <p>We provide decoration services across all Gandhinagar sectors and localities. Here's a quick overview:</p>
  {ex.areaGroups.map(g=><div className="cityAreaGroup" key={g.region}><h3>{g.region}</h3><p>{g.areas}</p></div>)}
  <div className="cityAreaList" style={{marginTop:'1rem'}}>
    <Link to="/city/gandhinagar/kudasan">Birthday decoration in Kudasan</Link>
    <Link to="/city/gandhinagar/sargasan">Decoration services in Sargasan</Link>
    <Link to="/city/gandhinagar/raysan">Balloon decoration in Raysan</Link>
    <Link to="/city/gandhinagar/randesan">Decoration services in Randesan</Link>
    <Link to="/city/gandhinagar/infocity">Decoration services in Infocity</Link>
    <Link to="/city/gandhinagar/gift-city">Corporate event decoration in GIFT City</Link>
    <Link to="/city/gandhinagar/koba">Decoration services in Koba</Link>
    <Link to="/city/gandhinagar/vavol">Birthday decoration in Vavol</Link>
    <Link to="/city/gandhinagar/pethapur">Decoration services in Pethapur</Link>
    <Link to="/city/gandhinagar/adalaj">Decoration services in Adalaj</Link>
    <Link to="/city/gandhinagar/bhat">Decoration services in Bhat</Link>
    <Link to="/city/gandhinagar/palaj">Decoration services in Palaj</Link>
  </div>
  <p style={{marginTop:'1rem',fontSize:'.9rem'}}>Don't see your area? <a href="https://wa.me/919785516343">WhatsApp us</a> \u2014 we likely serve it too.</p>
</>}

{!isAhmedabad&&!isGandhinagar&&<>
  <h3>Areas we serve in {page.city}</h3>
  <div className="cityAreaList">{page.areas.map(([area])=><Link key={area} to={\`/city/\${page.slug}/\${slugify(area)}\`}>{area}</Link>)}</div>
</>}

</div></div></section>

<section className="seo localSeo">

{isGandhinagar&&<>
  <h2>Decoration Services Across Gandhinagar</h2>
  <p>Whether you are planning a home birthday party in Kudasan, a balloon decoration for a society event in Sargasan, an anniversary surprise in Randesan, a baby shower in Sector 5 or a corporate event at GIFT City \u2014 Hora Balloon Decor covers all of Gandhinagar. We serve homes, residential societies, hotels, offices and event venues. Decoration packages starting from \u20b9999 with all materials included.</p>
  <div className="localGrid">{page.areas.slice(0,9).map(([area,services])=><div className="localCard" key={area}><h3><Link to={\`/city/\${page.slug}/\${slugify(area)}\`}>{area} Decoration Services</Link></h3><p>{services} in {area}. <Link to={\`/city/\${page.slug}/\${slugify(area)}\`}>View packages</Link></p></div>)}</div>
  <div className="localGrid" style={{marginTop:'1rem'}}>{page.areas.slice(9,18).map(([area,services])=><div className="localCard" key={area}><h3><Link to={\`/city/\${page.slug}/\${slugify(area)}\`}>{area} Decoration Services</Link></h3><p>{services} in {area}. <Link to={\`/city/\${page.slug}/\${slugify(area)}\`}>View packages</Link></p></div>)}</div>
</>}

{isAhmedabad&&<>
  <h2>Decoration services across Ahmedabad</h2>
  <p>{page.description} Choose a birthday, anniversary, baby shower, balloon or party decoration package for homes, societies, offices and venues.</p>
  <div className="localGrid">{page.areas.slice(0,12).map(([area,services])=><div className="localCard" key={area}><h3><Link to={\`/city/\${page.slug}/\${slugify(area)}\`}>{area} decoration services</Link></h3><p>{services} in {area}. <Link to={\`/city/\${page.slug}/\${slugify(area)}\`}>View packages</Link></p></div>)}</div>
</>}

{!isAhmedabad&&!isGandhinagar&&<>
  <h2>Decoration services across {page.city}</h2>
  <p>{page.description} Choose a birthday, anniversary, baby shower, balloon or party decoration package for homes, societies, offices and venues.</p>
  <div className="localGrid">{page.areas.map(([area,services,coverage])=><div className="localCard" key={area}><h3><Link to={\`/city/\${page.slug}/\${slugify(area)}\`}>{area} decoration services</Link></h3><p>{services} in {area}, {page.city}. <Link to={\`/city/\${page.slug}/\${slugify(area)}\`}>View local options</Link></p></div>)}</div>
</>}

<h2>Frequently Asked Questions</h2>
<div className="faq">{(ex.faqs||[['What areas do you serve?',\`We serve \${page.areas.map(([a])=>a).slice(0,5).join(', ')} and more.\`],['What is the starting price?','Packages start from \u20b9999.'],['Can I customize?','Yes, colors, themes and messages can be customized.']]).map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>

</section></main>}
`;

const result = before + newFn + after;
fs.writeFileSync('src/main.jsx', result, 'utf8');
console.log('Done. File size:', result.length);
