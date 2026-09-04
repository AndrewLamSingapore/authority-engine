const ALLOWED_EVENT_FIELDS = new Set(['trace_id','timestamp','agent_id','stage','status','sequence']);
const SUMMARY_FIELDS = new Set(['registered_agents','active_agents','executions_today','denied_handoffs_today','average_latency_ms','active_window_seconds']);
const DEFAULT_TRACE_SOURCE = 'https://bksyjvppcwfgwoelnyvp.supabase.co/functions/v1/jarvis-trace-relay';

function sanitizeEvent(value) {
  if (!value || typeof value !== 'object') return null;
  const out = {};
  for (const [key, val] of Object.entries(value)) {
    if (ALLOWED_EVENT_FIELDS.has(key) && ['string','number'].includes(typeof val)) out[key] = val;
  }
  if (!out.trace_id || !out.timestamp || !out.agent_id || !out.stage || !out.status) return null;
  return out;
}

function sanitizeSummary(value) {
  const defaults = {
    registered_agents: 29,
    active_agents: 0,
    executions_today: 0,
    denied_handoffs_today: 0,
    average_latency_ms: null,
    active_window_seconds: 300,
  };
  if (!value || typeof value !== 'object') return defaults;
  const out = { ...defaults };
  for (const key of SUMMARY_FIELDS) {
    const val = value[key];
    if (val === null && key === 'average_latency_ms') { out[key] = null; continue; }
    if (typeof val !== 'number' || !Number.isFinite(val)) continue;
    if (key === 'registered_agents') out[key] = Math.max(0, Math.min(29, Math.trunc(val)));
    else if (key === 'active_agents') out[key] = Math.max(0, Math.min(29, Math.trunc(val)));
    else if (key === 'active_window_seconds') out[key] = Math.max(1, Math.min(3600, Math.trunc(val)));
    else out[key] = Math.max(0, val);
  }
  return out;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const emptySummary = sanitizeSummary(null);
  const source = process.env.JARVIS_PUBLIC_TRACE_URL || DEFAULT_TRACE_SOURCE;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch(source, { headers: { accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error(`trace source ${response.status}`);
    const body = await response.json();
    const events = Array.isArray(body.events) ? body.events.map(sanitizeEvent).filter(Boolean).slice(-100) : [];
    const summary = sanitizeSummary(body.summary);
    const state = events.length
      ? (body.state === 'stale' ? 'stale' : 'verified_events')
      : body.state === 'disabled' ? 'disabled' : body.state === 'stale' ? 'stale' : 'no_public_trace';
    return res.status(200).json({
      ok: true,
      state,
      generated_at: new Date().toISOString(),
      source_generated_at: typeof body.source_generated_at === 'string' ? body.source_generated_at : null,
      summary,
      events,
      boundary: 'sanitized runtime authority metadata only; no prompts, results, credentials or private endpoints',
    });
  } catch {
    return res.status(200).json({
      ok: true,
      state: 'source_unavailable',
      generated_at: new Date().toISOString(),
      source_generated_at: null,
      summary: emptySummary,
      events: [],
      boundary: 'Trace source unavailable; no synthetic events substituted.',
    });
  } finally {
    clearTimeout(timer);
  }
}

export { sanitizeEvent, sanitizeSummary, ALLOWED_EVENT_FIELDS, SUMMARY_FIELDS, DEFAULT_TRACE_SOURCE };
