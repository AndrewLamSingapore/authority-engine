import { Link, useLocation } from 'react-router-dom';
const projects = [
  ['portal','The Portal','Unexpected connections. Better questions.','Discovery','/portal'],
  ['velyqua','VELYQUA','Intelligence for living water.','Water intelligence','/velyqua'],
  ['game-platform','Living Worlds','Enter a world that remembers.','Interactive worlds','/game-platform'],
  ['sky-tablet','The Sky Tablet','Ancient skies. A new perspective.','Cultural exploration','/sky-tablet'],
];
export default function EcosystemLinks() {
  const { pathname } = useLocation();
  if (pathname === '/contact') return null;
  return <section className="ecosystem-section" aria-labelledby="ecosystem-title">
    <div className="ecosystem-heading"><div><p className="eyebrow">Built by Andrew Lam</p><h2 id="ecosystem-title">There’s more to explore.</h2></div><p>Open a working prototype. Follow the idea. Start a conversation.</p></div>
    <div className="ecosystem-grid">{projects.map(([id,name,description,category,path]) => <Link key={id} to={path} className={`ecosystem-project ecosystem-${id}`} aria-current={pathname === path ? 'page' : undefined}><span>{category}</span><h3>{name}</h3><p>{description}</p><strong>Explore the project <span aria-hidden="true">↗</span></strong></Link>)}</div>
    <div className="ecosystem-conversation"><p><strong>See a connection to your work?</strong> Bring the question worth exploring.</p><Link to={`/contact?source=${projects.find(p => p[4] === pathname)?.[0] || 'authority-engine'}`} className="premium-button">Talk with Andrew <span aria-hidden="true">↗</span></Link></div>
  </section>;
}
