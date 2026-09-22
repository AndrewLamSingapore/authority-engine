import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContainerYard from '../components/ContainerYard';
import TalkSection from '../components/TalkSection';
import { buildItems, home, homeEvidence } from '../data/content';
import { scrollToTalk } from '../scroll-to-talk';

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

      <section className="v2-section" aria-labelledby="home-building-title">
        <div className="v2-wrap">
          <h2 id="home-building-title">{"What I'm building."}</h2>
          <p className="v2-lede" style={{ marginTop: '16px' }}>
            Each build is labelled at the stage it has actually reached.
          </p>
          <div className="v2-rows">
            {buildItems.map((item) => (
              <article className="v2-row" key={item.id}>
                <h3>{item.name}</h3>
                <p className="v2-prose">{item.description}</p>
                <div>
                  <p className="v2-row-status">
                    <span className={`v2-status-dot v2-status-${item.statusGrade}`} aria-hidden="true" />
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
