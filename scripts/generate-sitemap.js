import fs from 'node:fs/promises';
import path from 'node:path';
import { fetchPublishedContent, publishedPostFilter, validInsightSlug } from '../src/lib/insights.js';

const baseUrl = 'https://authority-engine-app.vercel.app';
const staticPages = ['', '/about', '/evidence', '/frameworks', '/portal', '/jarvis', '/jarvis/agents', '/velyqua', '/game-platform', '/sky-tablet', '/insights', '/maxwell-excel', '/demo', '/contact'];
const escapeXml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);

let posts = [];
try {
  const result = await fetchPublishedContent(`*[${publishedPostFilter} && defined(slug.current)]{"slug":slug.current,_updatedAt}`, {}, { useCdn: false });
  if (!Array.isArray(result)) throw new Error('Invalid article list');
  posts = result.filter((post) => post && validInsightSlug(post.slug));
} catch (error) {
  console.warn(`Sitemap content service unavailable (${error.message}); generating all public static routes.`);
}

const staticUrls = staticPages.map((page) => `  <url><loc>${baseUrl}${page || '/'}</loc><changefreq>weekly</changefreq><priority>${page ? '0.8' : '1.0'}</priority></url>`);
const dynamicUrls = posts.map((post) => {
  const date = post._updatedAt ? new Date(post._updatedAt) : null;
  const lastmod = date && !Number.isNaN(date.getTime()) ? `<lastmod>${date.toISOString()}</lastmod>` : '';
  return `  <url><loc>${escapeXml(`${baseUrl}/insights/${encodeURIComponent(post.slug)}`)}</loc>${lastmod}<changefreq>monthly</changefreq><priority>0.7</priority></url>`;
});
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticUrls, ...dynamicUrls].join('\n')}\n</urlset>\n`;
await fs.mkdir(path.resolve('public'), { recursive: true });
await fs.writeFile(path.resolve('public/sitemap.xml'), xml);
console.log(`Sitemap generated: ${staticPages.length} public routes, ${posts.length} published articles.`);
