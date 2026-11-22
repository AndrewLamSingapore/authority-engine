import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContainerYard from '../components/ContainerYard';
import TalkSection from '../components/TalkSection';
import ProfessionalDirection from '../components/ProfessionalDirection';
import VelyquaFeature from '../components/VelyquaFeature';
import { buildItems, home, homeEvidence } from '../data/content';
import { scrollToTalk } from '../scroll-to-talk';
import { frameworks } from '../data/frameworks';

export default function HomeV2() {
  const navigate = useNavigate();

  return (
    <>
      <section className="v2-hero" aria-labelledby="home-title">
        <div className="v2-wrap v2-hero-inner">
          <div>
            <p className="v2-kicker v2-hero-kicker">{home.kicker}</p>
            <h1 id="home-title">{home.h1}</h1>
            <p className="v2-lede">{home.lede}</p>
            <div className="v2-hero-actions">
              <Link to="/evidence?grade=real" className="v2-btn v2-btn-accent">
                {home.primaryAction}

              </Link>
              <Link className="v2-btn v2-btn-ghost" to="/velyqua">
                {home.secondaryAction}
              </Link>
            </div>
            <p className="v2-hero-meta">{home.meta}</p>
            <p className="v2-note v2-hero-credentials">
              {home.credential} · <Link className="v2-link" to="/about#credentials">View credentials</Link>
            </p>
            <button className="v2-hero-conversation" type="button" onClick={() => scrollToTalk(navigate)}>Discuss an opportunity </button>
          </div>
          <div className="v2-evidence-display">
            <div className="v2-display-heading"><span>Operations · Analytics · Applied AI</span></div>
            <ContainerYard />
          </div>
        </div>
      </section>

      <section className="v2-band v2-section" aria-labelledby="home-evidence-title">
        <div className="v2-wrap v2-band-grid">
          <div>
            <h2 id="home-evidence-title">{homeEvidence.h2}</h2>
            <p className="v2-lede">{homeEvidence.lede}</p>
          </div>
          <div>
            <ul className="v2-figures">
              {homeEvidence.figures.map((figure) => (
                <li key={figure}>{figure}</li>
              ))}
            </ul>
            <p className="v2-note" style={{ marginTop: '20px' }}>
              {homeEvidence.sentence}
            </p>
            <p style={{ marginTop: '18px' }}>
              <Link className="v2-link" to="/evidence?grade=real">
                {homeEvidence.link}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <VelyquaFeature />

      <ProfessionalDirection id="home-direction-title" />

      <section className="v2-section v2-tint" aria-labelledby="home-framework-title">
        <div className="v2-wrap">
          <p className="v2-kicker">How I approach a problem</p>
          <h2 id="home-framework-title">The insight starts with a better question.</h2>
          <p className="v2-lede" style={{ marginTop: '20px' }}>Find the constraint. Challenge the assumption. Test the smallest useful change.</p>
          <div className="v2-framework-preview">
            {frameworks.slice(0, 3).map((item) => (
              <Link className="v2-framework-teaser" to={`/frameworks?model=${item.id}`} key={item.id}>
                <span className="v2-kicker">{item.model}</span>
                <h3>{item.name}</h3>
                <p>{item.insight}</p>
                <span className="v2-link">Try this framework </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section" id="builds" aria-labelledby="home-building-title">
        <div className="v2-wrap">
          <h2 id="home-building-title">Find your next question.</h2>
          <p className="v2-lede" style={{ marginTop: '16px' }}>
            Follow the question that interests you. Each project has a clear purpose and an honest evidence boundary.
          </p>
          <div className="v2-project-grid">
            {buildItems.map((item) => (
              <article className={`v2-project-card v2-project-${item.id}`} key={item.id}>
                <div className="v2-project-heading"><p className="v2-kicker">{item.category}</p></div>
                <h3><Link to={item.path}>{item.name} </Link></h3>
                <p className="v2-prose">{item.description}</p>
                <div className="v2-project-meta">
                  <p className="v2-row-status">
                    {item.status}
                  </p>
                  <p className="v2-note v2-build-boundary">{item.boundary}</p>
                </div>
                <div className="v2-project-links">
                  <p>
                    {item.external ? (
                      <a className="v2-link" href={item.href} target="_blank" rel="noreferrer">
                        {item.linkLabel}
                      </a>
                    ) : (
                      <Link className="v2-link" to={item.href}>
                        {item.linkLabel}
                      </Link>
                    )}
                  </p>
                  {item.external && <p><Link className="v2-link" to={item.path}>Project details</Link></p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TalkSection />
    </>
  );
}
