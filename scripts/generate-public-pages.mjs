import fs from 'node:fs/promises';
import path from 'node:path';

// Social crawlers and visitors without JavaScript receive the same route identity.
const pages = JSON.parse(await fs.readFile('src/data/public-pages.json', 'utf8'));
const template = await fs.readFile('dist/index.html', 'utf8');
const origin = 'https://authority-engine-app.vercel.app';
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
function meta(html, attribute, key, content) {
  const tag = `<meta ${attribute}="${key}" content="${escape(content)}">`;
  const match = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`, 'gi');
  return match.test(html) ? html.replace(match, () => tag) : html.replace('</head>', `${tag}</head>`);
}
for (const [route, page] of Object.entries(pages)) {
  const title = `${page.title} | Andrew Lam`;
  const url = `${origin}${route}`;
  let html = template.replace(/<title>[^<]*<\/title>/i, () => `<title>${escape(title)}</title>`);
  for (const [attribute, key, value] of [
    ['name', 'title', title], ['name', 'description', page.description],
    ['name', 'robots', page.noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'],
    ['property', 'og:title', title], ['property', 'og:description', page.description], ['property', 'og:url', url],
    ['name', 'twitter:title', title], ['name', 'twitter:description', page.description],
  ]) html = meta(html, attribute, key, value);
  html = html.replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi, () => `<link rel="canonical" href="${url}">`);
  html = html.replace(/<div id="root"><\/div>/, () => `<div id="root"><main style="max-width:70rem;margin:4rem auto;padding:2rem;font:1.125rem/1.6 system-ui"><p>Andrew Lam · Singapore</p><h1>${escape(page.title)}</h1><p>${escape(page.description)}</p><nav aria-label="Explore the portfolio"><a href="/evidence">Explore the evidence</a> · <a href="/orqevia">ORQEVIA</a> · <a href="/velyqua">VELYQUA</a> · <a href="/contact">Contact Andrew</a></nav></main></div>`);
  const file = route === '/' ? 'dist/index.html' : path.join('dist', `${route.slice(1)}.html`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
}
await fs.copyFile('llms.txt', 'dist/llms.txt');
console.log(`Published page metadata and fallback content for ${Object.keys(pages).length} routes, plus the canonical public profile.`);
