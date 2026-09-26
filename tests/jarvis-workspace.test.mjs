import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/pages/JarvisControl.jsx', import.meta.url), 'utf8');

test('the canonical JARVIS page launches the governed ABEX HTTPS workspace', () => {
  assert.match(source, /const PRIME_WORKSPACE_URL = 'https:\/\/192\.168\.1\.23:8443\/pwa\/';/);
  assert.match(source, /Open my JARVIS workspace/);
  assert.match(source, /Open JARVIS PRIME/);
  assert.match(source, /target="_blank" rel="noopener noreferrer"/);
});

test('the public gateway cannot claim or grant client authority', () => {
  assert.match(source, /PRIME—not this website—verifies identity, session and authority/);
  assert.match(source, /Owner and Member roles remain server-authoritative/);
  assert.match(source, /cannot enroll a device, change a role or grant authority/);
  assert.doesNotMatch(source, /localStorage|sessionStorage|Authorization|enrollment-code|access_token|refresh_token/);
});

test('availability and outcome copy remains truthful', () => {
  assert.match(source, /An expired session stays expired/);
  assert.match(source, /an unavailable ABEX host stays unavailable/);
  assert.match(source, /neither condition is presented as success/);
  assert.match(source, /reads no private memory, accepts no credentials and provides no public execution/);
  assert.match(source, /LAN-only HTTPS origin/);
});
