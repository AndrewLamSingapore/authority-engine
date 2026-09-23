import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { buildDecisionBrief, frameworks, resolveFramework } from '../data/frameworks';

export default function FrameworksV2() {
  const [params, setParams] = useSearchParams();
  const active = resolveFramework(params.get('model'));
  const [drafts, setDrafts] = useState({});
  const [copied, setCopied] = useState('');
  const answers = drafts[active.id] || ['', '', ''];
  const brief = buildDecisionBrief(active, answers);

  function selectModel(id) {
    setParams({ model: id }, { preventScrollReset: true });
    setCopied('');
  }

  function updateAnswer(index, value) {
    setDrafts((previous) => ({
      ...previous,
      [active.id]: (previous[active.id] || ['', '', '']).map((answer, i) => i === index ? value : answer),
    }));
    setCopied('');
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied('Decision brief copied.');
    } catch {
      setCopied('Copy is unavailable here. Open the brief below to select and copy the text.');
    }
  }

  return (
    <>
      <section className="v2-section v2-framework-intro">
        <div className="v2-wrap">
          <p className="v2-kicker">A practical thinking toolkit</p>
          <h1>Better questions.<br />Better next moves.</h1>
          <p className="v2-lede">Choose a situation. Challenge the obvious answer. Leave with a small experiment worth trying.</p>
          <p className="v2-note">Practical frameworks, with hypothetical examples. They guide inquiry; they do not establish results.</p>
        </div>
      </section>
      <section className="v2-section-tight v2-hairline" aria-label="Decision workshop">
        <div className="v2-wrap v2-workshop">
          <div className="v2-model-picker">
            <h2>What are you facing?</h2>
            <div className="v2-model-options" role="group" aria-label="Choose a decision framework">
              {frameworks.map((item, index) => (
                <button key={item.id} type="button" aria-pressed={active.id === item.id} onClick={() => selectModel(item.id)}>
                  <span className="v2-model-number" aria-hidden="true">0{index + 1}</span>
                  <span>{item.situation}</span>
                </button>
              ))}
            </div>
            <p className="v2-note">Your answers stay in this page until you choose to continue to the contact form. Refreshing clears them.</p>
          </div>
          <article className="v2-model-detail" aria-labelledby="model-title">
            <div aria-live="polite" aria-atomic="true">
              <p className="v2-kicker">{active.model}</p>
              <h2 id="model-title">{active.name}</h2>
              <p className="v2-lede">{active.principle}</p>
            </div>
            <blockquote className="v2-insight">{active.insight}</blockquote>
            <fieldset className="v2-question-set">
              <legend>Apply it to your situation</legend>
              {active.questions.map((question, index) => (
                <div key={`${active.id}-${index}`}>
                  <label className="v2-label" htmlFor={`answer-${index}`}>{question}</label>
                  <textarea id={`answer-${index}`} rows={2} maxLength={800} value={answers[index]} onChange={(event) => updateAnswer(index, event.target.value)} placeholder="A few words is enough…" />
                </div>
              ))}
            </fieldset>
            <div className="v2-experiment"><h3>A small first experiment</h3><p>{active.experiment}</p></div>
            <details className="v2-worked-example"><summary>A worked example and its limits</summary><p>{active.example}</p><p className="v2-note">{active.limit}</p><Link className="v2-link" to={active.related}>{active.relatedLabel}</Link></details>
            <div className="v2-panel-actions">
              <Link className="v2-btn v2-btn-accent" to="/contact?source=authority-engine&intent=collaboration" state={{ inquiryType: 'Supply Chain or Analytics Collaboration', message: `I'd like to work through this decision with you.\n\n${brief}` }}>Discuss this decision</Link>
              <button className="v2-btn v2-btn-ghost" type="button" onClick={copyBrief}>Copy decision brief</button>
            </div>
            <p className="v2-note" role="status">{copied}</p>
            <details className="v2-worked-example"><summary>Read your decision brief</summary><pre className="v2-brief">{brief}</pre></details>
          </article>
        </div>
      </section>
    </>
  );
}
