import test from 'node:test';
import assert from 'node:assert/strict';
import { articleListQuery, articleQuery, fetchPublishedContent, normalizeArticle, normalizeArticleList, validInsightSlug } from '../src/lib/insights.js';
import { articleMetadata, createInsightsHandler } from '../api/insights.js';

function response() {
  return { code: 200, headers: {}, body: null, setHeader(key, value) { this.headers[key] = value; }, status(code) { this.code = code; return this; }, send(body) { this.body = body; return this; }, redirect(code, location) { this.code = code; this.headers.Location = location; return this; } };
}

test('public content parameters are encoded and drafts are excluded', async () => {
  let request;
  const result = await fetchPublishedContent(articleQuery, { slug: 'quoted"slug' }, { fetcher: async (url) => {
    request = new URL(url);
    return { ok: true, json: async () => ({ result: { title: 'Published' } }) };
  } });
  assert.equal(result.title, 'Published');
  assert.equal(JSON.parse(request.searchParams.get('$slug')), 'quoted"slug');
  assert.match(request.searchParams.get('query'), /drafts/);
  assert.match(articleListQuery, /defined\(slug.current\)/);
});

test('upstream failures and malformed payloads remain errors, never empty catalogs', async () => {
  for (const fetcher of [async () => ({ ok: false, status: 503 }), async () => ({ ok: true, json: async () => ({ error: 'unavailable' }) })]) {
    await assert.rejects(fetchPublishedContent(articleListQuery, {}, { fetcher }));
  }
  assert.throws(() => normalizeArticleList({ error: 'unavailable' }));
});

test('public reads obey navigation cancellation and bounded timeouts', async () => {
  const fetcher = async (_, { signal }) => new Promise((resolve, reject) => {
    if (signal.aborted) reject(signal.reason);
    else signal.addEventListener('abort', () => reject(signal.reason), { once: true });
  });
  const controller = new AbortController();
  const request = fetchPublishedContent(articleQuery, {}, { fetcher, signal: controller.signal });
  controller.abort();
  await assert.rejects(request, { name: 'AbortError' });
  await assert.rejects(fetchPublishedContent(articleQuery, {}, { fetcher, timeoutMs: 5 }), { name: 'TimeoutError' });
});

test('malformed CMS fields cannot create broken links or crash article rendering', () => {
  const articles = normalizeArticleList([null, { title: 'No slug' }, { slug: 'bad/path', title: 'Bad path' }, { slug: 'valid', title: 'Good', excerpt: { unsafe: true } }]);
  assert.equal(articles.length, 1);
  assert.equal(articles[0].excerpt, '');
  const article = normalizeArticle({ title: 'Good', publishedAt: 'invalid', keyTakeaways: ['Readable', { unsafe: true }], body: [null, { children: {} }, { children: [{ text: 'Text' }, null] }] }, 'valid');
  assert.equal(article.date, 'Date not listed');
  assert.deepEqual(article.keyTakeaways, ['Readable']);
  assert.equal(article.content, 'Text');
  assert.equal(normalizeArticle({ title: 'Own property only' }, 'toString').controlled, false);
  assert.equal(validInsightSlug(['multiple', 'values']), false);
});

test('controlled evidence wording survives CMS overwrite attempts', () => {
  const slug = 'supply-chain-control-tower-early-warning-system';
  const article = normalizeArticle({ title: 'Case study', excerpt: 'Production validated', content: 'Production claim' }, slug);
  assert.match(article.overview, /synthetic demonstration/);
  assert.match(article.content, /not a trained or validated predictive model/);
  assert.equal(normalizeArticleList([{ title: 'Case study', slug, excerpt: 'Production validated' }])[0].excerpt, article.overview);
});

test('article response distinguishes missing content, upstream outage and healthy pages', async () => {
  let res = response();
  await createInsightsHandler({ fetchContent: async () => null })({ method: 'GET', query: { slug: 'missing' } }, res);
  assert.equal(res.code, 404);
  assert.equal(res.headers['X-Robots-Tag'], 'noindex');
  res = response();
  await createInsightsHandler({ fetchContent: async () => { throw new Error('CMS offline'); } })({ method: 'GET', query: { slug: 'existing' } }, res);
  assert.equal(res.code, 503);
  assert.equal(res.headers['Retry-After'], '30');
  res = response();
  await createInsightsHandler({ fetchContent: async () => ({ title: 'Working', excerpt: 'Readable' }), readShell: async () => '<title>Home</title>' })({ method: 'GET', query: { slug: 'existing' } }, res);
  assert.equal(res.code, 200);
  assert.match(res.body, /Working \| Andrew Lam/);
  res = response();
  await createInsightsHandler()({ method: 'POST', query: { slug: 'existing' } }, res);
  assert.equal(res.code, 405);
});

test('server-rendered article metadata escapes HTML and preserves literal replacement characters', () => {
  const html = '<title>Home</title><meta name="description" content="home"><link rel="canonical" href="https://example.com"><meta property="og:type" content="website">';
  const rendered = articleMetadata(html, { title: '<script>$&</script>', overview: 'A "quote" & context' }, 'safe-slug');
  assert.ok(!rendered.includes('<script>'));
  assert.match(rendered, /&lt;script&gt;\$&amp;&lt;\/script&gt;/);
  assert.match(rendered, /A &quot;quote&quot; &amp; context/);
  assert.match(rendered, /insights\/safe-slug/);
  assert.match(rendered, /content="article"/);
});
