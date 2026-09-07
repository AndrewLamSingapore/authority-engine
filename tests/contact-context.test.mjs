import test from 'node:test';
import assert from 'node:assert/strict';
import { contactContext, inquiryTypes } from '../src/lib/contact-context.js';
test('external project links carry a valid, relevant enquiry and source', () => {
  for (const source of ['github','portal','velyqua','game-platform','sky-tablet','maxwell-excel','jarvis']) {
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
