import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { writeFileSync, readFileSync } from 'node:fs';
import os from 'node:os';
import { performance } from 'node:perf_hooks';
import { execFileSync } from 'node:child_process';
import { assessPortfolioEvent } from '../../api/_authority-policy.js';
import { branchVerdict, compileTable, compactVerdict, packedVerdict, STATE_COUNT } from './kernel.mjs';
const warmup = 5, samples = 41, count = STATE_COUNT;
const generationStart = performance.now();
const packed = compileTable(), compact = compileTable(7);
const generationMs = performance.now() - generationStart;
const unpacked = Uint8Array.from({ length: STATE_COUNT }, (_, state) => branchVerdict(state));
const hash = value => createHash('sha256').update(value).digest('hex');
let seed = 0x48ab21;
const random = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return seed >>> 0; };
const cases = {
  sequential_18bit: Uint32Array.from({ length: count }, (_, i) => i),
  random_18bit: Uint32Array.from({ length: count }, () => random() & (STATE_COUNT - 1)),
  random_7bit: Uint32Array.from({ length: count }, () => random() & 127),
  hot_fixture: Uint32Array.from({ length: count }, () => [82, 83, 64, 65, 74, 114, 2][random() % 7]),
};
const methods = {
  branch: branchVerdict,
  packed_64k: state => packedVerdict(packed, state),
  packed_32b: state => compactVerdict(compact, state),
  unpacked_256k: state => unpacked[state],
};
const stats = values => {
  const sorted = [...values].sort((a,b) => a-b), mean = values.reduce((a,b) => a+b,0)/values.length;
  const q = p => sorted[Math.ceil(p * sorted.length)-1];
  return { p50: q(.5), p95: q(.95), p99: q(.99), mean, stddev: Math.sqrt(values.reduce((v,n) => v + (n-mean)**2,0)/values.length), min: sorted[0], max: sorted.at(-1) };
};
const results = []; let sink = 0;
for (const [distribution, input] of Object.entries(cases)) {
  const expected = input.reduce((sum,state) => sum + branchVerdict(state),0);
  // Rotate measured methods by round to limit fixed-order/JIT/thermal bias.
  const timings = Object.fromEntries(Object.keys(methods).map(name => [name, []]));
  const cpu = Object.fromEntries(Object.keys(methods).map(name => [name, 0]));
  const names = Object.keys(methods);
  for (let round = -warmup; round < samples; round++) for (let offset = 0; offset < names.length; offset++) {
    const name = names[(offset + round + warmup) % names.length], fn = methods[name];
    const cpuBefore = process.cpuUsage(), started = performance.now(); let checksum = 0;
    for (let i = 0; i < input.length; i++) checksum += fn(input[i]);
    const elapsed = performance.now() - started, used = process.cpuUsage(cpuBefore);
    assert.equal(checksum, expected); sink = (sink + checksum) >>> 0;
    if (round >= 0) { timings[name].push(elapsed * 1e6 / count); cpu[name] += used.user + used.system; }
  }
  for (const name of names) {
    const timing = stats(timings[name]);
    results.push({ distribution, method: name, unit: 'nanoseconds per leaf verdict averaged over a complete batch; percentiles are across batch averages', timing, decisions_per_second_at_p50: 1e9/timing.p50, process_cpu_microseconds: cpu[name], checksum: expected, input_sha256: hash(Buffer.from(input.buffer)) });
  }
}
const event = { schema_version: '1.0.0', event_id: 'kernel-fixture-0001', event_type: 'game.simulation.completed', source: 'game-platform', occurred_at: '2026-10-21T00:00:00.000Z', correlation_id: 'bounded-fixture', evidence_level: 'E2', provenance: ['fixture:1'], payload: { summary: 'bounded simulation', account_id: 'fixture-private' } };
const full = [];
for (let round = -warmup; round < samples; round++) {
  const started = performance.now();
  for (let i = 0; i < 128; i++) { const result = assessPortfolioEvent(event); assert.equal(result.status,'pending_review'); sink += result.event.payload.account_id.length; }
  if (round >= 0) full.push((performance.now()-started)*1000/128);
}
const report = { generated_at: new Date().toISOString(), classification: 'EXPERIMENT ONLY; no production replacement accepted', baseline_commit: '77ca821cbbb3ace0b5db86bf22feabe4cbb2640f', source_commit: execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(), kernel_sha256: hash(readFileSync(new URL('./kernel.mjs',import.meta.url))), benchmark_sha256: hash(readFileSync(new URL('./benchmark.mjs',import.meta.url))), production_policy_sha256: hash(readFileSync(new URL('../../api/_authority-policy.js',import.meta.url))), working_tree_status: execFileSync('git',['status','--porcelain'],{encoding:'utf8'}).trim(), hardware: { cpu: os.cpus()[0]?.model, logical_cpus: os.cpus().length, total_memory_bytes: os.totalmem(), platform: os.platform(), os_release: os.release(), arch: os.arch() }, runtime: process.versions, method: { warmup_batches: warmup, measured_batches: samples, decisions_per_batch: count, seed: '0x48ab21 xorshift32', concurrency: 1, other_host_workloads: 'not isolated; normal Windows host and project tests may contend', counters: 'cache misses, cache residency, GPU utilization, energy, TDP and system power NOT MEASURED', arithmetic_scope: 'integer bounded verdict; no neural inference, cryptographic mining or medical inference' }, table: { states: STATE_COUNT, bits_per_output: 2, bytes: packed.byteLength, compact_bytes: compact.byteLength, unpacked_bytes: unpacked.byteLength, generation_ms_including_compact: generationMs, sha256: hash(packed), reserved_bits: '7..17 deny; only 128 semantic combinations needed' }, results, full_policy_baseline: { unit: 'microseconds per assessment, batch averages', timing: stats(full), note: 'Includes schema validation, clone, credential/PII traversal, reasons and allocation; incomparable work to leaf lookup. No optimized full-policy candidate.' }, memory: process.memoryUsage(), sink };
const output = process.argv[2];
if (output) writeFileSync(output, JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({ output: output || null, table_bytes: packed.byteLength, generation_ms: generationMs, results: results.map(x => ({ distribution: x.distribution, method: x.method, p50_ns: x.timing.p50 })), full_policy_p50_us: report.full_policy_baseline.timing.p50, classification: report.classification }));
