import { projects } from '../../data/projects.js';

/**
 * Authority Engine V2 content.
 *
 * Copy lives here so the pages, the container yard and the footer all describe
 * the same evidence in the same words, and so the design-contract test can
 * assert the exact wording.
 */

export const profile = {
  name: 'Andrew Lam',
  legalName: 'Lam Teck Sing Andrew',
  linkedin: 'https://www.linkedin.com/in/lam-teck-sing-andrew-79886719',
  github: 'https://github.com/AndrewLamSingapore',
};

export const home = {
  h1: "I've run the operation. Now I build the analytics that see trouble sooner.",
  lede: 'Andrew Lam. Twenty-plus years across logistics, warehousing, distribution and container operations, now paired with analytics and applied AI.',
  meta: 'Singapore. Open to operations excellence and operational-analytics roles.',
  primaryAction: 'Start a conversation',
  secondaryAction: 'Inspect the evidence',
};

export const homeEvidence = {
  h2: 'Claims are easy. Evidence compounds.',
  lede: 'One real operating dataset sits at the base of this portfolio: anonymised records from container operations. Everything built on top of it is labelled by what it actually is.',
  figures: [
    '391 anonymised container jobs',
    '7 reporting periods',
    'S$75,720 recorded revenue',
  ],
  sentence:
    'Dataset figures are factual. No profit, savings or production-impact claim is made from them.',
  link: "See what it supports and what it doesn't",
};

export const buildItems = projects;

export const about = {
  h1: 'Experience on the floor. Intelligence above it.',
  lede: "I'm Lam Teck Sing Andrew. My foundation is not theory: it is more than two decades of operational work. Today I combine that experience with analytics, data and AI to build better ways of seeing risk, understanding systems and acting earlier.",
  pillars: [
    {
      word: 'Think',
      text: 'Ideas and operating perspective, shared as I go.',
      linkLabel: 'Read on LinkedIn',
      href: profile.linkedin,
      external: true,
    },
    {
      word: 'Prove',
      text: 'Evidence, case studies and analytical demonstrations, graded by how real they are.',
      linkLabel: 'This site',
      href: '/evidence',
      external: false,
    },
    {
      word: 'Build',
      text: 'Code, products and experiments, each labelled at its true stage.',
      linkLabel: 'GitHub',
      href: profile.github,
      external: true,
    },
  ],
  bandH2: 'Where the twenty years come from.',
  bandLede:
    'Logistics, warehousing, distribution, container operations and supply-chain execution.',
  bandText: [
    'That work taught me to ask one question first: where will this go wrong, and how do we see it sooner? Analytics and applied AI are how I now answer it.',
    "I'm completing the BCG RISE Business Data Analytics programme, and I share the projects that come out of it publicly as I build them.",
  ],
  openH2: "What I'm open to",
  openLede: 'Based in Singapore.',
  openList: [
    'Operations excellence',
    'Operational analytics',
    'Analytics-enabled supply chain',
    'Consulting',
  ],
};

export const evidencePage = {
  h1: "What each piece of evidence supports, and what it doesn't.",
  lede: 'Projects, operating analyses and experiments connecting frontline experience with analytics, systems thinking and AI. Each one is graded by what it actually is, not blurred together.',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'real', label: 'Real operating evidence' },
    { id: 'synth', label: 'Synthetic prototypes' },
    { id: 'concept', label: 'Concepts' },
  ],
  rulesHeading: 'The rules I hold my own claims to.',
  rules: [
    'Synthetic data is not presented as operational history.',
    'Anonymised operational evidence stays anonymised.',
    'A prototype is not described as validated science.',
    'A concept is not described as a shipped capability.',
    'Technology is not treated as evidence by itself.',
  ],
};

