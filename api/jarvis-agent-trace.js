const ALLOWED_EVENT_FIELDS = new Set(['trace_id','timestamp','agent_id','stage','status','sequence']);

function sanitizeEvent(value) {
  if (!value || typeof value !== 'object') return null;
  const out = {};
  for (const [key, val] of Object.entries(value)) {
    if (ALLOWED_EVENT_FIELDS.has(key) && ['string','number'].includes(typeof val)) out[key] = val;
  }
  if (!out.trace_id || !out.timestamp || !out.agent_id || !out.stage || !out.status) return null;
  return out;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const source = process.env.JARVIS_PUBLIC_TRACE_URL;
  if (!source) {
    return res.status(200).json({
      ok: true,
      state: 'no_public_trace',
      generated_at: new Date().toISOString(),
      events: [],
      boundary: 'No execution trace is published unless PRIME emits sanitized events through an explicitly configured public trace relay.',
    });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(source, { headers: { accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error(`trace source ${response.status}`);
    const body = await response.json();
    const events = Array.isArray(body.events) ? body.events.map(sanitizeEvent).filter(Boolean).slice(-100) : [];
    return res.status(200).json({ ok: true, state: events.length ? 'verified_events' : 'no_public_trace', generated_at: new Date().toISOString(), events, boundary: 'sanitized execution metadata only' });
  } catch {
    return res.status(200).json({ ok: true, state: 'source_unavailable', generated_at: new Date().toISOString(), events: [], boundary: 'trace source unavailable; no synthetic events substituted' });
  } finally {
    clearTimeout(timer);
  }
}

export { sanitizeEvent, ALLOWED_EVENT_FIELDS };
