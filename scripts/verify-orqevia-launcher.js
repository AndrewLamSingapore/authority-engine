import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/OrqeviaControl.jsx', import.meta.url), 'utf8');

const required = [
  'ORQEVIA',
  'Curated examples, not live AI output.',
  "const PRIME_WORKSPACE_URL = 'https://192.168.1.23:8443/pwa/'",
  'ORQEVIA—not this website—verifies identity, session and authority.',
  'Owner and Member roles remain server-authoritative.',
  'This public page reads no private memory, accepts no credentials and provides no public execution or physical control.',
  "inquiryType: 'ORQEVIA / Governed AI Conversation'",
  "'/contact?source=orqevia&intent=collaboration'",
  "fetch('/api/orqevia-status'",
];

for (const contract of required) {
  if (!source.includes(contract)) throw new Error(`Missing ORQEVIA launcher contract: ${contract}`);
}

const forbidden = [
  /fetch\s*\(\s*(?!['"]\/api\/orqevia-status['"])/,
  /axios/i,
  /127\.0\.0\.1|localhost|lam-public-jarvis|lam-relationship-console/,
  /Available locally|Verified on the Dell|access_token|refresh_token|enrollment-code/,
  /<iframe/i,
  /prime\.lamjarvis\.com/i,
  /\/api\/control-surface/i,
];

const fetchCalls = source.match(/fetch\s*\(/g) || [];
if (fetchCalls.length !== 1) {
  throw new Error(`ORQEVIA public surface must make exactly one sanitized status request; found ${fetchCalls.length}`);
}

for (const pattern of forbidden) {
  if (pattern.test(source)) throw new Error(`ORQEVIA launcher violates the no-proxy boundary: ${pattern}`);
}

console.log('PASS: ORQEVIA public surface launches the governed ABEX workspace without proxying execution, credentials or authority.');