export const evidenceItems = [
  {
    id: 'container-operations',
    grade: 'real',
    gradeLabel: 'Real operating evidence',
    title: 'Container operations',
    summary:
      'Anonymised Maxwell Excel records covering 391 container jobs across seven reporting periods.',
    figures: [
      '391 anonymised jobs',
      '7 reporting periods',
      'S$75,720 recorded revenue',
    ],
    figuresDetailed: [
      { term: '391', detail: 'anonymised jobs' },
      { term: '7', detail: 'reporting periods' },
      { term: 'S$75,720', detail: 'recorded revenue' },
    ],
    shows: 'Management visibility built from real operating records.',
    doesNotClaim:
      'Profit, savings or production impact. None of these has been verified, so none is stated.',
  },
  {
    id: 'cold-chain-risk',
    grade: 'synth',
    gradeLabel: 'Synthetic prototype',
    title: 'Cold-chain risk intelligence',
    summary: '1,800 AI-assisted synthetic records across six warehouse zones.',
    figures: ['1,800 synthetic records', '6 warehouse zones'],
    figuresDetailed: [
      { term: '1,800', detail: 'synthetic records' },
      { term: '6', detail: 'warehouse zones' },
    ],
    shows:
      'Multi-signal early-warning analysis: how several weak signals together can flag risk sooner than any one alone.',
    doesNotClaim:
      'Validated science, or operational history. The data is synthetic, and the prototype is a demonstration of method.',
  },
  {
    id: 'control-tower',
    grade: 'concept',
    gradeLabel: 'Concept',
    title: 'Supply chain control tower',
    summary: 'An AI-assisted synthetic concept.',
    figures: [],
    figuresDetailed: [],
    shows:
      'Cross-functional design of supplier, inventory and operating signals in one view.',
    doesNotClaim:
      'A shipped capability. It is a design, and it is described as one.',
  },
];

/**
 * Talk-section copy.
 *
 * The supplied brief was truncated inside the "I'm hiring" body sentence and
 * stopped before the remaining two panels were specified. The hiring sentence
 * is completed with the most conservative reading of its own start, and the
 * other two panels keep to the same evidence discipline. Recorded as an
 * "Unverified or changed" item on the V2 pull request.
 */
export const talk = {
  h2: 'Start with what brought you here.',
  tabs: [
    {
      id: 'hiring',
      label: "I'm hiring",
      title: 'Start with the container records.',
      body: 'For operations excellence and operational-analytics roles, the quickest read is one real operating dataset and two prototypes that are labelled by what they actually are.',
      linkLabel: 'Inspect the evidence',
      to: '/evidence?grade=real',
      message:
        "I'm hiring for an operations excellence or operational-analytics role, and I'd like to start with the container records.",
    },
    {
      id: 'operations',
      label: 'I have an operations problem',
      title: 'Start with where it goes wrong.',
      body: 'Describe the handover, bottleneck or decision that keeps arriving too late. Operating context first, then the analysis that could see it sooner.',
      linkLabel: 'See what the evidence covers',
      to: '/evidence',
      message:
        'I have an operations problem I would like to work through. The situation is: ',
    },
    {
      id: 'building',
      label: "I'm building something",
      title: 'Start with what you are building.',
      body: 'If you are building a system, a dataset or a prototype, tell me the stage it has actually reached and I will meet it there.',
      linkLabel: 'See how the builds are labelled',
      to: '/evidence?grade=concept',
      message:
        'I am building something and would like to compare notes. What it does today: ',
    },
  ],
};

export const products = [
  ...projects.map(({ name, path }) => ({ name, to: path })),
  { name: 'Maxwell Excel', to: '/maxwell-excel' },
];

export const evidenceHint = 'Solid means real. Tap a container to see what it proves.';

export const yardContainers = [
  {
    id: 'real',
    x: 10,
    y: 208,
    width: 470,
    tone: 'real',
    title: 'Container operations',
    detail: '391 jobs, 7 periods',
    href: '/evidence?grade=real',
    ariaLabel:
      'Container operations. Real operating evidence: 391 anonymised container jobs across 7 reporting periods.',
  },
  {
    id: 'synth',
    x: 50,
    y: 112,
    width: 390,
    tone: 'synth',
    title: 'Cold-chain risk',
    detail: '1,800 synthetic records',
    href: '/evidence?grade=synth',
    ariaLabel:
      'Cold-chain risk. Synthetic prototype: 1,800 AI-assisted synthetic records across six warehouse zones.',
  },
  {
    id: 'concept',
    x: 90,
    y: 16,
    width: 300,
    tone: 'concept',
    title: 'Control tower',
    detail: 'Concept only',
    href: '/evidence?grade=concept',
    ariaLabel:
      'Supply chain control tower. Concept only: an AI-assisted synthetic concept, not a shipped capability.',
  },
];

export const yardLegend = [
  { tone: 'real', text: 'solid = real operating records' },
  { tone: 'synth', text: 'lighter = synthetic prototype' },
  { tone: 'concept', text: 'dashed = concept' },
];
