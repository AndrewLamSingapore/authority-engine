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

test('credential-bearing provenance is rejected before storage and legacy drafts fail closed', () => {
  const unsafe = event();
  unsafe.provenance = ['https://evidence.example.test/run?api_key=private-token-value'];
  const assessment = assessPortfolioEvent(unsafe);
  assert.equal(assessment.accepted, false);
  assert.deepEqual(assessment.rejected_paths, ['/provenance/0']);
  assert.equal(JSON.stringify(assessment).includes('private-token-value'), false);
  assert.throws(() => draftFromCandidate({
    _id: candidateId(unsafe.event_id), _type: 'portfolioEvidenceCandidate',
    status: 'approved_for_draft', event: unsafe,
  }), /privacy review/);
});

test('private provenance identifiers are scrubbed at ingestion and draft creation', () => {
  const unsafe = event();
  unsafe.provenance = ['scenario:owner@example.com', 'account_id=private-account'];
  const assessment = assessPortfolioEvent(unsafe);
  assert.equal(assessment.accepted, true);
  assert.deepEqual(assessment.redactions.sort(), ['/payload/account_id', '/payload/email', '/provenance/0', '/provenance/1']);
  assert.equal(JSON.stringify(assessment.event).includes('owner@example.com'), false);
  assert.equal(JSON.stringify(assessment.event).includes('private-account'), false);
  const draft = draftFromCandidate({
    _id: candidateId(unsafe.event_id), _type: 'portfolioEvidenceCandidate',
    status: 'approved_for_draft', event: unsafe,
  });
  assert.equal(draft.content.includes('owner@example.com'), false);
  assert.equal(draft.content.includes('private-account'), false);
  assert.match(draft.content, /REDACTED_EMAIL/);
  assert.match(draft.content, /REDACTED_IDENTIFIER/);
});


const credentialTextFixtures = [
  ['authorization header', 'Authorization: Bearer fixture_credential_marker'],
  ['nested bearer', 'See diagnostic: bearer fixture_credential_marker'],
  ['JSON credential', '{"api_key":"fixture_credential_marker"}'],
  ['query credential', 'https://evidence.example.test/run?token=fixture_credential_marker'],
  ['URL user info', 'https://fixture-user:fixture_credential_marker@evidence.example.test/run'],
];

for (const [label, text] of credentialTextFixtures) {
  test(`credential-bearing payload text is rejected: ${label}`, () => {
    const unsafe = event();
    unsafe.payload.details = { notes: ['ordinary context', text] };
    const assessment = assessPortfolioEvent(unsafe);
    assert.equal(assessment.accepted, false);
    assert.equal(assessment.status, 'rejected');
    assert.ok(assessment.reasons.includes('credential_material_prohibited'));
    assert.deepEqual(assessment.rejected_paths, ['/payload/details/notes/1']);
    assert.equal(JSON.stringify(assessment).includes('fixture_credential_marker'), false);
    const legacyCandidate = {
      _id: candidateId(unsafe.event_id), _type: 'portfolioEvidenceCandidate',
      status: 'approved_for_draft', eventJson: JSON.stringify(unsafe),
    };
    assert.throws(() => draftFromCandidate(legacyCandidate), /privacy review/);
  });
}

test('ordinary payload discussion about security concepts remains reviewable', () => {
  const safe = event();
  safe.payload.summary = 'Use a token budget; review password policies and credential handling.';
  assert.equal(assessPortfolioEvent(safe).reviewable, true);
});


for (const key of ['accessToken', 'api-key', 'credentials', 'clientSecret', 'refresh_token', 'api%5Fkey']) {
  test(`credential key spelling is rejected before storage or draft: ${key}`, () => {
    const unsafe = event(); unsafe.payload.details = { [key]: 'fixture_credential_marker' };
    const assessment = assessPortfolioEvent(unsafe);
    assert.equal(assessment.accepted, false);
    assert.equal(JSON.stringify(assessment).includes('fixture_credential_marker'), false);
    assert.throws(() => draftFromCandidate({ _id: candidateId(unsafe.event_id), status: 'approved_for_draft', event: unsafe }), /privacy review/);
  });
}
for (const text of [
  'https://evidence.example.test/?api%5Fkey=fixture_credential_marker',
  'https://evidence.example.test/?api%255Fkey=fixture_credential_marker',
  'Malformed %ZZ followed by api%5Fkey=fixture_credential_marker',
  'OPENAI_API_KEY=fixture_credential_marker',
  'accessToken=fixture_credential_marker',
]) {
  test(`encoded or compound payload credential is rejected: ${text.split('=')[0]}`, () => {
    const unsafe = event(); unsafe.payload.summary = text;
    const assessment = assessPortfolioEvent(unsafe);
    assert.equal(assessment.reviewable, false);
    assert.equal(JSON.stringify(assessment).includes('fixture_credential_marker'), false);
    assert.throws(() => draftFromCandidate({ _id: candidateId(unsafe.event_id), status: 'approved_for_draft', event: unsafe }), /privacy review/);
  });
}
test('credential material in a property name is rejected without leaking through diagnostics', () => {
  const unsafe = event(); unsafe.payload['token=fixture_credential_marker'] = 'metadata';
  const assessment = assessPortfolioEvent(unsafe);
  assert.equal(assessment.accepted, false);
  assert.equal(JSON.stringify(assessment).includes('fixture_credential_marker'), false);
});
test('private identifiers in payload text and camel-case fields are redacted at both boundaries', () => {
  const unsafe = event(); unsafe.payload.summary = 'account_id=fixture-private-marker'; unsafe.payload.customerId = 'fixture-private-marker';
  const assessment = assessPortfolioEvent(unsafe);
  assert.equal(assessment.reviewable, true);
  assert.equal(JSON.stringify(assessment.event).includes('fixture-private-marker'), false);
  const draft = draftFromCandidate({ _id: candidateId(unsafe.event_id), status: 'approved_for_draft', event: unsafe });
  assert.equal(draft.content.includes('fixture-private-marker'), false);
});
