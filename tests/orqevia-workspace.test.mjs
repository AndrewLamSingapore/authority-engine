import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/pages/OrqeviaControl.jsx', import.meta.url), 'utf8');

test('the public ORQEVIA page offers an illustrative walkthrough and its owning source', () => {
  assert.match(source, /href="#try-orqevia"/);
  assert.match(source, /https:\/\/github\.com\/AndrewLamSingapore\/orqevia/);
  assert.match(source, /Curated examples, not live AI output/);
  assert.doesNotMatch(source, /192\.168\.|127\.0\.0\.1|localhost|PRIME_WORKSPACE_URL/);
});

test('the public page neither accepts credentials nor grants private authority', () => {
  assert.match(source, /operational workspace uses separate authenticated access/);
  assert.match(source, /Private memory and task execution remain in the authenticated workspace/);
  assert.doesNotMatch(source, /localStorage|sessionStorage|Authorization|enrollment-code|access_token|refresh_token/);
});

test('public availability does not establish a live worker count or private runtime status', () => {
  assert.match(source, /does not establish which workers or services are running/);
  assert.match(source, /not observed/);
  assert.doesNotMatch(source, /Private ABEX workspace available|21-role|21 registered roles/);
});
