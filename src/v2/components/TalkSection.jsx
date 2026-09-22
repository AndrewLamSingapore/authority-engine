import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { talk } from '../data/content';

/**
 * Shared closing band.
 *
 * Accessible three-option tablist: roving tabindex, arrow-key navigation,
 * Home/End. Each tab swaps panel title, body, text link, editable textarea and
 * prefilled message.
 */
export default function TalkSection() {
  const [activeId, setActiveId] = useState(talk.tabs[0].id);
  const [copyStatus, setCopyStatus] = useState('');
  const tabRefs = useRef([]);

  const active = talk.tabs.find((tab) => tab.id === activeId) || talk.tabs[0];
  const [message, setMessage] = useState(active.message);

  useEffect(() => {
    setMessage(active.message);
    setCopyStatus('');
  }, [active]);

  const selectTab = (index) => {
    const next = (index + talk.tabs.length) % talk.tabs.length;
    setActiveId(talk.tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event) => {
    const currentIndex = talk.tabs.findIndex((tab) => tab.id === activeId);
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectTab(currentIndex + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectTab(currentIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectTab(talk.tabs.length - 1);
    }
  };

  const copyMessage = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
        setCopyStatus('Message copied.');
        return;
      }
      throw new Error('clipboard unavailable');
    } catch {
      setCopyStatus('Copy the text above to send it.');
    }
  };

  return (
    <section className="v2-talk v2-section" id="talk" aria-labelledby="talk-title">
      <div className="v2-wrap">
        <h2 id="talk-title">{talk.h2}</h2>
        <div className="v2-tablist" role="tablist" aria-label="What brought you here" onKeyDown={onKeyDown}>
          {talk.tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`talk-tab-${tab.id}`}
              className="v2-tab"
              aria-selected={tab.id === activeId}
              aria-controls="talk-panel"
              tabIndex={tab.id === activeId ? 0 : -1}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className="v2-panel"
          id="talk-panel"
          role="tabpanel"
          aria-labelledby={`talk-tab-${active.id}`}
          tabIndex={0}
        >
          <h3>{active.title}</h3>
          <p>{active.body}</p>
          <Link className="v2-link" to={active.to}>
            {active.linkLabel}
          </Link>
          <label className="v2-label" htmlFor="talk-message">
            Your message (editable)
          </label>
          <textarea
            id="talk-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
          />
          <div className="v2-panel-actions">
            <Link
              className="v2-btn v2-btn-solid-onband"
              to="/contact"
              state={{ inquiryType: inquiryFor(active.id), message }}
            >
              Open in the contact form
            </Link>
            <button type="button" className="v2-btn v2-btn-onband" onClick={copyMessage}>
              Copy message
            </button>
            <span className="v2-copy-status" role="status" aria-live="polite">
              {copyStatus}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function inquiryFor(id) {
  if (id === 'hiring') return 'Operations Excellence Opportunity';
  if (id === 'operations') return 'Supply Chain or Analytics Collaboration';
  return 'JARVIS / Governed AI Conversation';
}
