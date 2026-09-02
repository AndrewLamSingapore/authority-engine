export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const reviewConfigured = Boolean(process.env.SANITY_WRITE_TOKEN && process.env.PORTFOLIO_INGESTION_TOKEN && process.env.AUTHORITY_REVIEW_TOKEN && process.env.AUTHORITY_PUBLICATION_TOKEN);
  const relayConfigured = Boolean(process.env.PORTFOLIO_RELAY_URL && process.env.PORTFOLIO_RELAY_TOKEN);
  return res.status(200).json({
    ok: true, service: 'authority-engine', revision: process.env.VERCEL_GIT_COMMIT_SHA || null,
    evidence_review: { configured: reviewConfigured, state: reviewConfigured ? 'ready' : 'disabled_missing_credentials', publication_mode: 'explicit_draft_only' },
    portfolio_relay: { configured: relayConfigured, state: relayConfigured ? 'ready' : 'disabled_missing_credentials' },
  });
}
