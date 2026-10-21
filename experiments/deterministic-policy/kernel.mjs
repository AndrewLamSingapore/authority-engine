// Experimental leaf verdict only. Never imports or replaces the production policy.
export const STATE_COUNT = 2 ** 18;
export const VERDICT = Object.freeze({ REJECTED: 0, QUARANTINED: 1, PENDING_REVIEW: 2 });
export function assertState(state) {
  if (!Number.isInteger(state) || state < 0 || state >= STATE_COUNT) throw new RangeError('Expected an unsigned 18-bit state');
}
// Bits 0..2: E0..E5; 3: self source; 4: provenance; 5: credentials; 6: contract valid.
// Bits 7..17 are reserved and MUST be zero. E6/E7 are invalid, never compressed away.
export function branchVerdict(state) {
  assertState(state);
  const maturity = state & 7;
  if (state >>> 7 || maturity > 5 || !(state & 64) || state & 8 || state & 32) return VERDICT.REJECTED;
  if (maturity >= 2 && !(state & 16)) return VERDICT.REJECTED;
  return maturity >= 2 ? VERDICT.PENDING_REVIEW : VERDICT.QUARANTINED;
}
export function compileTable(bits = 18) {
  if (bits !== 7 && bits !== 18) throw new RangeError('Only the explicit 7-bit and 18-bit domains are supported');
  const bytes = new Uint8Array(2 ** bits / 4);
  for (let state = 0; state < 2 ** bits; state++) bytes[state >>> 2] |= branchVerdict(state) << ((state & 3) * 2);
  return bytes;
}
export function packedVerdict(bytes, state) {
  assertState(state);
  if (!(bytes instanceof Uint8Array) || bytes.length !== STATE_COUNT / 4) throw new TypeError('Expected the complete 64 KiB table');
  return (bytes[state >>> 2] >>> ((state & 3) * 2)) & 3;
}
export function compactVerdict(bytes, state) {
  assertState(state);
  if (!(bytes instanceof Uint8Array) || bytes.length !== 32) throw new TypeError('Expected the explicit 32-byte table');
  if (state >>> 7) return VERDICT.REJECTED;
  return (bytes[state >>> 2] >>> ((state & 3) * 2)) & 3;
}
