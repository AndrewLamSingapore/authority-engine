import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('the active VELYQUA embed uses the live app and is permitted by the deployed CSP', () => {
  const config = JSON.parse(read('vercel.json'));
  const policy = config.headers.find(({ source }) => source === '/(.*)')
    .headers.find(({ key }) => key === 'Content-Security-Policy').value;
  const frameSources = policy.split(';').map((part) => part.trim())
    .find((part) => part.startsWith('frame-src ')).split(/\s+/).slice(1);
  for (const path of ['src/pages/Velyqua.jsx']) {
    const source = read(path);
    const url = source.match(/const velyquaUrl = '([^']+)'/)[1];
    assert.equal(url, 'https://velyqua.vercel.app/', `${path} uses the current app`);
    assert.ok(frameSources.includes(new URL(url).origin), `${path} must not be blocked by frame-src`);
  }
  assert.ok(!frameSources.includes('*'), 'frame access stays restricted to known origins');
});
