import assert from 'node:assert/strict';
import { portalSignal, primeSignal } from '../api/jarvis-status.js';

const ready = await portalSignal(async () => ({ ok: true, json: async () => ({
  ok: true, revision: 'abc', portfolio_relay: true, portfolio_outbox_schema: true,
  portfolio_outbox: { counts: { DELIVERED: 4 }, ready: 0, oldest_ready_age_seconds: null },
}) }));
assert.equal(ready.state, 'ready');
assert.equal(ready.outbox.counts.DELIVERED, 4);
assert.equal(ready.relay, true);

const unavailable = await portalSignal(async () => ({ ok: false, status: 503 }));
assert.equal(unavailable.state, 'unavailable');
assert.equal(unavailable.status, 503);
console.log('Sanitized JARVIS status: PASS');

// Even old deployment env variables must not promote a historical Dell runtime.
const previous = { source: process.env.PRIME_SOURCE_REVISION, runtime: process.env.PRIME_RUNTIME_REVISION, verified: process.env.PRIME_VERIFIED_AT };
process.env.PRIME_SOURCE_REVISION = 'daeeb30';
process.env.PRIME_RUNTIME_REVISION = 'daeeb30';
process.env.PRIME_VERIFIED_AT = '2026-09-02T06:27:00Z';
const prime = primeSignal();
assert.equal(prime.state, 'unverified');
assert.equal(prime.runtime_host, 'ABEX');
assert.equal(prime.runtime_revision, null);
assert.equal(prime.verified_at, null);
assert.equal('accelerator' in prime, false);
for (const [key, value] of Object.entries({ PRIME_SOURCE_REVISION: previous.source, PRIME_RUNTIME_REVISION: previous.runtime, PRIME_VERIFIED_AT: previous.verified })) {
  if (value === undefined) delete process.env[key]; else process.env[key] = value;
}
