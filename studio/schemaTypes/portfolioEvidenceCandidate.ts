import { defineField, defineType } from 'sanity'

export const portfolioEvidenceCandidate = defineType({
  name: 'portfolioEvidenceCandidate',
  title: 'Portfolio evidence candidate',
  type: 'document',
  fields: [
    defineField({ name: 'eventId', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'eventType', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'source', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'evidenceLevel', type: 'string', options: { list: ['E0','E1','E2','E3','E4','E5'] } }),
    defineField({ name: 'status', type: 'string', options: { list: ['quarantined','pending_review','approved_for_draft','rejected','draft_created'] }, validation: Rule => Rule.required() }),
    defineField({ name: 'reviewable', type: 'boolean', readOnly: true }),
    defineField({ name: 'redactions', type: 'array', of: [{ type: 'string' }], readOnly: true }),
    defineField({ name: 'policyReasons', type: 'array', of: [{ type: 'string' }], readOnly: true }),
    defineField({ name: 'eventJson', title: 'Redacted canonical event', type: 'text', rows: 16, readOnly: true }),
    defineField({ name: 'receivedAt', type: 'datetime', readOnly: true }),
    defineField({ name: 'reviewerNotes', type: 'text' }),
    defineField({ name: 'reviewedAt', type: 'datetime', readOnly: true }),
    defineField({ name: 'draftId', type: 'string', readOnly: true }),
    defineField({ name: 'draftCreatedAt', type: 'datetime', readOnly: true }),
  ],
  preview: { select: { title: 'eventType', subtitle: 'status' } },
})
