import { createHash } from 'node:crypto';
import { assertContract } from './generated/portfolio-contracts.js';

export function authorityEvent(eventType, candidate, payload = {}) {
  const identity = `${eventType}:${candidate?._id || 'unknown'}:${candidate?.status || payload.status || 'unknown'}`;
  const eventId = `authority-${createHash('sha256').update(identity).digest('hex').slice(0, 32)}`;
  return assertContract('portfolio-event-v1', {
    schema_version: '1.0.0',
    event_id: eventId,
    event_type: eventType,
    source: 'authority-engine',
    occurred_at: new Date().toISOString(),
    correlation_id: candidate?.eventId || eventId,
    subject_id: candidate?._id || null,
    evidence_level: candidate?.evidenceLevel || 'E1',
    provenance: [`authority-engine:${candidate?._id || eventId}`],
    payload: { candidate_id: candidate?._id || null, status: candidate?.status || payload.status || null, ...payload },
  });
}

export async function publishAuthorityEvent(event, { fetchImpl = fetch } = {}) {
  const url = String(process.env.PORTFOLIO_RELAY_URL || '').trim();
  const token = String(process.env.PORTFOLIO_RELAY_TOKEN || '').trim();
  if (!url || !token) return { queued: false, reason: 'portfolio_relay_not_configured' };
  const response = await fetchImpl(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ action: 'publish', event }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`portfolio relay failed: ${response.status}`);
  return { queued: true, response: await response.json() };
}
