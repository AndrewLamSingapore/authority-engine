const ALLOWED_ORIGIN = 'https://game-platform-wine-nine.vercel.app';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  res.setHeader('Vary', 'Origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.headers.origin === ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  return res.status(200).json({
    schema_version: 'authority-game-platform-link-v1',
    linked: true,
    product: {
      id: 'GAME-PLATFORM',
      name: 'Game Platform',
      evidence_level: 'E2',
      publication_status: 'published',
      evidence_url: 'https://authority-engine-app.vercel.app/game-platform',
      product_url: ALLOWED_ORIGIN,
      source_repository: 'AndrewLamSingapore/game-platform'
    },
    authority: {
      service: 'authority-engine',
      revision: process.env.VERCEL_GIT_COMMIT_SHA || null
    },
    boundary: {
      mode: 'read-only-evidence',
      operational_dependency: false,
      accepts_campaign_data: false,
      accepts_personal_data: false,
      accepts_secrets: false,
      permits_mutation: false,
      permits_approval: false,
      statement: 'Authority Engine publishes evidence only. Game Platform remains authoritative for its own runtime and state.'
    }
  });
}
