import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'h3pl1rfx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function generateSitemap() {
  const baseUrl = 'https://authority-engine-app.vercel.app';
  const staticPages = ['', '/about', '/evidence', '/portal', '/jarvis', '/velyqua', '/insights', '/maxwell-excel', '/contact'];

  // Fail loudly. The previous version caught and only logged, so a Sanity
  // outage silently skipped sitemap generation and the build still reported
  // success. A missing sitemap must be a build failure, not a warning.
  const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;
  const posts = await client.fetch(query);

  const staticUrls = staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

  // No Date.now() fallback: that made every run produce different output, so
  // the generated file could never match a committed copy. Emit <lastmod> only
  // when the CMS actually supplies a timestamp.
  const dynamicUrls = posts.map(post => {
    const lastmod = post._updatedAt ? `
    <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>` : '';
    return `
  <url>
    <loc>${baseUrl}/insights/${post.slug}</loc>
${lastmod}
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${dynamicUrls}
</urlset>`;

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('✅ Dynamic sitemap.xml generated successfully with', posts.length, 'article slugs.');
}

generateSitemap().catch(error => {
  console.error('❌ Failed to generate sitemap:', error);
  process.exitCode = 1;
});
