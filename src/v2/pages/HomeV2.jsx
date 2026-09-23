import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContainerYard from '../components/ContainerYard';
import TalkSection from '../components/TalkSection';
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
            <h1 id="home-title">{home.h1}</h1>
            <p className="v2-lede">{home.lede}</p>
            <p className="v2-hero-meta">{home.meta}</p>
            <div className="v2-hero-actions">
              <button type="button" className="v2-btn v2-btn-accent" onClick={() => scrollToTalk(navigate)}>
                {home.primaryAction}
              </button>
              <Link className="v2-btn v2-btn-ghost" to="/evidence">
                {home.secondaryAction}
              </Link>
            </div>
            <p className="v2-hero-framework"><Link className="v2-link" to="/frameworks">Have a difficult decision? Try a framework →</Link></p>
          </div>
          <ContainerYard />
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

      <section className="v2-section v2-tint" aria-labelledby="home-framework-title">
        <div className="v2-wrap">
          <p className="v2-kicker">How I approach a problem</p>
          <h2 id="home-framework-title">The insight starts with a better question.</h2>
          <p className="v2-lede" style={{ marginTop: '20px' }}>Find the constraint. Challenge the assumption. Test the smallest useful change.</p>
          <div className="v2-framework-preview">
            {frameworks.slice(0, 3).map((item, index) => (
              <Link className="v2-framework-teaser" to={`/frameworks?model=${item.id}`} key={item.id}>
                <span className="v2-kicker">0{index + 1} / {item.model}</span>
                <h3>{item.name}</h3>
                <p>{item.insight}</p>
                <span className="v2-link">Try this framework <span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section" id="builds" aria-labelledby="home-building-title">
        <div className="v2-wrap">
          <h2 id="home-building-title">{"Five ways to explore the work."}</h2>
          <p className="v2-lede" style={{ marginTop: '16px' }}>
            Follow the question that interests you. Each project has a clear purpose and an honest evidence boundary.
          </p>
          <div className="v2-rows">
            {buildItems.map((item) => (
              <article className="v2-row" key={item.id}>
                <div><p className="v2-kicker">{item.category}</p><h3>{item.name}</h3></div>
                <div><p className="v2-prose">{item.description}</p><p className="v2-note v2-build-boundary">{item.boundary}</p></div>
                <div>
                  <p className="v2-row-status">
                    {item.status}
                  </p>
                  <p style={{ marginTop: '10px' }}>
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
                  {item.external && <p className="v2-build-detail"><Link className="v2-link" to={item.path}>Purpose and evidence</Link></p>}
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
