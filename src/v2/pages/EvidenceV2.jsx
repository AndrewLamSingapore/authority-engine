import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TalkSection from '../components/TalkSection';
import { evidenceItems, evidencePage } from '../data/content';

const VALID_GRADES = ['real', 'synth', 'concept'];

function normaliseGrade(value) {
  return VALID_GRADES.includes(value) ? value : 'all';
}

function Chevron() {
  return (
    <svg className="v2-chevron" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EvidenceV2() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [grade, setGrade] = useState(() => normaliseGrade(searchParams.get('grade')));

  useEffect(() => {
    setGrade(normaliseGrade(searchParams.get('grade')));
  }, [searchParams]);

  const visible = useMemo(
    () => (grade === 'all' ? evidenceItems : evidenceItems.filter((item) => item.grade === grade)),
    [grade],
  );

  const selectGrade = (next) => {
    setGrade(next);
    // Replace the URL state without letting the router scroll the page.
    setSearchParams(next === 'all' ? {} : { grade: next }, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <section className="v2-section" aria-labelledby="evidence-title">
        <div className="v2-wrap">
          <h1 id="evidence-title">{evidencePage.h1}</h1>
          <p className="v2-lede" style={{ marginTop: '24px', maxWidth: '62ch' }}>
            {evidencePage.lede}
          </p>
          <div className="v2-filters" role="group" aria-label="Filter evidence by grade">
            {evidencePage.filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className="v2-filter"
                aria-pressed={grade === filter.id}
                onClick={() => selectGrade(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p className="v2-note" role="status" aria-live="polite" style={{ marginTop: '16px' }}>
            {visible.length} {visible.length === 1 ? 'entry' : 'entries'} shown.
          </p>
        </div>
      </section>

      <section className="v2-section-tight" aria-label="Evidence entries">
        <div className="v2-wrap">
          <div className="v2-evidence-list">
            {visible.map((item) => (
              <details className="v2-evidence-row" key={item.id}>
                <summary>
                  <span className={`v2-swatch v2-swatch-${item.grade}`} aria-hidden="true" />
                  <span className="v2-evidence-headline">
                    <span className="v2-evidence-grade">{item.gradeLabel}</span>
                    <span className="v2-evidence-title">{item.title}</span>
                    <span className="v2-evidence-line">{item.summary}</span>
                  </span>
                  <Chevron />
                </summary>
                <div className={`v2-evidence-body${item.figuresDetailed.length > 0 ? '' : ' v2-evidence-body-single'}`}>
                  {item.figuresDetailed.length > 0 && (
                    <div>
                      <dl className="v2-figures-quiet">
                        {item.figuresDetailed.map((figure) => (
                          <div key={figure.term}>
                            <dt>{figure.term}</dt>
                            <dd>{figure.detail}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                  <div className="v2-body-grid">
                    <div>
                      <h3>What it shows</h3>
                      <p>{item.shows}</p>
                    </div>
                    <div>
                      <h3>{"What it doesn't claim"}</h3>
                      <p>{item.doesNotClaim}</p>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-tint v2-section" aria-labelledby="evidence-rules-title">
        <div className="v2-wrap">
          <h2 id="evidence-rules-title">{evidencePage.rulesHeading}</h2>
          <ul className="v2-rules">
            {evidencePage.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p className="v2-note" style={{ marginTop: '22px' }}>
            Real operating evidence stays linked to its source record.{' '}
            <Link className="v2-link" to="/maxwell-excel">
              Read the container operations case
            </Link>
            .
          </p>
        </div>
      </section>

      <TalkSection />
    </>
  );
}
