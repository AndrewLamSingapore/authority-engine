import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { about, buildItems, evidenceItems, evidencePage, home, homeEvidence, talk, yardContainers } from '../src/v2/data/content.js';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const css = read('src/v2/v2.css');
const app = read('src/App.jsx');
const evidencePageSource = read('src/v2/pages/EvidenceV2.jsx');
const yardSource = read('src/v2/components/ContainerYard.jsx');
const shellSource = read('src/v2/components/V2Shell.jsx');
const talkSource = read('src/v2/components/TalkSection.jsx');
const indexHtml = read('index.html');

test('V2 home copy matches the supplied brief word for word', () => {
  assert.equal(home.h1, "I've run the operation. Now I build the analytics that see trouble sooner.");
  assert.equal(
    home.lede,
    'Andrew Lam. Twenty-plus years across logistics, warehousing, distribution and container operations, now paired with analytics and applied AI.',
  );
  assert.equal(home.meta, 'Singapore. Open to operations excellence and operational-analytics roles.');
  assert.equal(home.primaryAction, 'Start a conversation');
  assert.equal(home.secondaryAction, 'Inspect the evidence');
});

test('the home evidence band states the recorded figures and its own limit', () => {
  assert.equal(homeEvidence.h2, 'Claims are easy. Evidence compounds.');
  assert.deepEqual(homeEvidence.figures, [
    '391 anonymised container jobs',
    '7 reporting periods',
    'S$75,720 recorded revenue',
  ]);
  assert.equal(
    homeEvidence.sentence,
    'Dataset figures are factual. No profit, savings or production-impact claim is made from them.',
  );
  assert.equal(homeEvidence.link, "See what it supports and what it doesn't");
});

test('the three builds keep their supplied statuses, unchanged', () => {
  const statuses = Object.fromEntries(buildItems.map((item) => [item.name, item.status]));
  assert.deepEqual(statuses, {
    'The Portal': 'Live prototype',
    'JARVIS PRIME': 'In development',
    VELYQUA: 'Early hardware bring-up',
  });
  assert.equal(buildItems[0].href, 'https://the-portal-ten.vercel.app');
  assert.equal(buildItems[1].href, '/jarvis');
  assert.equal(buildItems[2].href, 'https://github.com/AndrewLamSingapore/velyqua');
});

