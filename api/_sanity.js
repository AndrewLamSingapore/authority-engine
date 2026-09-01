import { createClient } from '@sanity/client';

export function authorityClient() {
  const token = String(process.env.SANITY_WRITE_TOKEN || '').trim();
  if (!token) throw new Error('SANITY_WRITE_TOKEN is not configured.');
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID || 'h3pl1rfx',
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: '2026-09-01',
    useCdn: false,
    token,
  });
}

export function bearer(req) {
  return String(req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
}

export function authorized(req, expected) {
  const configured = String(expected || '').trim();
  const supplied = bearer(req);
  if (!configured || !supplied || configured.length !== supplied.length) return false;
  let mismatch = 0;
  for (let index = 0; index < configured.length; index += 1) mismatch |= configured.charCodeAt(index) ^ supplied.charCodeAt(index);
  return mismatch === 0;
}
