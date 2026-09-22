/**
 * Authority Engine V2 browser acceptance check.
 *
 * Drives a real Chromium-family browser (Microsoft Edge by default) against a
 * running preview server and reports:
 *   - runtime errors and failed requests;
 *   - horizontal overflow at phone/tablet/desktop widths;
 *   - theme switching, sticky header, mobile nav wrapping;
 *   - the Talk tablist and evidence filters (URL state, no scroll jump);
 *   - container-yard links, skip link and focus visibility;
 *   - reduced-motion behaviour;
 *   - axe-core violations;
 *   - full-page acceptance screenshots.
 *
 * `playwright-core` and `axe-core` are intentionally not project dependencies:
 * this script is opt-in and exits cleanly when they are absent, so CI is not
 * affected.
 *
 *   npm run preview -- --port 4178 --strictPort
 *   node scripts/v2-browser-qa.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const BASE = process.env.V2_QA_BASE || 'http://localhost:4178';
const EDGE_PATHS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
];
const SHOTS = process.env.V2_QA_SHOTS || path.join(tmpdir(), 'ae-v2-shots');

const results = [];
const record = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` :: ${detail}` : ''}`);
};

/** Run one interaction step, reporting a thrown error as a failed check. */
const step = async (name, body) => {
  try {
    await body();
  } catch (error) {
    record(name, false, `${error.name}: ${String(error.message).split('\n')[0]}`);
  }
};

let chromium;
try {
  ({ chromium } = await import('playwright-core'));
} catch {
  console.log('SKIP  playwright-core is not installed; run "npm install --no-save --no-package-lock playwright-core axe-core" first.');
  process.exit(0);
}

const executablePath = EDGE_PATHS.find((candidate) => existsSync(candidate));
if (!executablePath) {
  console.log('SKIP  no Chromium-family browser found.');
  process.exit(0);
}

let axeSource = '';
try {
  const axePath = new URL('../node_modules/axe-core/axe.min.js', import.meta.url);
  if (existsSync(axePath)) axeSource = readFileSync(axePath, 'utf8');
} catch {
  axeSource = '';
}

mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });

const openPage = async ({ viewport, colorScheme = 'light', reducedMotion = 'no-preference' }) => {
  const context = await browser.newContext({ viewport, colorScheme, reducedMotion });
  const page = await context.newPage();
  const errors = [];
  const failed = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('requestfailed', (request) => failed.push(`${request.url()} ${request.failure()?.errorText || ''}`));
  page.on('response', (response) => {
    if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`);
  });
  return { context, page, errors, failed };
};

const overflow = (page) =>
  page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));

/* ------------------------------------------------------------------ routes */

const routeExpectations = [
  { path: '/', h1: "I've run the operation. Now I build the analytics that see trouble sooner." },
  { path: '/about', h1: 'Experience on the floor. Intelligence above it.' },
  { path: '/evidence', h1: "What each piece of evidence supports, and what it doesn't." },
];

for (const expectation of routeExpectations) {
  const { context, page, errors, failed } = await openPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}${expectation.path}`, { waitUntil: 'networkidle' });
  const h1 = (await page.locator('h1').first().textContent())?.trim();
  record(`route ${expectation.path} renders the specified H1`, h1 === expectation.h1, h1 === expectation.h1 ? '' : `got "${h1}"`);
  record(`route ${expectation.path} has no runtime or asset errors`, errors.length === 0 && failed.length === 0, [...errors, ...failed].join(' | ').slice(0, 300));
  await context.close();
}

/* --------------------------------------------------------------- overflow */

for (const width of [1440, 1024, 768, 390, 360, 320]) {
  const { context, page } = await openPage({ viewport: { width, height: 900 } });
  for (const route of ['/', '/about', '/evidence']) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
    const { scrollWidth, innerWidth } = await overflow(page);
    record(`no horizontal overflow at ${width}px on ${route}`, scrollWidth <= innerWidth + 1, `scrollWidth=${scrollWidth} innerWidth=${innerWidth}`);
  }
  await context.close();
}

/* ------------------------------------------------------------------ mobile */

{
  const { context, page } = await openPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const brand = await page.locator('.v2-brand').boundingBox();
  const nav = await page.locator('.v2-nav').boundingBox();
  record('mobile header wraps the nav onto a second row', Boolean(brand && nav) && nav.y >= brand.y + brand.height - 2, `brand.y=${brand?.y} nav.y=${nav?.y}`);
  const toggle = await page.locator('.v2-theme-toggle').boundingBox();
  record('theme toggle keeps a 44px target', Boolean(toggle) && toggle.width >= 44 && toggle.height >= 44, `${toggle?.width}x${toggle?.height}`);
  await page.screenshot({ path: path.join(SHOTS, 'home-mobile-390.png'), fullPage: true });
  await context.close();
}

/* ------------------------------------------------------------------- theme */

