import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeEvent, sanitizeGate, sanitizeSummary, DEFAULT_TRACE_SOURCE } from '../api/jarvis-agent-trace.js';

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

test('release gate exposes aggregate classifications but strips private text', () => {
  const gate = sanitizeGate({
    decision: 'withheld', score: 0.514321,
    blocking_metrics: ['source_coverage', 'required_evidence', 'invented_metric'],
    evidence_gap_count: 2, unsupported_claim_count: 1, contradiction_count: 0,
    evaluator_valid: true, evaluation_version: '2.1',
    rationale: 'PRIVATE RATIONALE', prompt: 'SECRET PROMPT', answer: 'SECRET ANSWER',
  });
  assert.deepEqual(gate, {
    decision: 'withheld', score: 0.5143,
    blocking_metrics: ['required_evidence', 'source_coverage'],
    evidence_gap_count: 2, unsupported_claim_count: 1, contradiction_count: 0,
    evaluator_valid: true, evaluation_version: '2.1',
  });
  assert.equal(JSON.stringify(gate).includes('PRIVATE'), false);
  assert.equal(JSON.stringify(gate).includes('SECRET'), false);
});

test('trace sanitizer nests only a valid release gate', () => {
  const event = sanitizeEvent({
    trace_id: 'trace-2', timestamp: '2026-09-03T12:00:00Z', agent_id: 'A17',
    stage: 'reasoning', status: 'withheld', sequence: 4,
    gate: { decision: 'withheld', score: 0.5, blocking_metrics: ['task_success'], evaluator_valid: true, evaluation_version: '2.1' },
  });
  assert.equal(event.gate.decision, 'withheld');
  assert.deepEqual(event.gate.blocking_metrics, ['task_success']);
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
    withheld_executions_today: 3,
    denied_handoffs_today: 2,
    average_latency_ms: 12.5,
    active_window_seconds: 99999,
    prompt: 'secret',
    endpoint: 'private',
  }), {
    registered_agents: 29,
    active_agents: 4,
    executions_today: 8,
    withheld_executions_today: 3,
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
  assert.equal(summary.withheld_executions_today, 0);
  assert.equal(summary.denied_handoffs_today, 0);
});

test('default trace source is the durable Supabase relay and contains no credential', () => {
  assert.equal(DEFAULT_TRACE_SOURCE, 'https://bksyjvppcwfgwoelnyvp.supabase.co/functions/v1/jarvis-trace-relay');
  assert.ok(DEFAULT_TRACE_SOURCE.startsWith('https://'));
  assert.equal(DEFAULT_TRACE_SOURCE.includes('@'), false);
  assert.equal(DEFAULT_TRACE_SOURCE.includes('token='), false);
});
