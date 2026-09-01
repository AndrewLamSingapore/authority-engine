export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  return res.status(200).json({
    ok: true,
    service: 'authority-engine',
    revision: process.env.VERCEL_GIT_COMMIT_SHA || null,
    evidence_review: {
      configured: Boolean(process.env.SANITY_WRITE_TOKEN && process.env.PORTFOLIO_INGESTION_TOKEN && process.env.AUTHORITY_REVIEW_TOKEN && process.env.AUTHORITY_PUBLICATION_TOKEN),
      publication_mode: 'explicit_draft_only'
    }
  });
}
