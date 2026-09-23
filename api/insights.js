import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { articleQuery, fetchPublishedContent, normalizeArticle, validInsightSlug } from '../src/lib/insights.js';

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function articleMetadata(html, article, slug) {
  const title = escapeHtml(`${article.title} | Andrew Lam`);
  const description = escapeHtml(article.overview);
  const url = escapeHtml(`https://authority-engine-app.vercel.app/insights/${encodeURIComponent(slug)}`);
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${title}</title>`)
    .replace(/(<meta\s+name="(?:title|twitter:title)"\s+content=")[^"]*("\s*\/?>)/gi, (_, start, end) => `${start}${title}${end}`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/i, (_, start, end) => `${start}${title}${end}`)
    .replace(/(<meta\s+(?:name="(?:description|twitter:description)"|property="og:description")\s+content=")[^"]*("\s*\/?>)/gi, (_, start, end) => `${start}${description}${end}`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/?>)/i, (_, start, end) => `${start}${url}${end}`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/i, (_, start, end) => `${start}${url}${end}`)
    .replace(/(<meta\s+property="og:type"\s+content=")[^"]*("\s*\/?>)/i, (_, start, end) => `${start}article${end}`);
}

function errorPage(title, message) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | Andrew Lam</title></head><body><main><h1>${title}</h1><p>${message}</p><a href="/insights">Back to Insights</a></main></body></html>`;
}

export function createInsightsHandler({ fetchContent = fetchPublishedContent, readShell = () => readFile(path.join(process.cwd(), 'dist', 'index.html'), 'utf8') } = {}) {
  return async function handler(req, res) {
    if (req.method && !['GET', 'HEAD'].includes(req.method)) {
      res.setHeader('Allow', 'GET, HEAD');
      return res.status(405).send('Method not allowed.');
    }
    const { slug } = req.query || {};
    if (!slug) return res.redirect(301, '/insights');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    try {
      const data = validInsightSlug(slug) ? await fetchContent(articleQuery, { slug }, { useCdn: false }) : null;
      const article = normalizeArticle(data, slug);
      if (!article) {
        res.setHeader('X-Robots-Tag', 'noindex');
        return res.status(404).send(errorPage('Article not found', 'This article may have moved or is no longer published.'));
      }
      const html = await readShell();
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
      return res.status(200).send(req.method === 'HEAD' ? '' : articleMetadata(html, article, slug));
    } catch {
      res.setHeader('Retry-After', '30');
      return res.status(503).send(errorPage('Article temporarily unavailable', 'Please try again shortly. You can still explore the other evidence.'));
    }
  };
}

export default createInsightsHandler();
