import assert from 'node:assert/strict';

const base = String(process.env.AUTHORITY_PRODUCTION_URL || 'https://authority-engine-app.vercel.app').replace(/\/$/, '');
const response = await fetch(`${base}/api/health`, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(15000) });
const body = await response.json();
assert.equal(response.status, 200, JSON.stringify(body));
assert.equal(body.ok, true);
assert.equal(body.service, 'authority-engine');
console.log(`Authority Engine production smoke passed at ${base}`);
