import { draftFromCandidate } from './_authority-policy.js';
import { authorityClient, authorized } from './_sanity.js';

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
    await client.patch(candidate._id).set({ status: 'draft_created', draftId: created._id, draftCreatedAt: new Date().toISOString() }).commit();
    return res.status(201).json({ candidate_id: candidate._id, draft_id: created._id, published: false });
  } catch (error) {
    console.error('portfolio publication error', error);
    return res.status(422).json({ error: error.message });
  }
}
