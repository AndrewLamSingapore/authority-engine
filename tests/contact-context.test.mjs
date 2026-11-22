import test from 'node:test';
import assert from 'node:assert/strict';
import { careerInquiryType, contactContext, inquiryTypes } from '../src/lib/contact-context.js';
test('external project links carry a valid, relevant enquiry and source', () => {
  for (const source of ['github','portal','velyqua','game-platform','sky-tablet','maxwell-excel','orqevia']) {
    const result = contactContext(`?source=${source}`);
    assert.ok(inquiryTypes.includes(result.inquiryType));
    assert.notEqual(result.source,'Authority Engine');
  }
  assert.equal(contactContext('?source=maxwell-excel').inquiryType,'Maxwell Container Service');
});
test('untrusted query strings cannot inject copy, destinations or unsupported inquiry types', () => {
  assert.equal(contactContext('?source=https://evil.test&message=malicious').source,'Authority Engine');
  assert.equal(contactContext('?source=toString').source,'Authority Engine');
  assert.equal(contactContext('?source=velyqua',{inquiryType:'unknown'}).inquiryType,'VELYQUA / Water Intelligence');
});
test('existing question handoffs remain intact', () => {
  assert.equal(contactContext('', {inquiryType:'Professional Inquiry',message:'A specific question'}).message,'A specific question');
});
test('relationship intents preserve the originating project and reject unknown intent values', () => {
  for (const source of ['portal','velyqua','game-platform','sky-tablet']) {
    const plain=contactContext(`?source=${source}`),intent=contactContext(`?source=${source}&intent=collaboration`);
    assert.equal(intent.source,plain.source);
    assert.equal(intent.inquiryType,plain.inquiryType);
    assert.ok(intent.message.length>0);
  }
  assert.equal(contactContext('?source=authority-engine&intent=role').inquiryType,careerInquiryType);
  assert.equal(contactContext('?source=sky-tablet&intent=research').inquiryType,'Sky Tablet / Research Conversation');
  assert.equal(contactContext('?intent=toString').inquiryType,careerInquiryType);
});

test('career and VELYQUA pilot handoffs retain distinct purposes and legacy drafts', () => {
  const career = contactContext('?source=authority-engine&intent=role');
  assert.equal(career.inquiryType, careerInquiryType);
  assert.match(career.message, /Singapore/);
  const pilot = contactContext('?source=velyqua&intent=collaboration');
  assert.equal(pilot.source, 'VELYQUA');
  assert.equal(pilot.inquiryType, 'VELYQUA / Water Intelligence');
  assert.match(pilot.message, /potential VELYQUA pilot/);
  const legacy = contactContext('', { inquiryType: 'Operations Excellence Opportunity', message: 'Existing draft' });
  assert.equal(legacy.inquiryType, 'Operations Excellence Opportunity');
  assert.equal(legacy.message, 'Existing draft');
});
