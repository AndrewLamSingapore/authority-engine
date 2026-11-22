import React from 'react';
import { Link } from 'react-router-dom';
import { professionalDirection } from '../data/content';

export default function ProfessionalDirection({ id = 'professional-direction' }) {
  return (
    <section className="v2-section v2-tint v2-direction" aria-labelledby={id}>
      <div className="v2-wrap">
        <h2 id={id}>{professionalDirection.h2}</h2>
        <p className="v2-lede" style={{ marginTop: '20px' }}>
          {professionalDirection.lede}
        </p>
        <dl className="v2-defs" style={{ marginTop: '32px' }}>
          {professionalDirection.tracks.map((track) => (
            <div key={track.name}>
              <dt>{track.name}</dt>
              <dd>
                <p className="v2-prose">{track.description}</p>
                {track.links.map((link) => (
                  <Link className="v2-link" key={link.to} to={link.to}>{link.label} →</Link>
                ))}
              </dd>
            </div>
          ))}
        </dl>
        <p className="v2-note" style={{ marginTop: '28px' }}>
          {professionalDirection.foundation}
        </p>
      </div>
    </section>
  );
}
