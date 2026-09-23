import { Link, useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
export default function EcosystemLinks() {
  const { pathname } = useLocation();
  if (pathname === '/contact') return null;
  return <section className="ecosystem-section" aria-labelledby="ecosystem-title">
    <div className="ecosystem-heading"><div><p className="eyebrow">Built by Andrew Lam</p><h2 id="ecosystem-title">There’s more to explore.</h2></div><p>Open a working prototype. Follow the idea. Start a conversation.</p></div>
    <div className="ecosystem-grid">{projects.filter(project => project.path !== pathname).map(({id,name,description,category,path}) => <Link key={id} to={path} className={`ecosystem-project ecosystem-${id}`}><span>{category}</span><h3>{name}</h3><p>{description}</p><strong>Explore the project <span aria-hidden="true">↗</span></strong></Link>)}</div>
    <div className="ecosystem-conversation"><p><strong>See a connection to your work?</strong> Bring the question worth exploring.</p><Link to={`/contact?source=${projects.find(project => project.path === pathname)?.id || 'authority-engine'}`} className="premium-button">Talk with Andrew <span aria-hidden="true">↗</span></Link></div>
  </section>;
}
