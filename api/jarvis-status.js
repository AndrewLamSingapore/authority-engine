const DEFAULT_PORTAL_HEALTH = 'https://the-portal-ten.vercel.app/api/health';

async function portalSignal(fetchImpl = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetchImpl(process.env.PORTAL_PUBLIC_HEALTH_URL || DEFAULT_PORTAL_HEALTH, {
      headers: { accept: 'application/json' }, signal: controller.signal,
    });
    if (!response.ok) return { state: 'unavailable', status: response.status, revision: null };
    const value = await response.json();
    return {
      state: value.ok ? 'ready' : 'degraded',
      revision: value.revision || null,
      relay: Boolean(value.portfolio_relay),
      outbox: {
        schema: Boolean(value.portfolio_outbox_schema),
        counts: value.portfolio_outbox?.counts || {},
        ready: Number(value.portfolio_outbox?.ready || 0),
        oldest_ready_age_seconds: value.portfolio_outbox?.oldest_ready_age_seconds ?? null,
      },
    };
  } catch {
    return { state: 'unavailable', revision: null };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const portal = await portalSignal();
  const expectedPortal = process.env.EXPECTED_PORTAL_REVISION || null;
  const primeSource = process.env.PRIME_SOURCE_REVISION || 'daeeb30b631954211d30d838821aaca5c72fe037';
  const primeRuntime = process.env.PRIME_RUNTIME_REVISION || '7633d9c';
  const drift = [];
  if (portal.state !== 'ready') drift.push({ component: 'portal', kind: 'availability', state: portal.state });
  if (expectedPortal && portal.revision && !portal.revision.startsWith(expectedPortal)) drift.push({ component: 'portal', kind: 'revision', expected: expectedPortal, actual: portal.revision });
  if (!primeSource.startsWith(primeRuntime) && !primeRuntime.startsWith(primeSource)) drift.push({ component: 'prime', kind: 'runtime_revision', expected: primeSource, actual: primeRuntime });
  return res.status(200).json({
    ok: true,
    generated_at: new Date().toISOString(),
    self: { state: 'ready', revision: process.env.VERCEL_GIT_COMMIT_SHA || null },
    portal,
    prime: {
      state: 'last_verified',
      source_revision: primeSource,
      runtime_revision: primeRuntime,
      accelerator: 'Intel Iris Xe / Vulkan',
      models: ['gemma3:1b', 'embeddinggemma:300m-qat-q4_0'],
      private_network_exposure: false,
      verified_at: process.env.PRIME_VERIFIED_AT || '2026-09-02T06:27:00Z',
    },
    drift: { state: drift.length ? 'attention' : 'aligned', items: drift },
    boundary: 'sanitized public operational metadata only',
  });
}

export { portalSignal };
