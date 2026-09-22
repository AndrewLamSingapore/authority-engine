import React from 'react';
import { Link } from 'react-router-dom';
import TalkSection from '../components/TalkSection';
import { about } from '../data/content';

export default function AboutV2() {
  return (
    <>
      <section className="v2-section" aria-labelledby="about-title">
        <div className="v2-wrap">
          <h1 id="about-title">{about.h1}</h1>
          <p className="v2-lede" style={{ marginTop: '24px', maxWidth: '62ch' }}>
            {about.lede}
          </p>
        </div>
      </section>

      <section className="v2-section-tight" aria-labelledby="about-pillars-title">
        <div className="v2-wrap">
          <h2 id="about-pillars-title" className="v2-label">
            Think, prove, build
          </h2>
          <dl className="v2-defs" style={{ marginTop: '24px' }}>
            {about.pillars.map((pillar) => (
              <div key={pillar.word}>
                <dt>{pillar.word}</dt>
                <dd>
                  <p className="v2-prose">{pillar.text}</p>
                  {pillar.external ? (
                    <a className="v2-link" href={pillar.href} target="_blank" rel="noreferrer">
                      {pillar.linkLabel}
                    </a>
                  ) : (
                    <Link className="v2-link" to={pillar.href}>
                      {pillar.linkLabel}
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="v2-band v2-section" aria-labelledby="about-band-title">
        <div className="v2-wrap v2-band-grid">
          <div>
            <h2 id="about-band-title">{about.bandH2}</h2>
            <p className="v2-lede">{about.bandLede}</p>
          </div>
          <div>
            {about.bandText.map((paragraph) => (
              <p className="v2-prose" key={paragraph} style={{ marginBottom: '18px' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section" aria-labelledby="about-open-title">
        <div className="v2-wrap">
          <h2 id="about-open-title">{about.openH2}</h2>
          <p className="v2-lede" style={{ marginTop: '16px' }}>
            {about.openLede}
          </p>
          <ul className="v2-figures v2-figures-light" style={{ marginTop: '28px', maxWidth: '46ch' }}>
            {about.openList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <TalkSection />
    </>
  );
}
