/** Public navigation only. This registry does not assert private runtime health. */
export const projects = [
  {
    id: 'velyqua', name: 'VELYQUA', category: 'Flagship project · Intelligence for living water',
    description: 'Develop an aquatic monitoring and decision-support product, starting with manual water tests, observations and care history. The next phase connects applied AI, cloud engineering and customer validation.',
    status: 'Working software prototype', boundary: 'AI-assisted monitoring, physical sensor performance, early-warning outcomes and commercial demand remain development and validation goals.',
    path: '/velyqua', href: 'https://velyqua.vercel.app/', external: true, linkLabel: 'Open VELYQUA',
  },
  {
    id: 'orqevia', name: 'ORQEVIA', category: 'Decisions with a record',
    description: 'Follow how a question becomes a reasoned decision, with assumptions and evidence made visible.',
    status: 'Illustrative walkthrough', boundary: 'The public walkthrough does not execute private AI tasks.',
    path: '/orqevia', href: '/orqevia', external: false, linkLabel: 'Explore the walkthrough',
  },
  {
    id: 'portal', name: 'The Portal', category: 'Unexpected connections',
    description: 'Explore imagined futures and connections between artifacts, ideas and possible experiments.',
    status: 'Working prototype', boundary: 'Generated hypotheses remain separate from established evidence.',
    path: '/portal', href: 'https://the-portal-ten.vercel.app/', external: true, linkLabel: 'Open The Portal',
  },
  {
    id: 'game-platform', name: 'Living Worlds / Game Platform', category: 'Decisions with consequences',
    description: 'Enter an interactive story where choices shape a persistent world and its next turn.',
    status: 'Working prototype', boundary: 'Guest continuity is tied to the browser; this is an evolving preview.',
    path: '/game-platform', href: 'https://game-platform-wine-nine.vercel.app/', external: true, linkLabel: 'Play Living Worlds',
  },
  {
    id: 'sky-tablet', name: 'The Sky Tablet', category: 'A different view of history',
    description: 'Explore a cinematic ancient city and sky through an interactive educational experience.',
    status: 'Working prototype', boundary: 'Historical and astronomical scenes are illustrative interpretations.',
    path: '/sky-tablet', href: 'https://sky-tablet.vercel.app/', external: true, linkLabel: 'Explore The Sky Tablet',
  },
];
