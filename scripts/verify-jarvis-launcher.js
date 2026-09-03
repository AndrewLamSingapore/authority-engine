import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/JarvisControl.jsx', import.meta.url), 'utf8');

const required = [
  "const JARVIS_LOCAL_URL = 'http://127.0.0.1:8000/control'",
  "value: 'Available locally'",
  "value: 'Unavailable'",
  "value: 'Read-only'",
  "value: 'No actuation'",
  'J Console · Public signal available',
  'No live JARVIS data',
  "['Mode', 'Read-only']",
  "['Authority', 'Human']",
  "['Boundary', 'Public only']",
  "['Actuation', 'None']",
  "inquiryType: 'JARVIS / Governed AI Conversation'",
  'A proposal is not permission.',
  'No public access to the private JARVIS Control Surface',
  'The public walkthrough reads no private memory.',
  'approval, execution and automation remain unavailable',
  "fetch('/api/jarvis-status'",
];

for (const contract of required) {
  if (!source.includes(contract)) throw new Error(`Missing JARVIS launcher contract: ${contract}`);
}

const forbidden = [
  /fetch\s*\(\s*(?!['"]\/api\/jarvis-status['"])/,
  /axios/i,
  /<iframe/i,
  /prime\.lamjarvis\.com/i,
  /\/api\/control-surface/i,
];

const fetchCalls = source.match(/fetch\s*\(/g) || [];
if (fetchCalls.length !== 1) {
  throw new Error(`JARVIS public surface must make exactly one sanitized status request; found ${fetchCalls.length}`);
}

for (const pattern of forbidden) {
  if (pattern.test(source)) throw new Error(`JARVIS launcher violates the no-proxy boundary: ${pattern}`);
}

console.log('PASS: JARVIS public surface remains local-only, read-only, no-proxy and no-actuation.');