test('about copy matches the supplied brief and only links LinkedIn when configured', () => {
  assert.equal(about.h1, 'Experience on the floor. Intelligence above it.');
  assert.ok(about.lede.startsWith("I'm Lam Teck Sing Andrew."));
  assert.deepEqual(about.pillars.map((pillar) => pillar.word), ['Think', 'Prove', 'Build']);
  const linkedin = about.pillars.find((pillar) => pillar.linkLabel === 'Read on LinkedIn');
  assert.ok(linkedin, 'the Think row offers the LinkedIn link when configured');
  assert.match(linkedin.href, /^https:\/\/www\.linkedin\.com\/in\//);
  assert.equal(about.pillars.find((pillar) => pillar.linkLabel === 'This site').href, '/evidence');
  assert.equal(about.bandH2, 'Where the twenty years come from.');
  assert.equal(about.openH2, "What I'm open to");
  assert.deepEqual(about.openList, [
    'Operations excellence',
    'Operational analytics',
    'Analytics-enabled supply chain',
    'Consulting',
  ]);
});

test('evidence page grades, filters and claim rules match the brief', () => {
  assert.equal(evidencePage.h1, "What each piece of evidence supports, and what it doesn't.");
  assert.deepEqual(evidencePage.filters.map((filter) => filter.label), [
    'All',
    'Real operating evidence',
    'Synthetic prototypes',
    'Concepts',
  ]);
  assert.equal(evidencePage.rulesHeading, 'The rules I hold my own claims to.');
  assert.deepEqual(evidencePage.rules, [
    'Synthetic data is not presented as operational history.',
    'Anonymised operational evidence stays anonymised.',
    'A prototype is not described as validated science.',
    'A concept is not described as a shipped capability.',
    'Technology is not treated as evidence by itself.',
  ]);
  assert.deepEqual(evidenceItems.map((item) => item.grade), ['real', 'synth', 'concept']);
  assert.equal(evidenceItems[0].summary, 'Anonymised Maxwell Excel records covering 391 container jobs across seven reporting periods.');
  assert.equal(evidenceItems[0].doesNotClaim, 'Profit, savings or production impact. None of these has been verified, so none is stated.');
  assert.equal(evidenceItems[1].summary, '1,800 AI-assisted synthetic records across six warehouse zones.');
  assert.equal(evidenceItems[1].doesNotClaim, 'Validated science, or operational history. The data is synthetic, and the prototype is a demonstration of method.');
  assert.equal(evidenceItems[2].summary, 'An AI-assisted synthetic concept.');
  assert.equal(evidenceItems[2].doesNotClaim, 'A shipped capability. It is a design, and it is described as one.');
});

test('the talk band keeps the three supplied options and the truncated sentence stays flagged', () => {
  assert.equal(talk.h2, 'Start with what brought you here.');
  assert.deepEqual(talk.tabs.map((tab) => tab.label), [
    "I'm hiring",
    'I have an operations problem',
    "I'm building something",
  ]);
  assert.equal(talk.tabs[0].title, 'Start with the container records.');
  assert.ok(
    talk.tabs[0].body.startsWith('For operations excellence and operational-analytics roles, the quickest read is one real operating dataset and two prototypes that are'),
    'the specified sentence start is preserved',
  );
  assert.match(read('src/v2/data/content.js'), /brief was truncated/);
});

test('the container yard keeps the specified geometry and accessible links', () => {
  assert.match(yardSource, /viewBox="0 0 500 322"/);
  const [real, synth, concept] = yardContainers;
  assert.deepEqual(
    [real.x, real.y, real.width, synth.x, synth.y, synth.width, concept.x, concept.y, concept.width],
    [10, 208, 470, 50, 112, 390, 90, 16, 300],
  );
  assert.equal(real.href, '/evidence?grade=real');
  assert.equal(synth.href, '/evidence?grade=synth');
  assert.equal(concept.href, '/evidence?grade=concept');
  for (const container of yardContainers) {
    assert.ok(container.ariaLabel.length > 20, `${container.id} carries an accessible link label`);
  }
  assert.match(yardSource, /aria-label=\{ariaLabel\}/);
  assert.equal(yardContainers[2].tone, 'concept');
  assert.match(css, /\.v2-yard-link-1 \{ animation-delay: 0ms; \}/);
  assert.match(css, /\.v2-yard-link-2 \{ animation-delay: 160ms; \}/);
  assert.match(css, /\.v2-yard-link-3 \{ animation-delay: 320ms; \}/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('V2 design tokens match the supplied light, dark and bookend palettes', () => {
  const values = [
    '--bg: #EDF0EE',
    '--surface: #F7F9F8',
    '--ink: #10202B',
    '--ink2: #43565F',
    '--line: #C6D0D3',
    '--real: #2C5877',
    '--on-real: #FFFFFF',
    '--synth: #9DB8C9',
    '--on-synth: #10202B',
    '--concept: #43565F',
    '--accent: #C2432B',
    '--on-accent: #FFFFFF',
    '--band: #10202B',
    '--on-band: #EDF0EE',
    '--band-line: #3A4F5C',
    '--band-muted: #AFC0C8',
    '--bg: #0D1820',
    '--surface: #13222C',
    '--ink: #E7EEF1',
    '--ink2: #A7B7BF',
    '--line: #263A46',
    '--real: #4A86AD',
    '--on-real: #06131A',
    '--synth: #2A4557',
    '--on-synth: #E7EEF1',
    '--concept: #A7B7BF',
    '--accent: #E0684E',
    '--on-accent: #0D1820',
    '--band: #13222C',
    '--on-band: #E7EEF1',
    '--band-line: #3A5261',
    '--band-muted: #9DB0B9',
    '--bk-bg: #0B1A25',
    '--bk-real: #4A86AD',
    '--bk-synth: #9DB8C9',
  ];
  for (const value of values) assert.ok(css.includes(value), `v2.css defines ${value}`);
});

test('the V2 layer stays flat, graded and scope-isolated', () => {
  assert.match(css, /html\[data-shell='v2'\]/);
  assert.ok(!/linear-gradient|radial-gradient/.test(css), 'no gradients are used in the V2 layer');
  assert.ok(!/box-shadow/.test(css), 'no drop shadows are used in the V2 layer');
  assert.match(css, /background: #0B1A25;/);
  assert.equal((indexHtml.match(/name="theme-color" content="#0B1A25"/g) || []).length, 1);
});

test('evidence filters are URL-driven, accessible and never scroll the page to the top', () => {
  assert.match(evidencePageSource, /useSearchParams/);
  assert.match(evidencePageSource, /aria-pressed=/);
  assert.match(evidencePageSource, /<details/);
  assert.match(evidencePageSource, /<summary>/);
  assert.match(evidencePageSource, /preventScrollReset: true/);
  assert.ok(!/scrollTo\(/.test(evidencePageSource), 'changing a filter must not jump to the top');
});

test('the talk band is a real tablist with keyboard arrow navigation', () => {
  assert.match(talkSource, /role="tablist"/);
  assert.match(talkSource, /role="tab"/);
  assert.match(talkSource, /role="tabpanel"/);
  assert.match(talkSource, /ArrowRight/);
  assert.match(talkSource, /ArrowLeft/);
  assert.match(talkSource, /aria-selected=/);
  assert.match(talkSource, /aria-live="polite"/);
});

test('the shared header stays accessible and mobile-safe', () => {
  assert.match(shellSource, /aria-current=/);
  assert.match(shellSource, /aria-label=\{`Switch to \$\{nextTheme\} theme`\}/);
  assert.match(shellSource, /className="v2-btn v2-btn-accent"/);
  assert.match(css, /top: env\(safe-area-inset-top\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /overflow-x: hidden|flex-wrap: wrap/);
});

test('every existing public route still resolves in the redesigned app', () => {
  for (const path of [
    'insights',
    'insights/:slug',
    'contact',
    'maxwell-excel',
    'demo',
    'portal',
    'velyqua',
    'game-platform',
    'sky-tablet',
    'jarvis',
    'jarvis/agents',
    'locked-demo',
  ]) {
    assert.ok(app.includes(`path="${path}"`), `${path} remains routed`);
  }
  for (const path of ['about', 'evidence']) {
    assert.ok(app.includes(`path="${path}"`), `${path} is routed in the V2 shell`);
  }
  assert.match(app, /<Route\s+index/);
});
