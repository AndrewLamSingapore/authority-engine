import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.redirect(301, '/insights');
  }

  const projectId = 'h3pl1rfx';
  const dataset = 'production';
  const params = new URLSearchParams({
    query: '*[_type == "post" && slug.current == $slug][0]._id',
    '$slug': JSON.stringify(String(slug)),
  });
  const sanityUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?${params}`;

  try {
    const sanityRes = await fetch(sanityUrl);
    const data = await sanityRes.json();

    if (!data.result) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('X-Robots-Tag', 'noindex');
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>404 | Article Not Found</title>
            <style>
              body { background: #080F0E; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
              h1 { font-size: 2.5rem; margin-bottom: 0.5rem; color: #f43f5e; }
              p { color: #9CA3AF; margin-bottom: 1.5rem; }
              a { color: #10B981; text-decoration: none; font-weight: 600; border: 1px solid #10B981; padding: 0.6rem 1.2rem; border-radius: 0.5rem; }
            </style>
          </head>
          <body>
            <div>
              <h1>404 — Article Not Found</h1>
              <p>The requested article standard could not be located on Sanity CMS.</p>
              <a href="/insights">Back to Insights</a>
            </div>
          </body>
        </html>
      `);
    }

    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    }

    return res.status(500).send('Application shell unavailable.');
  } catch (err) {
    console.error('Sanity validation error:', err);
    return res.status(502).send('Unable to validate the requested insight.');
  }
}
