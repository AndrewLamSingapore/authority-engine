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
  const staticPages = ['', '/about', '/portal', '/open-aqua', '/insights', '/maxwell-excel', '/contact'];

  try {
    const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;
    const posts = await client.fetch(query);

    const staticUrls = staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

    const dynamicUrls = posts.map(post => `
  <url>
    <loc>${baseUrl}/insights/${post.slug}</loc>
    <lastmod>${new Date(post._updatedAt || Date.now()).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.xml.org/schemas/sitemap/0.9">
${staticUrls}
${dynamicUrls}
</urlset>`;

    const publicDir = path.resolve('public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    console.log('✅ Dynamic sitemap.xml generated successfully with', posts.length, 'article slugs.');
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error);
  }
}

generateSitemap();
