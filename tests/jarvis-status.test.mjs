import assert from 'node:assert/strict';
import { portalSignal } from '../api/jarvis-status.js';

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
