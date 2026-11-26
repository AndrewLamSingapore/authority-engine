import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { applyShell, applyTheme, preferredTheme } from '../theme';
import { products, profile } from '../data/content';
import AuthorityMotion from '../../components/AuthorityMotion';
import SoundControl from '../../components/SoundControl';
import EcosystemLinks from '../../components/EcosystemLinks';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Evidence', to: '/evidence' },
  { label: 'Frameworks', to: '/frameworks' },
  { label: 'Insights', to: '/insights' },
];

function ContainerEndMark() {
  return (
    <svg className="v2-endmark" width="30" height="30" viewBox="0 0 30 30" role="img" aria-label="Container end mark">
      <rect x="2.5" y="5.5" width="25" height="19" rx="3" fill="none" stroke="var(--bk-real)" strokeWidth="2" />
      <path d="M10 7.5v15M15 7.5v15M20 7.5v15" stroke="var(--bk-concept)" strokeWidth="1.5" />
    </svg>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="v2-theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="9" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 1v2.2M9 14.8V17M1 9h2.2M14.8 9H17M3.4 3.4l1.6 1.6M13 13l1.6 1.6M14.6 3.4L13 5M5 13l-1.6 1.6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M14.6 11.4A6 6 0 0 1 6.6 3.4a6.2 6.2 0 1 0 8 8Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </button>
  );
}

function V2Header({ theme, onToggle, legacy }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isCurrent = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="v2-header">
      <div className="v2-wrap v2-header-inner">
        <Link className="v2-brand" to="/" onClick={closeMenu}>
          <ContainerEndMark />
          <span><span className="v2-brand-name">Andrew Lam</span><span className="v2-brand-detail">Operations intelligence + Applied AI</span></span>
        </Link>
        <nav id="site-navigation" className="v2-nav" aria-label="Primary" data-open={menuOpen} onKeyDown={(event) => { if (event.key === 'Escape') closeMenu(); }}>
          <ul>
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} onClick={closeMenu} aria-current={isCurrent(to) ? 'page' : undefined}>
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <details className="v2-project-menu" onKeyDown={(event) => { if (event.key === 'Escape') event.currentTarget.removeAttribute('open'); }}>
                <summary>Projects <span aria-hidden="true">⌄</span></summary>
                <div className="v2-project-menu-panel">
                  {products.map(({ name, to }) => <Link key={to} to={to} onClick={(event) => { event.currentTarget.closest('details').removeAttribute('open'); closeMenu(); }}>{name}</Link>)}
                </div>
              </details>
            </li>
            <li className="v2-mobile-contact"><Link to="/contact" onClick={closeMenu}>Contact Andrew</Link></li>
          </ul>
        </nav>
        <div className="v2-header-actions">
          {legacy ? <SoundControl /> : <ThemeToggle theme={theme} onToggle={onToggle} />}
          <Link to="/contact" className="v2-btn v2-btn-accent" onClick={closeMenu}>
            {"Let's talk"}
          </Link>
          <button type="button" className="v2-menu-toggle" aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((open) => !open)}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d={menuOpen ? 'M5 5l10 10M15 5 5 15' : 'M3 5h14M3 10h14M3 15h14'} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function V2Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="v2-footer">
      <div className="v2-wrap">
        {pathname !== '/contact' && <div className="v2-footer-invitation">
          <div><p className="v2-kicker">Start a useful conversation</p><h2>Discuss a role or a practical problem.</h2></div>
          <Link className="v2-btn v2-btn-accent" to="/contact">Connect with Andrew </Link>
        </div>}
        <div className="v2-footer-grid">
          <div>
            <h4>Andrew Lam</h4>
            <ul>
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/#repositories">All repository profiles</Link></li>
            </ul>
          </div>
          <div>
            <h4>Products and experiments</h4>
            <ul>
              {products.slice(0, 3).map(({ name, to }) => (
                <li key={to}>
                  <Link to={to}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>More</h4>
            <ul>
              {products.slice(3).map(({ name, to }) => (
                <li key={to}>
                  <Link to={to}>{name}</Link>
                </li>
              ))}
              <li>
                <Link to="/insights">Insights and case studies</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="v2-footer-note">
          Operating records, demonstrations and prototypes are labelled at their actual stage. Anonymised evidence stays anonymised.
        </p>
        <p className="v2-copyright">© {new Date().getFullYear()} Andrew Lam. Operations Intelligence and Applied AI.</p>
      </div>
    </footer>
  );
}

export default function V2Shell({ legacy = false }) {
  const [theme, setTheme] = useState(() => preferredTheme());

  useEffect(() => {
    const cleanup = applyShell('v2');
    return cleanup;
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const onToggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div className={legacy ? 'portfolio-root' : 'v2-root'}>
      {legacy && <AuthorityMotion />}
      <a className="v2-skip" href="#v2-main">
        Skip to main content
      </a>
      <V2Header theme={theme} onToggle={onToggle} legacy={legacy} />
      <main id="v2-main" className={legacy ? 'portfolio-experience' : undefined} tabIndex={-1}>
        <Suspense fallback={<div className="v2-wrap v2-section" role="status">Loading page…</div>}>
          <Outlet context={{ theme }} />
        </Suspense>
      </main>
      {legacy && <EcosystemLinks />}
      <V2Footer />
    </div>
  );
}
