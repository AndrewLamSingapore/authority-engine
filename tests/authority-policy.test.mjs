import assert from 'node:assert/strict';
import test from 'node:test';
import { assessPortfolioEvent, candidateId, decideCandidate, draftFromCandidate } from '../api/_authority-policy.js';

const event = (level = 'E2') => ({ schema_version:'1.0.0',event_id:'game-event-0001',event_type:'game.simulation.completed',source:'game-platform',occurred_at:'2026-09-01T00:00:00.000Z',correlation_id:'scenario-seed-1',evidence_level:level,provenance:['scenario:seed-1'],payload:{summary:'bounded deterministic simulation',account_id:'private-account',email:'owner@example.com'} });

test('valid evidence is redacted and queued', () => {
  const assessment = assessPortfolioEvent(event());
  assert.equal(assessment.accepted, true);
  assert.equal(assessment.status, 'pending_review');
  assert.equal(assessment.event.payload.account_id, '[REDACTED]');
  assert.equal(assessment.event.payload.email, '[REDACTED]');
  assert.equal(assessment.event.occurred_at, event().occurred_at);
});

test('low maturity evidence is quarantined and cannot be approved', () => {
  const assessment = assessPortfolioEvent(event('E1'));
  assert.equal(assessment.status, 'quarantined');
  assert.throws(() => decideCandidate({_type:'portfolioEvidenceCandidate',reviewable:false}, 'approve'), /below E2/);
});

test('credentials are rejected and identifiers are deterministic', () => {
  const unsafe = event(); unsafe.payload.api_key = 'secret';
  assert.equal(assessPortfolioEvent(unsafe).accepted, false);
  assert.equal(candidateId(unsafe.event_id), candidateId(unsafe.event_id));
});

test('publication adapter only creates an unpublished draft after approval', () => {
  const candidate = {_id:candidateId(event().event_id),_type:'portfolioEvidenceCandidate',status:'approved_for_draft',event:event()};
  const draft = draftFromCandidate(candidate, {});
  assert.match(draft._id, /^drafts\./);
  assert.equal('publishedAt' in draft, false);
});
