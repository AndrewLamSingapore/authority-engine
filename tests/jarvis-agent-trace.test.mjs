import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeEvent } from '../api/jarvis-agent-trace.js';

test('trace sanitizer exposes only allowlisted metadata', () => {
  const event = sanitizeEvent({
    trace_id: 'trace-1', timestamp: '2026-09-03T12:00:00Z', agent_id: 'A19',
    stage: 'verification', status: 'complete', sequence: 2,
    prompt: 'secret prompt', endpoint: 'http://private', credentials: 'secret', result: 'sensitive output'
  });
  assert.deepEqual(event, {
    trace_id: 'trace-1', timestamp: '2026-09-03T12:00:00Z', agent_id: 'A19',
    stage: 'verification', status: 'complete', sequence: 2,
  });
});

test('trace sanitizer rejects incomplete events', () => {
  assert.equal(sanitizeEvent({ trace_id: 'trace-1', agent_id: 'A19' }), null);
  assert.equal(sanitizeEvent(null), null);
});
