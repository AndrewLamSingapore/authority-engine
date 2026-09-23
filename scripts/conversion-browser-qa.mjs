/** Optional browser regression suite. Install playwright + axe-core separately.
 * QA_BROWSER may point to an installed Chromium executable.
 * This runs a local production preview and intercepts contact delivery.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { preview } from 'vite';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axePath = process.env.QA_AXE || require.resolve('axe-core/axe.min.js');
const output = process.env.QA_OUTPUT || '/tmp/authority-conversion-qa';
mkdirSync(output, { recursive: true });
const server = await preview({ preview: { host: '127.0.0.1', port: 4179, strictPort: true } });
const browser = await chromium.launch({ executablePath: process.env.QA_BROWSER || undefined, headless: true, args: process.env.QA_BROWSER ? ['--no-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--single-process'] : [] });
const results = [];
const errors = [];
const check = (name, pass, detail = '') => { results.push({ name, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${detail ? `: ${detail}` : ''}`); };
const base = 'http://127.0.0.1:4179';
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.setDefaultTimeout(7000);
page.on('pageerror', error => errors.push(error.message));
await page.route('**/api/jarvis-status', route => route.fulfill({ json: { prime: { state: 'unverified' } } }));
const overflow = () => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
const open = async path => { await page.goto(base + path, { waitUntil: 'domcontentloaded' }); await page.locator('h1').first().waitFor(); };
try {
  for (const path of ['/', '/about', '/evidence', '/frameworks', '/contact', '/jarvis', '/jarvis/agents', '/portal', '/velyqua', '/game-platform', '/sky-tablet', '/maxwell-excel', '/insights', '/demo', '/locked-demo', '/missing-route']) {
    await open(path);
    check(`Route ${path}`, await page.locator('h1').count() === 1 && await overflow());
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/frameworks', '/evidence', '/contact']) {
      await open(path);
      check(`No overflow ${width}px ${path}`, await overflow());
    }
  }
  await open('/');
  check('All five projects in homepage body', await page.locator('#builds article').count() === 5);
  await page.getByRole('tab', { name: "I'm hiring", exact: true }).click();
  await page.getByLabel('Your message (editable)').fill('Keep my hiring draft');
  await page.getByRole('tab', { name: 'I have an operations problem', exact: true }).click();
  await page.getByLabel('Your message (editable)').fill('Keep my operations draft');
  await page.getByRole('tab', { name: "I'm hiring", exact: true }).click();
  check('Talk tab preserves edited draft', await page.getByLabel('Your message (editable)').inputValue() === 'Keep my hiring draft');
  await page.getByRole('link', { name: 'Continue to contact form' }).click();
  check('Talk draft reaches contact', await page.locator('textarea[name="message"]').inputValue() === 'Keep my hiring draft');
  await open('/frameworks?model=inversion');
  check('Framework deep link', await page.locator('#model-title').innerText() === 'Work backward from failure');
  await page.locator('#answer-0').fill('A delivery handover loses its owner.');
  await page.getByRole('button', { name: /Everything feels urgent/ }).click();
  await page.getByRole('heading', { name: 'Find the constraint', exact: true }).waitFor();
  await page.locator('#answer-0').fill('Dispatch waits for documentation.');
  await page.getByRole('button', { name: /A plan looks too convincing/ }).click();
  await page.getByRole('heading', { name: 'Work backward from failure', exact: true }).waitFor();
  check('Framework preserves independent drafts', await page.locator('#answer-0').inputValue() === 'A delivery handover loses its owner.');
  await page.getByRole('link', { name: 'Discuss this decision' }).click();
  const message = await page.locator('textarea[name="message"]').inputValue();
  check('Framework handoff keeps model and answer', message.includes('Work backward from failure') && message.includes('A delivery handover loses its owner.'));
  let submissions = 0;
  await page.route('https://formspree.io/**', async route => { submissions++; await new Promise(resolve => setTimeout(resolve, 200)); await route.fulfill({ status: 500, contentType: 'text/plain', body: 'Temporary error' }); });
  await page.locator('input[name="name"]').fill('QA Visitor');
  await page.locator('input[name="email"]').fill('qa@example.com');
  await page.getByRole('button', { name: 'Start the conversation', exact: true }).evaluate(button => { button.click(); button.click(); });
  await page.getByRole('alert').waitFor();
  check('Contact failure preserves message', (await page.locator('textarea[name="message"]').inputValue()) === message && submissions === 1);
  await page.unroute('https://formspree.io/**');
  await page.route('https://formspree.io/**', async route => { submissions++; await route.fulfill({ json: { ok: true } }); });
  await page.getByRole('button', { name: 'Start the conversation', exact: true }).click();
  await page.getByRole('heading', { name: 'Message submitted.', exact: true }).waitFor();
  check('Contact success (delivery intercepted)', submissions === 2);
  await open('/evidence?grade=synth');
  check('Evidence deep link filter', await page.locator('.v2-evidence-row').count() === 1 && (await page.locator('.v2-evidence-title').innerText()).includes('Cold-chain'));
  await open('/frameworks?model=not-a-model');
  check('Unknown framework has useful fallback', await page.locator('#model-title').innerText() === 'Find the constraint');
  for (const theme of ['light', 'dark']) {
    for (const path of ['/', '/frameworks', '/evidence']) {
      await open(path);
      const current = await page.locator('html').getAttribute('data-theme');
      if (current !== theme) await page.getByRole('button', { name: `Switch to ${theme} theme` }).click();
      await page.waitForFunction(value => document.documentElement.dataset.theme === value, theme);
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
      await page.addScriptTag({ content: readFileSync(axePath, 'utf8') });
      const violations = await page.evaluate(async () => (await window.axe.run()).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })));
      check(`Accessibility ${theme} ${path}`, violations.length === 0, JSON.stringify(violations));
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open('/');
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
  await page.screenshot({ path: `${output}/home-desktop.png`, fullPage: true });
  await open('/frameworks');
  await page.screenshot({ path: `${output}/frameworks-desktop.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await open('/frameworks');
  await page.screenshot({ path: `${output}/frameworks-mobile.png`, fullPage: true });
  check('No JavaScript runtime exceptions', errors.length === 0, JSON.stringify(errors));
} catch (error) {
  check('Browser suite completed', false, error.stack);
} finally {
  writeFileSync(`${output}/results.json`, JSON.stringify(results, null, 2));
  await browser.close();
  await server.httpServer.close();
}
assert.equal(results.filter(result => !result.pass).length, 0, 'Browser regression failures');
