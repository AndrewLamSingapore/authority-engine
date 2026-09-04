const ALLOWED_EVENT_FIELDS = new Set(['trace_id','timestamp','agent_id','stage','status','sequence']);
const SUMMARY_FIELDS = new Set(['registered_agents','active_agents','executions_today','withheld_executions_today','denied_handoffs_today','average_latency_ms','active_window_seconds']);
const GATE_METRICS = new Set(['source_coverage','supported_claims','contradiction_resistance','uncertainty_calibration','required_evidence','policy_conformance','task_success']);
const GATE_DECISIONS = new Set(['released','withheld']);
const DEFAULT_TRACE_SOURCE = 'https://bksyjvppcwfgwoelnyvp.supabase.co/functions/v1/jarvis-trace-relay';
const ALLOWED_STATES = new Set(['verified_events','connected_idle','stale','disabled','no_public_trace']);

function sanitizeGate(value) {
  if (!value || typeof value !== 'object') return null;
  const decision = typeof value.decision === 'string' && GATE_DECISIONS.has(value.decision) ? value.decision : null;
  const score = typeof value.score === 'number' && Number.isFinite(value.score) ? Math.max(0, Math.min(1, value.score)) : null;
  if (!decision || score === null) return null;
  const blocking = Array.isArray(value.blocking_metrics)
    ? [...new Set(value.blocking_metrics.filter(item => typeof item === 'string' && GATE_METRICS.has(item)))].sort().slice(0, 7)
    : [];
  const boundedCount = raw => typeof raw === 'number' && Number.isFinite(raw) ? Math.max(0, Math.min(999, Math.trunc(raw))) : 0;
  const rawVersion = typeof value.evaluation_version === 'string' ? value.evaluation_version.trim() : 'unknown';
  return {
    decision,
    score: Math.round(score * 10000) / 10000,
    blocking_metrics: blocking,
    evidence_gap_count: boundedCount(value.evidence_gap_count),
    unsupported_claim_count: boundedCount(value.unsupported_claim_count),
    contradiction_count: boundedCount(value.contradiction_count),
    evaluator_valid: value.evaluator_valid === true,
    evaluation_version: /^[A-Za-z0-9._-]{1,24}$/.test(rawVersion) ? rawVersion : 'unknown',
  };
}

function sanitizeEvent(value) {
  if (!value || typeof value !== 'object') return null;
  const out = {};
  for (const [key, val] of Object.entries(value)) {
    if (ALLOWED_EVENT_FIELDS.has(key) && ['string','number'].includes(typeof val)) out[key] = val;
  }
  if (!out.trace_id || !out.timestamp || !out.agent_id || !out.stage || !out.status) return null;
  const gate = sanitizeGate(value.gate);
  if (gate) out.gate = gate;
  return out;
}

function sanitizeSummary(value) {
  const defaults = {
    registered_agents: 29,
    active_agents: 0,
    executions_today: 0,
    withheld_executions_today: 0,
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
    let state = ALLOWED_STATES.has(body.state) ? body.state : 'no_public_trace';
    if (events.length && state !== 'stale') state = 'verified_events';
    if (!events.length && state === 'verified_events') state = body.source_generated_at ? 'connected_idle' : 'no_public_trace';
    return res.status(200).json({
      ok: true,
      state,
      generated_at: new Date().toISOString(),
      source_generated_at: typeof body.source_generated_at === 'string' ? body.source_generated_at : null,
      summary,
      events,
      boundary: 'sanitized runtime authority and aggregate release-gate metadata only; no prompts, results, rationale, claim text, evidence text, credentials or private endpoints',
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

export { sanitizeEvent, sanitizeGate, sanitizeSummary, ALLOWED_EVENT_FIELDS, SUMMARY_FIELDS, GATE_METRICS, DEFAULT_TRACE_SOURCE, ALLOWED_STATES };
