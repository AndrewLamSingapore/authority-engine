const ALLOWED_EVENT_FIELDS = new Set(['trace_id','timestamp','agent_id','stage','status','sequence']);
const SUMMARY_FIELDS = new Set(['registered_agents','active_agents','executions_today','withheld_executions_today','denied_handoffs_today','average_latency_ms','active_window_seconds']);
const PROOF_FIELDS = new Set(['prime_commit','schema_version','external_action']);
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
  return { decision, score: Math.round(score * 10000) / 10000, blocking_metrics: blocking, evidence_gap_count: boundedCount(value.evidence_gap_count), unsupported_claim_count: boundedCount(value.unsupported_claim_count), contradiction_count: boundedCount(value.contradiction_count), evaluator_valid: value.evaluator_valid === true, evaluation_version: /^[A-Za-z0-9._-]{1,24}$/.test(rawVersion) ? rawVersion : 'unknown' };
}

function sanitizeProof(value) {
  if (!value || typeof value !== 'object') return null;
  const out = {};
  if (typeof value.prime_commit === 'string' && /^[a-f0-9]{7,40}$/i.test(value.prime_commit)) out.prime_commit = value.prime_commit.toLowerCase();
  if (typeof value.schema_version === 'string' && /^[A-Za-z0-9._-]{1,24}$/.test(value.schema_version.trim())) out.schema_version = value.schema_version.trim();
  if (typeof value.external_action === 'boolean') out.external_action = value.external_action;
  return Object.keys(out).length ? out : null;
}

function sanitizeEvent(value) {
  if (!value || typeof value !== 'object') return null;
  const out = {};
  for (const [key, val] of Object.entries(value)) if (ALLOWED_EVENT_FIELDS.has(key) && ['string','number'].includes(typeof val)) out[key] = val;
  if (!out.trace_id || !out.timestamp || !out.agent_id || !out.stage || !out.status) return null;
  const gate = sanitizeGate(value.gate); if (gate) out.gate = gate;
  const proof = sanitizeProof(value.proof); if (proof) out.proof = proof;
  return out;
}

function sanitizeSummary(value) {
  const defaults = { registered_agents:21, active_agents:null, executions_today:null, withheld_executions_today:null, denied_handoffs_today:null, average_latency_ms:null, active_window_seconds:300 };
  if (!value || typeof value !== 'object') return defaults;
  const out = { ...defaults };
  for (const key of SUMMARY_FIELDS) {
    if (key === 'registered_agents') continue; // Public registry is the canonical 21-role design.
    const val = value[key];
    if (val === null && key === 'average_latency_ms') { out[key] = null; continue; }
    if (typeof val !== 'number' || !Number.isFinite(val)) continue;
    if (key === 'registered_agents' || key === 'active_agents') out[key] = Math.max(0, Math.min(21, Math.trunc(val)));
    else if (key === 'active_window_seconds') out[key] = Math.max(1, Math.min(3600, Math.trunc(val)));
    else out[key] = Math.max(0, val);
  }
  return out;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'GET') { res.setHeader('Allow','GET'); return res.status(405).json({ error:'Method not allowed.' }); }
  const emptySummary = sanitizeSummary(null); const source = process.env.JARVIS_PUBLIC_TRACE_URL || DEFAULT_TRACE_SOURCE;
  const controller = new AbortController(); const timer = setTimeout(()=>controller.abort(),4000);
  try {
    const response = await fetch(source,{headers:{accept:'application/json'},signal:controller.signal});
    if(!response.ok) throw new Error(`trace source ${response.status}`);
    const body = await response.json();
    const events = Array.isArray(body.events) ? body.events.map(sanitizeEvent).filter(Boolean).slice(-100) : [];
    const observation = classifyTrace(body);
    return res.status(200).json({ ok:true, ...observation, generated_at:new Date().toISOString(), summary:emptySummary, events, boundary:'Reported relay metadata only; current ABEX runtime and activity are unverified. Historical events do not establish current execution.' });
  } catch {
    return res.status(200).json({ ok:true,state:'source_unavailable',generated_at:new Date().toISOString(),source_generated_at:null,summary:emptySummary,events:[],boundary:'Trace source unavailable; no synthetic events substituted.' });
  } finally { clearTimeout(timer); }
}

function classifyTrace(body, now = Date.now()) {
  const raw = typeof body.source_generated_at === 'string' ? body.source_generated_at : null;
  const timestamp = raw ? Date.parse(raw) : NaN;
  const fresh = Number.isFinite(timestamp) && timestamp <= now + 30000 && now - timestamp <= 300000;
  return { state: fresh ? 'unverified_source' : 'stale', source_generated_at: Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : null, runtime_acceptance: 'unverified' };
}

export { classifyTrace, sanitizeEvent, sanitizeGate, sanitizeProof, sanitizeSummary, ALLOWED_EVENT_FIELDS, SUMMARY_FIELDS, PROOF_FIELDS, GATE_METRICS, DEFAULT_TRACE_SOURCE, ALLOWED_STATES };
