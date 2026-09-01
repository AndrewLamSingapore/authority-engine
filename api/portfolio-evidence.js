import { assessPortfolioEvent, candidateId, decideCandidate } from './_authority-policy.js';
import { authorityClient, authorized } from './_sanity.js';

function deny(res) { return res.status(401).json({ error: 'unauthorized' }); }

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  try {
    if (req.method === 'POST') {
      if (!authorized(req, process.env.PORTFOLIO_INGESTION_TOKEN)) return deny(res);
      const client = authorityClient();
      const assessment = assessPortfolioEvent(req.body);
      if (!assessment.accepted) return res.status(422).json(assessment);
      const id = candidateId(assessment.event.event_id);
      const candidate = await client.createIfNotExists({
        _id: id,
        _type: 'portfolioEvidenceCandidate',
        eventId: assessment.event.event_id,
        eventType: assessment.event.event_type,
        source: assessment.event.source,
        evidenceLevel: assessment.event.evidence_level,
        status: assessment.status,
        reviewable: assessment.reviewable,
        redactions: assessment.redactions,
        policyReasons: assessment.reasons,
        eventJson: JSON.stringify(assessment.event),
        receivedAt: new Date().toISOString(),
      });
      if (candidate.eventJson !== JSON.stringify(assessment.event)) return res.status(409).json({ error: 'event_id_conflict', candidate_id: candidate._id });
      return res.status(assessment.status === 'pending_review' ? 202 : 200).json({ accepted: true, candidate_id: candidate._id, status: candidate.status });
    }
    if (req.method === 'GET') {
      if (!authorized(req, process.env.AUTHORITY_REVIEW_TOKEN)) return deny(res);
      const client = authorityClient();
      const status = typeof req.query.status === 'string' ? req.query.status : 'pending_review';
      const candidates = await client.fetch('*[_type == "portfolioEvidenceCandidate" && status == $status] | order(receivedAt asc)[0...100]', { status });
      return res.status(200).json({ candidates });
    }
    if (req.method === 'PATCH') {
      if (!authorized(req, process.env.AUTHORITY_REVIEW_TOKEN)) return deny(res);
      const client = authorityClient();
      const id = String(req.body?.candidate_id || '');
      const candidate = await client.getDocument(id);
      const update = decideCandidate(candidate, req.body?.decision, req.body?.reviewer_notes);
      const changed = await client.patch(id).set(update).commit();
      return res.status(200).json({ candidate_id: changed._id, status: changed.status });
    }
    res.setHeader('Allow', 'GET, POST, PATCH');
    return res.status(405).json({ error: 'method_not_allowed' });
  } catch (error) {
    console.error('portfolio evidence error', error);
    const status = /not configured/i.test(error.message) ? 503 : /not found|decision|approved/i.test(error.message) ? 422 : 500;
    return res.status(status).json({ error: status === 500 ? 'authority_evidence_failure' : error.message });
  }
}
