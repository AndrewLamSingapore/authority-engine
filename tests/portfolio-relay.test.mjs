import assert from 'node:assert/strict';
import test from 'node:test';
import { authorityEvent, publishAuthorityEvent } from '../api/_portfolio-relay.js';

test('authority relay emits a redacted contract envelope', async () => {
  const event = authorityEvent('authority.evidence.reviewed', { _id: 'candidate-1', status: 'approved_for_draft', eventId: 'source-1', evidenceLevel: 'E3' }, { decision: 'approve' });
  assert.equal(event.source, 'authority-engine');
  assert.equal(event.payload.decision, 'approve');
  assert.equal(JSON.stringify(event).includes('reviewer_notes'), false);
});

test('authority relay stays disabled without credentials', async () => {
  const previousUrl = process.env.PORTFOLIO_RELAY_URL;
  const previousToken = process.env.PORTFOLIO_RELAY_TOKEN;
  delete process.env.PORTFOLIO_RELAY_URL;
  delete process.env.PORTFOLIO_RELAY_TOKEN;
  try {
    assert.deepEqual(await publishAuthorityEvent({}), { queued: false, reason: 'portfolio_relay_not_configured' });
  } finally {
    if (previousUrl !== undefined) process.env.PORTFOLIO_RELAY_URL = previousUrl;
    if (previousToken !== undefined) process.env.PORTFOLIO_RELAY_TOKEN = previousToken;
  }
});
