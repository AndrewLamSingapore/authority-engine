import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import repositoryProfiles from '../../data/repository-profiles.json';

export default function RepositoryDirectory() {
  const { hash } = useLocation();
  const section = useRef(null);
  useEffect(() => {
    if (hash === '#repositories') section.current?.scrollIntoView();
  }, [hash]);

  return (
    <section ref={section} className="v2-section v2-tint" id="repositories" aria-labelledby="repository-directory-title">
      <div className="v2-wrap">
        <p className="v2-kicker">Public source · {repositoryProfiles.length} repositories</p>
        <h2 id="repository-directory-title">Explore the work. Inspect the source.</h2>
        <p className="v2-lede" style={{ marginTop: '20px' }}>
          Six main projects, the VELYQUA product website and the GitHub profile repository. Each repository has a distinct role in the work.
        </p>
        <div className="v2-repository-list">
          {repositoryProfiles.map(({ slug, name, kind, description, repository, site, details }) => (
            <article className="v2-repository-entry" key={slug}>
              <div>
                <p className="v2-kicker">{kind}</p>
                <h3>{name}</h3>
                <p className="v2-note v2-repository-slug">AndrewLamSingapore/{slug}</p>
              </div>
              <div>
                <p className="v2-prose">{description}</p>
                <div className="v2-repository-links">
                  <a className="v2-link" href={site} target="_blank" rel="noreferrer">Open public experience</a>
                  <a className="v2-link" href={repository} target="_blank" rel="noreferrer">Inspect GitHub source</a>
                  <Link className="v2-link" to={details}>Project context</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="v2-note" style={{ marginTop: '24px' }}>
          Reviewed 26 November 2026. Product features, research goals and evidence limits are described in each owning repository.
        </p>
      </div>
    </section>
  );
}
