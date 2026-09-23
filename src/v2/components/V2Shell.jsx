import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { applyShell, applyTheme, preferredTheme } from '../theme';
import { scrollToTalk } from '../scroll-to-talk';
import { products, profile } from '../data/content';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Evidence', to: '/evidence' },
  { label: 'Frameworks', to: '/frameworks' },
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

function V2Header({ theme, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isCurrent = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  return (
    <header className="v2-header">
      <div className="v2-wrap v2-header-inner">
        <Link className="v2-brand" to="/">
          <ContainerEndMark />
          <span className="v2-brand-name">Andrew Lam</span>
        </Link>
        <nav className="v2-nav" aria-label="Primary">
          <ul>
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} aria-current={isCurrent(to) ? 'page' : undefined}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="v2-header-actions">
          <ThemeToggle theme={theme} onToggle={onToggle} />
          <button type="button" className="v2-btn v2-btn-accent" onClick={() => scrollToTalk(navigate)}>
            {"Let's talk"}
          </button>
        </div>
      </div>
    </header>
  );
}

function V2Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-wrap">
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
          Every item on this site is labelled for what it actually is: real operating records,
          synthetic prototypes or concepts. Nothing here is presented as a production-impact
          result, and anonymised operating evidence stays anonymised.
        </p>
      </div>
    </footer>
  );
}

export default function V2Shell() {
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
    <div className="v2-root">
      <a className="v2-skip" href="#v2-main">
        Skip to main content
      </a>
      <V2Header theme={theme} onToggle={onToggle} />
      <main id="v2-main" tabIndex={-1}>
        <Suspense fallback={<div className="v2-wrap v2-section" role="status">Loading page…</div>}>
          <Outlet context={{ theme }} />
        </Suspense>
      </main>
      <V2Footer />
    </div>
  );
}