{
  const { context, page } = await openPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const startTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  record('dark system preference opens in the dark theme', startTheme === 'dark', `data-theme=${startTheme}`);
  const darkBg = await page.evaluate(() => getComputedStyle(document.querySelector('.v2-root')).backgroundColor);
  record('dark theme uses the specified surface', darkBg === 'rgb(13, 24, 32)', darkBg);
  await page.locator('.v2-theme-toggle').click();
  const lightBg = await page.evaluate(() => getComputedStyle(document.querySelector('.v2-root')).backgroundColor);
  record('theme toggle switches to the light palette', lightBg === 'rgb(237, 240, 238)', lightBg);
  const headerSticky = await page.evaluate(() => getComputedStyle(document.querySelector('.v2-header')).position);
  record('header stays sticky', headerSticky === 'sticky', headerSticky);
  await page.screenshot({ path: path.join(SHOTS, 'home-desktop-light.png'), fullPage: true });
  await page.locator('.v2-theme-toggle').click();
  await page.screenshot({ path: path.join(SHOTS, 'home-desktop-dark.png'), fullPage: true });
  await context.close();
}

/* -------------------------------------------------------------------- talk */

{
  const { context, page } = await openPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.locator('.v2-header .v2-btn-accent').click();
  await page.waitForTimeout(700);
  const scrolled = await page.evaluate(() => window.scrollY > 200);
  record('header "Let\'s talk" scrolls to the Talk band', scrolled);
  const focusedRole = await page.evaluate(() => document.activeElement?.getAttribute('role'));
  record('Talk band moves focus to the tablist', focusedRole === 'tab', `role=${focusedRole}`);
  await page.keyboard.press('ArrowRight');
  const selected = await page.evaluate(() => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim());
  record('arrow key moves selection in the tablist', selected === 'I have an operations problem', `selected=${selected}`);
  const actionContrast = await page.evaluate(() => {
    const luminance = (value) => {
      const [r, g, b] = value.match(/[\d.]+/g).slice(0, 3).map(Number).map((channel) => {
        const c = channel / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const node = document.querySelector('.v2-panel-actions .v2-btn-solid-onband');
    const style = getComputedStyle(node);
    const [fg, bg] = [luminance(style.color), luminance(style.backgroundColor)].sort((a, b) => b - a);
    return { ratio: Number(((fg + 0.05) / (bg + 0.05)).toFixed(2)), color: style.color, background: style.backgroundColor };
  });
  record('Talk primary action text contrasts with its fill', actionContrast.ratio >= 4.5, JSON.stringify(actionContrast));
  await page.screenshot({ path: path.join(SHOTS, 'talk-desktop.png') });
  await context.close();
}

/* ---------------------------------------------------------------- evidence */

{
  const { context, page } = await openPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${BASE}/evidence`, { waitUntil: 'networkidle' });
  const count = await page.locator('.v2-evidence-row').count();
  record('evidence page lists every graded entry', count === 3, `rows=${count}`);
  await page.evaluate(() => window.scrollTo(0, 260));
  const before = await page.evaluate(() => window.scrollY);
  await page.getByRole('button', { name: 'Concepts' }).click();
  await page.waitForTimeout(250);
  const after = await page.evaluate(() => window.scrollY);
  const url = page.url();
  const filtered = await page.locator('.v2-evidence-row').count();
  record('filtering does not jump the page to the top', Math.abs(after - before) <= 2, `before=${before} after=${after}`);
  record('filter writes the URL state', url.endsWith('/evidence?grade=concept'), url);
  record('filter shows only the matching grade', filtered === 1, `rows=${filtered}`);
  const pressed = await page.getByRole('button', { name: 'Concepts' }).getAttribute('aria-pressed');
  record('filter button exposes aria-pressed', pressed === 'true', `aria-pressed=${pressed}`);
  await page.locator('.v2-evidence-row summary').first().click();
  const open = await page.locator('.v2-evidence-row').first().evaluate((node) => node.hasAttribute('open'));
  record('evidence rows expand with details/summary', open === true);
  const columns = await page.evaluate(() => {
    const body = document.querySelector('.v2-evidence-body');
    return body ? Array.from(body.querySelectorAll('h3')).map((h) => h.textContent.trim()) : [];
  });
  record('expanded row states what it shows and what it does not claim', columns.includes('What it shows') && columns.includes("What it doesn't claim"), columns.join(' / '));
  const layout = await page.evaluate(() => {
    const body = document.querySelector('.v2-evidence-body');
    const heading = body?.querySelector('h3');
    const list = document.querySelector('.v2-evidence-list');
    if (!body || !heading || !list) return null;
    return {
      single: body.classList.contains('v2-evidence-body-single'),
      headingOffset: Number(((heading.getBoundingClientRect().left - list.getBoundingClientRect().left) / list.getBoundingClientRect().width).toFixed(3)),
    };
  });
  record('rows without figures use the full width of the expanded area', layout?.single === true && layout.headingOffset < 0.06, JSON.stringify(layout));
  await page.screenshot({ path: path.join(SHOTS, 'evidence-desktop-concept.png'), fullPage: true });
  await context.close();
}

{
  const { context, page } = await openPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${BASE}/evidence?grade=synth`, { waitUntil: 'networkidle' });
  const title = await page.locator('.v2-evidence-title').first().textContent();
  record('deep-linked grade state loads on first paint', title?.trim() === 'Cold-chain risk intelligence', `title=${title}`);
  await context.close();
}

/* -------------------------------------------------- container yard + links */

{
  const { context, page } = await openPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const hrefs = await page.$$eval('.v2-yard-link', (nodes) => nodes.map((node) => node.getAttribute('href')));
  record('container yard keeps its three evidence links', JSON.stringify(hrefs) === JSON.stringify(['/evidence?grade=real', '/evidence?grade=synth', '/evidence?grade=concept']), hrefs.join(','));
  const labels = await page.$$eval('.v2-yard-link', (nodes) => nodes.map((node) => node.getAttribute('aria-label')));
  record('every container carries an accessible label', labels.every((label) => label && label.length > 20));
  await step('concept container is clickable in its middle (transparent hit area)', async () => {
    await page.locator('.v2-yard-link').nth(2).click();
    await page.waitForLoadState('networkidle');
    record('concept container navigates to the concept evidence', page.url().endsWith('/evidence?grade=concept'), page.url());
  });
  await context.close();
}

/* ------------------------------------------------------------ keyboard/UX */

{
  const { context, page } = await openPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const skip = await page.evaluate(() => document.activeElement?.className);
  record('skip link is the first focus stop', String(skip).includes('v2-skip'), String(skip));
  await page.locator('.v2-hero-actions .v2-btn-accent').focus();
  const outline = await page.evaluate(() => {
    const style = getComputedStyle(document.activeElement);
    return { width: style.outlineWidth, style: style.outlineStyle, color: style.outlineColor };
  });
  record('focus is visibly outlined', outline.style !== 'none' && parseFloat(outline.width) >= 2, JSON.stringify(outline));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  const animation = await page.evaluate(() => getComputedStyle(document.querySelector('.v2-yard-link')).animationName);
  record('reduced motion removes the container drop-in', animation === 'none', `animationName=${animation}`);
  await context.close();
}

/* ------------------------------------------------------------------ fonts */

{
  const { context, page } = await openPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => ({
    display: document.fonts.check('16px "Bricolage Grotesque Variable"'),
    body: document.fonts.check('16px "Newsreader Variable"'),
  }));
  record('self-hosted display and body fonts load', fonts.display && fonts.body, JSON.stringify(fonts));
  await context.close();
}

/* --------------------------------------------------------------- axe-core */

if (axeSource) {
  for (const colorScheme of ['light', 'dark']) {
    const { context, page } = await openPage({ viewport: { width: 1440, height: 1000 }, colorScheme });
    // The deployed site sends `script-src 'self'`, which blocks both inline
    // scripts and the axe CDN. Serving the bundle from the site's own origin
    // through a request route keeps the audit honest without weakening the CSP.
    await page.route('**/v2-a11y-probe.js', (route) =>
      route.fulfill({ status: 200, contentType: 'application/javascript', body: axeSource }),
    );
    for (const route of ['/', '/about', '/evidence']) {
      await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
      await page.addScriptTag({ url: '/v2-a11y-probe.js' });
      const loaded = await page.evaluate(() => typeof window.axe?.run === 'function');
      if (!loaded) {
        record(`axe-core (${colorScheme}) could not be loaded on ${route}`, false, 'the audit bundle did not execute');
        continue;
      }
      const report = await page.evaluate(async () => window.axe.run(document, { resultTypes: ['violations'] }));
      const violations = report.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
        detail: violation.nodes.slice(0, 4).map((node) => {
          const contrast = node.any?.[0]?.data;
          const ratio = contrast ? ` fg=${contrast.fgColor} bg=${contrast.bgColor} ratio=${contrast.contrastRatio}` : '';
          return `${(node.target || []).join(' ')}${ratio}`;
        }),
      }));
      const blocking = violations.filter((violation) => ['serious', 'critical'].includes(violation.impact));
      record(`axe-core (${colorScheme}) has no serious violations on ${route}`, blocking.length === 0, JSON.stringify(violations));
    }
    await context.close();
  }
} else {
  console.log('SKIP  axe-core not installed; accessibility scan not executed.');
}

await browser.close();

const reportPath = path.join(SHOTS, 'qa-report.json');
writeFileSync(reportPath, JSON.stringify({ base: BASE, executablePath, results, shots: SHOTS }, null, 2));
const failures = results.filter((result) => !result.pass);
console.log(`\n${results.length - failures.length}/${results.length} checks passed. Report: ${reportPath}`);
process.exit(failures.length === 0 ? 0 : 1);
