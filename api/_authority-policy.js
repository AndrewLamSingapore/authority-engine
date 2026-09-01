import { createHash } from 'node:crypto';
import { validatePortfolioEvent } from './generated/portfolio-contracts.js';

const MATURITY = Object.freeze({ E0: 0, E1: 1, E2: 2, E3: 3, E4: 4, E5: 5 });
const REDACT_KEYS = /(^|_)(account|user|customer|email|phone|address|tank|device|ip|coordinates?|latitude|longitude)(_?id)?$/i;
const REJECT_KEYS = /(^|_)(password|passwd|secret|token|api_?key|private_?key|credential|authorization)$/i;
const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE = /(?<!\d)(?:\+?\d[\s().-]*){8,15}(?!\d)/g;

function scrub(value, path = '', redactions = [], rejected = []) {
  if (Array.isArray(value)) return value.map((item, index) => scrub(item, `${path}/${index}`, redactions, rejected));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => {
      const childPath = `${path}/${key}`;
      if (REJECT_KEYS.test(key)) { rejected.push(childPath); return [key, '[REJECTED_CREDENTIAL]']; }
      if (REDACT_KEYS.test(key)) { redactions.push(childPath); return [key, '[REDACTED]']; }
      return [key, scrub(child, childPath, redactions, rejected)];
    }));
  }
  if (typeof value !== 'string') return value;
  if (!path.startsWith('/payload')) return value;
  let result = value.replace(EMAIL, () => { redactions.push(path); return '[REDACTED_EMAIL]'; });
  result = result.replace(PHONE, () => { redactions.push(path); return '[REDACTED_PHONE]'; });
  return result;
}

export function assessPortfolioEvent(input) {
  const validation = validatePortfolioEvent(input);
  if (!validation.valid) return { accepted: false, status: 'rejected', reasons: ['contract_invalid'], validation_errors: validation.errors };

  const redactions = [];
  const rejected = [];
  const event = scrub(structuredClone(input), '', redactions, rejected);
  const maturity = MATURITY[event.evidence_level] ?? -1;
  const provenance = Array.isArray(event.provenance) ? event.provenance.filter(Boolean) : [];
  const reasons = [];
  if (event.source === 'authority-engine') reasons.push('self_publication_prohibited');
  if (rejected.length) reasons.push('credential_material_prohibited');
  if (maturity >= MATURITY.E2 && !provenance.length) reasons.push('provenance_required');
  const accepted = reasons.length === 0;
  const reviewable = accepted && maturity >= MATURITY.E2;
  return {
    accepted,
    status: accepted ? (reviewable ? 'pending_review' : 'quarantined') : 'rejected',
    reasons: accepted && !reviewable ? ['evidence_below_publication_threshold'] : reasons,
    reviewable,
    publishable: reviewable,
    evidence_maturity: maturity,
    minimum_publication_evidence: 'E2',
    redactions: [...new Set(redactions)],
    rejected_paths: rejected,
    event,
  };
}

export function candidateId(eventId) {
  return `portfolio-evidence-${createHash('sha256').update(String(eventId)).digest('hex').slice(0, 32)}`;
}

export function decideCandidate(candidate, decision, reviewerNotes = '') {
  if (!candidate || candidate._type !== 'portfolioEvidenceCandidate') throw new Error('Candidate not found.');
  if (!['approve', 'reject'].includes(decision)) throw new Error('Decision must be approve or reject.');
  if (decision === 'approve' && !candidate.reviewable) throw new Error('Evidence below E2 cannot be approved for a public draft.');
  return {
    status: decision === 'approve' ? 'approved_for_draft' : 'rejected',
    reviewerNotes: String(reviewerNotes).slice(0, 4000),
    reviewedAt: new Date().toISOString(),
  };
}

export function draftFromCandidate(candidate, input = {}) {
  if (candidate?.status !== 'approved_for_draft') throw new Error('Candidate requires an explicit approval before draft creation.');
  const event = candidate.event || JSON.parse(candidate.eventJson);
  const title = String(input.title || `${event.event_type}: evidence review`).trim().slice(0, 160);
  const slug = String(input.slug || `${event.event_type}-${event.event_id}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 96);
  return {
    _id: `drafts.${candidate._id.replace('portfolio-evidence-', 'portfolio-evidence-post-')}`,
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    category: String(input.category || 'Building in Public'),
    excerpt: String(input.excerpt || `${event.evidence_level} evidence candidate from ${event.source}; requires editorial verification before publication.`).slice(0, 500),
    content: JSON.stringify({ evidence_boundary: event.evidence_level, provenance: event.provenance, event: event.payload }, null, 2),
    keyTakeaways: [
      `Evidence maturity: ${event.evidence_level}`,
      `Source: ${event.source}`,
      'This is an unpublished draft and must not be treated as a verified production claim.',
    ],
  };
}
