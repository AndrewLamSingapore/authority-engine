import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/JarvisControl.jsx', import.meta.url), 'utf8');

const required = [
  'JARVIS PRIME',
  'Curated examples, not live AI output.',
  "const PRIME_WORKSPACE_URL = 'https://192.168.1.23:8443/pwa/'",
  'PRIME—not this website—verifies identity, session and authority.',
  'Owner and Member roles remain server-authoritative.',
  'This public page reads no private memory, accepts no credentials and provides no public execution or physical control.',
  "inquiryType: 'JARVIS / Governed AI Conversation'",
  "'/contact?source=jarvis&intent=collaboration'",
  "fetch('/api/jarvis-status'",
];

for (const contract of required) {
  if (!source.includes(contract)) throw new Error(`Missing JARVIS launcher contract: ${contract}`);
}

const forbidden = [
  /fetch\s*\(\s*(?!['"]\/api\/jarvis-status['"])/,
  /axios/i,
  /127\.0\.0\.1|localhost|lam-public-jarvis|lam-relationship-console/,
  /Available locally|Verified on the Dell|access_token|refresh_token|enrollment-code/,
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

console.log('PASS: JARVIS public surface launches the governed ABEX workspace without proxying execution, credentials or authority.');
