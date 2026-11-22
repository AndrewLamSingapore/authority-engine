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
  kicker: 'Andrew Lam · Singapore',
  h1: 'From operating records to clearer decisions.',
  lede: 'I’m Andrew Lam. I bring 20+ years in supply chain and operations to practical analytics and applied AI. Explore the evidence, try a project, or bring me a problem worth solving.',
  meta: 'Singapore. Open to operations intelligence, AI-enabled operations, analytics and cloud support roles.',
  credential: 'BCG RISE Capstone Top 2 · Python Expert · Machine Learning Expert',
  primaryAction: 'Explore the evidence',
  secondaryAction: 'Explore VELYQUA',
};

export const homeEvidence = {
  h2: 'Start with the operational evidence.',
  lede: 'Start with 391 anonymised container jobs. Follow the records into workload, service mix and workforce-planning questions. Synthetic demonstrations and concepts carry separate labels.',
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

export const professionalDirection = {
  h2: 'Developing a career and a product',
  lede: 'My next phase connects a Singapore career in Industrial AI and Operations Intelligence with VELYQUA product development. Each practical milestone should strengthen both.',
  tracks: [
    {
      name: 'Career in Singapore',
      description: 'Apply operations experience, analytics, cloud engineering and AI to measurable business problems. I am targeting operations intelligence, AI-enabled operations, analytics and cloud support opportunities while building toward Industrial AI and AI solutions roles.',
      links: [
        { label: 'Review my operational evidence', to: '/evidence?grade=real' },
        { label: 'Discuss a career opportunity', to: '/contact?source=authority-engine&intent=role' },
      ],
    },
    {
      name: 'Developing VELYQUA',
      description: 'Build an AI-assisted monitoring and decision-support product, beginning with aquatic environments. Customer discovery, reliable engineering and a measurable pilot will guide progress toward a paid pilot or paying customer. Other industrial applications will need their own demand and technical validation.',
      links: [
        { label: 'Explore VELYQUA and its development goals', to: '/velyqua' },
        { label: 'Discuss a potential pilot', to: '/contact?source=velyqua&intent=collaboration' },
      ],
    },
  ],
  foundation: 'My current tools are Python, SQL, Power BI and Excel, backed by completed applied AI training. I am strengthening Linux, Microsoft Azure, deployment and automation skills, with IoT, data engineering and MLOps as the next areas to develop.',
};

export const about = {
  h1: 'Operations experience. A practical path into AI.',
  lede: "I'm Lam Teck Sing Andrew, based in Singapore. I bring more than 20 years across cold-chain warehousing, grocery distribution, container operations and international freight forwarding. My emerging focus is Industrial AI and Operations Intelligence, combining operational judgement with analytics, cloud training and applied AI projects.",
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
    'At Maxwell Excel Service, I provide occasional oversight as Partner & Director. A designated manager handles daily operations. I support crew deployment planning and review resourcing, pricing, invoicing and cash flow, while remaining available for full-time employment.',
    'At Jurong Cold Store, I coordinated temperature-controlled warehouse and production work around vessel arrivals and investigated inventory discrepancies. Earlier roles covered grocery distribution and international freight forwarding.',
    'I completed Applied AI and Data Analytics under RISE by BCG U in October 2026. My credentials include BCG RISE Capstone Top 2 (Business and Data Analytics), Python Expert and Machine Learning Expert.',
    'I use Power BI, SQL, Python and Excel to investigate performance gaps, explain operational risk and support better decisions. I share my independent projects publicly as I build them.',
    'I am currently studying Cloud Support & DevOps through the SkillsFuture Career Transition Programme delivered by Generation Singapore in partnership with Temasek Polytechnic. The training covers Linux, Python, Microsoft Azure and automation.',
  ],
  openH2: "What I'm open to",
  openLede: 'Based in Singapore and building toward Industrial AI and AI solutions roles, with operations experience as my foundation.',
  openList: [
    'Operations intelligence and AI-enabled operations',
    'Operations and supply-chain analytics',
    'Cloud support and deployment opportunities',
    'VELYQUA customer discovery and potential pilots',
  ],
};

export const credentials = [
  { name: 'Applied AI and Data Analytics', issuer: 'RISE by BCG U', date: 'October 2026', href: 'https://accredify.io/verify?id=462f1532-0ed6-4ceb-9d23-9a04f2893e4f', platform: 'Accredify' },
  { name: 'BCG RISE Capstone Top 2 (Business and Data Analytics)', issuer: 'Boston Consulting Group', date: 'October 2026', href: 'https://www.credly.com/badges/2e0b4f50-24af-4d42-839d-b77b1b0f9231', platform: 'Credly' },
  { name: 'BCG RISE Python Expert', issuer: 'Boston Consulting Group', date: 'October 2026', href: 'https://www.credly.com/badges/434cbaa4-5aee-4066-b7c8-9895a6a5e24d', platform: 'Credly' },
  { name: 'BCG RISE Machine Learning Expert', issuer: 'Boston Consulting Group', date: 'October 2026', href: 'https://www.credly.com/badges/281a8911-39cd-4716-a987-1d0580e0f732', platform: 'Credly' },
  { name: 'WSQ Essential Drone Flying Technologies for Business Operations', issuer: 'NTUC LearningHub', date: 'July 2026', href: 'https://www.ntuclearninghub.com/verify?id=cd1307a0-5409-4188-84a6-ae56c9bfbbe1', platform: 'NTUC LearningHub' },
];

export const evidencePage = {
  h1: 'Operational evidence you can inspect.',
  lede: 'Follow the records, inspect the calculations and explore what each project supports. Real operating evidence, synthetic demonstrations and concepts each carry a clear label.',
  filters: [
    { id: 'all', label: 'All' },
    { id: 'real', label: 'Real operating evidence' },
    { id: 'synth', label: 'Synthetic prototypes' },
    { id: 'concept', label: 'Concepts' },
  ],
  rulesHeading: 'How I classify the work',
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
 * Career enquiries start with inspectable operational evidence. Product-pilot
 * enquiries use the VELYQUA source context so the contact form retains intent.
 */
export const talk = {
  h2: 'Start with what brought you here.',
  tabs: [
    {
      id: 'hiring',
      label: "I'm hiring",
      title: 'Start with the container records.',
      body: 'For operations intelligence, AI-enabled operations, analytics or cloud support roles, start with my operational evidence and developing technical portfolio. Industrial AI is my emerging focus, grounded in 20+ years of supply chain and logistics experience.',
      linkLabel: 'Inspect the evidence',
      to: '/evidence?grade=real',
      message:
        "I'm hiring for an operations intelligence, AI-enabled operations, analytics or cloud support role in Singapore. I'd like to discuss your operations experience and technical portfolio.",
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
      'Container operations 391 jobs, 7 periods. Real operating evidence: anonymised container jobs across 7 reporting periods.',
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
      'Cold-chain risk 1,800 synthetic records. AI-assisted synthetic prototype across six warehouse zones.',
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
      'Control tower Concept only. Supply chain control tower: an AI-assisted synthetic concept, not a shipped capability.',
  },
];

export const yardLegend = [
  { tone: 'real', text: 'solid = real operating records' },
  { tone: 'synth', text: 'lighter = synthetic prototype' },
  { tone: 'concept', text: 'dashed = concept' },
];
