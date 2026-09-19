import { createHash } from 'node:crypto';
import { assertContract } from './generated/portfolio-contracts.js';

const DEFAULT_RELAY_TIMEOUT_MS = 10_000;

function normalizePortfolioEvent(event, candidate, payload = {}) {
  const base = event && typeof event === 'object' ? event : {};
  const inputPayload = base.payload && typeof base.payload === 'object' ? base.payload : {};
  const nextPayload = { ...inputPayload, ...payload };

  if (candidate && typeof candidate === 'object') {
    if (candidate._id && nextPayload.candidate_id === undefined) nextPayload.candidate_id = candidate._id;
    if (candidate.status && nextPayload.status === undefined) nextPayload.status = candidate.status;
  }

  return {
    ...base,
    schema_version: base.schema_version || '1.0.0',
    source: base.source || 'authority-engine',
    payload: nextPayload,
  };
}

export function authorityEvent(eventType, candidate, payload = {}) {
  const candidateMeta = candidate && typeof candidate === 'object' ? candidate : {};
  const identity = `${eventType}:${candidateMeta._id || 'unknown'}:${candidateMeta.status || payload?.status || 'unknown'}`;
  const eventId = `authority-${createHash('sha256').update(identity).digest('hex').slice(0, 32)}`;

  return assertContract('portfolio-event-v1', normalizePortfolioEvent({
    schema_version: '1.0.0',
    event_id: eventId,
    event_type: eventType,
    source: 'authority-engine',
    occurred_at: new Date().toISOString(),
    correlation_id: candidateMeta.eventId || eventId,
    subject_id: candidateMeta._id || null,
    evidence_level: candidateMeta.evidenceLevel || 'E1',
    provenance: [`authority-engine:${candidateMeta._id || eventId}`],
    payload: {
      candidate_id: candidateMeta._id || null,
      status: candidateMeta.status || payload?.status || null,
      ...payload,
    },
  }, candidateMeta, payload));
}

export async function publishAuthorityEvent(
  event,
  { fetchImpl = fetch, timeoutMs = DEFAULT_RELAY_TIMEOUT_MS } = {},
) {
  const safeEvent = event && typeof event === 'object' ? normalizePortfolioEvent(event, event, {}) : {};
  const url = String(process.env.PORTFOLIO_RELAY_URL || '').trim();
  const token = String(process.env.PORTFOLIO_RELAY_TOKEN || '').trim();

  if (!url || !token) return { queued: false, reason: 'portfolio_relay_not_configured' };

  const response = await fetchImpl(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ action: 'publish', event: safeEvent }),
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) throw new Error(`portfolio relay failed: ${response.status}`);
  return { queued: true, response: await response.json() };
}
