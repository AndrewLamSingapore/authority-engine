import test from 'node:test';
import assert from 'node:assert/strict';
import { assessPortfolioEvent } from '../../api/_authority-policy.js';
import { validatePortfolioEvent } from '../../api/generated/portfolio-contracts.js';
import { STATE_COUNT, branchVerdict, compileTable, compactVerdict, packedVerdict } from './kernel.mjs';
const table = compileTable();
const compact = compileTable(7);
test('complete 18-bit packed and compact domains match the branch specification', () => {
  assert.equal(STATE_COUNT, 262144);
  assert.equal(table.byteLength, 65536);
  assert.equal(compact.byteLength, 32);
  for (let state = 0; state < STATE_COUNT; state++) {
    assert.equal(packedVerdict(table, state), branchVerdict(state));
    assert.equal(compactVerdict(compact, state), branchVerdict(state));
  }
});
test('bounded verdicts agree with actual production assessments for explicit fixtures', () => {
  let cases = 0;
  for (let maturity = 0; maturity < 6; maturity++) for (const self of [false, true]) for (const provenance of [false, true]) for (const credential of [false, true]) {
    const event = { schema_version: '1.0.0', event_id: 'kernel-fixture-0001', event_type: 'game.simulation.completed', source: self ? 'authority-engine' : 'game-platform', occurred_at: '2026-10-21T00:00:00.000Z', correlation_id: 'bounded-fixture', evidence_level: `E${maturity}`, provenance: provenance ? ['fixture:1'] : [], payload: { summary: credential ? 'token=fixture-only-marker' : 'bounded simulation' } };
    const actual = assessPortfolioEvent(event);
    const state = maturity | (self ? 8 : 0) | (provenance ? 16 : 0) | (credential ? 32 : 0) | (validatePortfolioEvent(event).valid ? 64 : 0);
    const expected = actual.status === 'pending_review' ? 2 : actual.status === 'quarantined' ? 1 : 0;
    assert.equal(packedVerdict(table, state), expected, JSON.stringify({ maturity, self, provenance, credential, status: actual.status })); cases++;
  }
  assert.equal(cases, 48);
});
test('malformed states and table layouts are rejected', () => {
  for (const state of [-1, STATE_COUNT, 0.5, NaN, Infinity, '2', null]) {
    assert.throws(() => branchVerdict(state), RangeError);
    assert.throws(() => packedVerdict(table, state), RangeError);
    assert.throws(() => compactVerdict(compact, state), RangeError);
  }
  assert.throws(() => compileTable(8), RangeError);
  assert.throws(() => packedVerdict(new Uint8Array(1), 0), TypeError);
  assert.throws(() => compactVerdict(new Uint8Array(1), 0), TypeError);
});
