import { draftFromCandidate } from './_authority-policy.js';
import { authorityClient, authorized } from './_sanity.js';
import { authorityEvent, publishAuthorityEvent } from './_portfolio-relay.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  if (!authorized(req, process.env.AUTHORITY_PUBLICATION_TOKEN)) return res.status(401).json({ error: 'unauthorized' });
  try {
    const client = authorityClient();
    const candidate = await client.getDocument(String(req.body?.candidate_id || ''));
    const draft = draftFromCandidate(candidate, req.body);
    const created = await client.createOrReplace(draft);
    const changed = await client.patch(candidate._id).set({ status: 'draft_created', draftId: created._id, draftCreatedAt: new Date().toISOString() }).commit();
    let relay = { queued: false, reason: 'not_attempted' };
    try {
      relay = await publishAuthorityEvent(authorityEvent('authority.publication.draft_created', changed, { draft_id: created._id, published: false }));
    } catch (error) {
      console.error(JSON.stringify({ level: 'error', message: 'authority_relay_failed', operation: 'draft_creation', error: String(error?.message || error) }));
      relay = { queued: false, reason: 'relay_failed' };
    }
    return res.status(201).json({ candidate_id: candidate._id, draft_id: created._id, published: false, relay });
  } catch (error) {
    console.error(JSON.stringify({ level: 'error', message: 'portfolio_publication_failed', error: String(error?.message || error) }));
    return res.status(422).json({ error: error.message });
  }
}
