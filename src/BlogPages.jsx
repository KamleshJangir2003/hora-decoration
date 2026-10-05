import { Link, useParams } from 'react-router-dom';
import { blogArticles } from './blog-content';

const DOMAIN = 'https://www.horaballoondecor.com';

function ArticleParagraph({ text }) {
  const links = [...text.matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)];
  if (!links.length) return <p>{text}</p>;

  const content = [];
  let cursor = 0;
  links.forEach((match, index) => {
    content.push(text.slice(cursor, match.index));
    content.push(<Link key={`${match[1]}-${index}`} to={match[1]}>{match[2]}</Link>);
    cursor = match.index + match[0].length;
  });
  content.push(text.slice(cursor));
  return <p>{content}</p>;
}

function BlogIndex({ PageSEO }) {
  const canonical = `${DOMAIN}/blog`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', '@id': `${canonical}#webpage`, name: 'Celebration decoration guides | Hora Balloon Decor', url: canonical },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: canonical }
        ]
      }
    ]
  };

  return <main className="pg">
    <PageSEO title="Jaipur Decoration Planning Guides | Hora Balloon Decor" description="Practical guides for planning birthday, balloon and room decoration in Jaipur, including setup choices, booking details and questions to ask." canonical={canonical} schema={schema} />
    <nav aria-label="Breadcrumb" className="crumb"><Link to="/">Home</Link> / Blog</nav>
    <div className="pgHero" style={{ background: 'linear-gradient(135deg,#fff8f3,#f5efff)' }}>
      <div className="pgHeroText"><span className="sectionKicker">DECORATION PLANNING</span><h1>Guides for planning a celebration in Jaipur</h1><p>Ideas and practical checklists for choosing a decoration, preparing your space and asking about availability.</p><div className="pgBtnRow"><Link className="btn" to="/city/jaipur">Explore Jaipur services</Link><Link className="btnOutline" to="/contact">Ask about an event</Link></div></div>
      <img src={new URL('./image/birthday/Birthday Balloon Decoration/Luxury Birthday Decoration Inspiration.jpg', import.meta.url).href} alt="Birthday balloon setup inspiration for Jaipur celebrations" width="560" height="380" loading="lazy" decoding="async" />
    </div>
    <section className="pgBody"><div className="pgSectionTitle"><span className="sectionKicker">ARTICLES</span><h2>Plan the details before booking</h2><p>These guides focus on useful decisions rather than promises about availability or fixed prices. Confirm design inclusions and the booking directly with the team.</p></div><div className="pgCards">{blogArticles.map(article => <article className="pgCard" key={article.slug}><h2>{article.title}</h2><p>{article.description}</p><Link to={`/blog/${article.slug}`}>Read the guide →</Link></article>)}</div><div className="pgCta"><h2>Ready to discuss your event?</h2><p>Send Hora Balloon Decor the date, Jaipur venue and the setup you have in mind.</p><div className="pgBtnRow"><Link className="btn" to="/contact">Contact the team</Link><a className="btnOutline" href="https://wa.me/917023972708">Chat on WhatsApp</a></div></div></section>
  </main>;
}

function BlogPostPage({ PageSEO, NotFoundPage, slug }) {
  const article = blogArticles.find(item => item.slug === slug);
  if (!article) return <NotFoundPage />;

  const canonical = `${DOMAIN}/blog/${article.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonical}#article`,
        headline: article.title,
        description: article.description,
        url: canonical,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        author: { '@type': 'Organization', name: 'Hora Balloon Decor', url: `${DOMAIN}/` },
        publisher: { '@id': `${DOMAIN}/#business` },
        inLanguage: 'en-IN'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${DOMAIN}/blog` },
          { '@type': 'ListItem', position: 3, name: article.title, item: canonical }
        ]
      }
    ]
  };

  return <main className="pg">
    <PageSEO title={`${article.title} | Hora Balloon Decor`} description={article.description} canonical={canonical} ogType="article" schema={schema} />
    <nav aria-label="Breadcrumb" className="crumb"><Link to="/">Home</Link> / <Link to="/blog">Blog</Link> / {article.title}</nav>
    <article className="pgBody">
      <header className="pgSectionTitle"><span className="sectionKicker">JAIPUR CELEBRATION GUIDE</span><h1>{article.title}</h1><p>{article.description}</p></header>
      {article.sections.map(section => <section className="pgSectionTitle" key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((text, index) => <ArticleParagraph key={index} text={text} />)}</section>)}
      <section className="pgSectionTitle"><h2>Related services and next steps</h2><p>Hora Balloon Decor serves Jaipur. Availability depends on your date, exact venue and setup requirements; contact the team to discuss these before booking.</p><ul>{article.related.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}</ul><div className="pgBtnRow"><Link className="btn" to="/contact">Enquire about a decoration</Link><a className="btnOutline" href="https://wa.me/917023972708">Chat on WhatsApp</a></div></section>
    </article>
  </main>;
}

export default function BlogPages({ PageSEO, NotFoundPage }) {
  const { slug } = useParams();
  return slug
    ? <BlogPostPage PageSEO={PageSEO} NotFoundPage={NotFoundPage} slug={slug} />
    : <BlogIndex PageSEO={PageSEO} />;
}
