import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeEvent, sanitizeSummary, DEFAULT_TRACE_SOURCE } from '../api/jarvis-agent-trace.js';

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

test('summary sanitizer is bounded and strips private fields', () => {
  assert.deepEqual(sanitizeSummary({
    registered_agents: 999,
    active_agents: 4,
    executions_today: 8,
    denied_handoffs_today: 2,
    average_latency_ms: 12.5,
    active_window_seconds: 99999,
    prompt: 'secret',
    endpoint: 'private',
  }), {
    registered_agents: 29,
    active_agents: 4,
    executions_today: 8,
    denied_handoffs_today: 2,
    average_latency_ms: 12.5,
    active_window_seconds: 3600,
  });
});

test('empty summary reports truthful zero runtime activity', () => {
  const summary = sanitizeSummary(null);
  assert.equal(summary.registered_agents, 29);
  assert.equal(summary.active_agents, 0);
  assert.equal(summary.executions_today, 0);
  assert.equal(summary.denied_handoffs_today, 0);
});

test('default trace source is the durable Supabase relay and contains no credential', () => {
  assert.equal(DEFAULT_TRACE_SOURCE, 'https://bksyjvppcwfgwoelnyvp.supabase.co/functions/v1/jarvis-trace-relay');
  assert.ok(DEFAULT_TRACE_SOURCE.startsWith('https://'));
  assert.equal(DEFAULT_TRACE_SOURCE.includes('@'), false);
  assert.equal(DEFAULT_TRACE_SOURCE.includes('token='), false);
});
