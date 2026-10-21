# Bounded decision-table experiment

This independent, local experiment compares a fixed leaf verdict with a two-bit table. It is not CORETEX source, a learned model, or a replacement for production policy. No production module imports it.

The 18-bit domain contains 262,144 states; two-bit outputs occupy exactly 65,536 bytes. Only seven bits are meaningful here. Eleven reserved bits deny, so the same function also fits a 32-byte table. Enlarging a small predicate to 64 KiB does not create intelligence or establish a useful compression ratio.

`kernel.test.mjs` exhaustively compares all 262,144 encoded states and separately checks 48 fixtures against the real assessment function. The finite-domain check proves that these implementations agree with this specification; it does not prove schema/privacy correctness for arbitrary input objects. Credentials, contract validation, PII scrubbing, reasons, provenance and reviewer authorization remain in the original production path.

Run on Node 22:

```
node --test experiments/deterministic-policy/kernel.test.mjs
node experiments/deterministic-policy/benchmark.mjs benchmark-results.json
```

Repeat the second command in fresh processes with separate output files. Results include input hashes, source/kernel identity, warmup, rotated method order, checksums, batch P50/P95/P99/variance, CPU time, memory and host/runtime metadata. Batch-average percentiles are not per-request tail latency. The unpacked access is an unchecked inner-loop control; checked public branch and packed methods perform input/layout validation. This difference is explicit and prevents treating the unchecked result as a complete service transaction.

No cache counters, cache residency, energy or GPU measurements are claimed. Normal host contention remains a limitation. A full real-policy baseline is reported separately because it does different work. There is no full-policy optimization acceptance or production cost-saving claim. Rollback: remove the experimental directory and its opt-in package scripts; production policy is unaffected.

A separate opt-in transport experiment uses the same synthetic authorized envelope through direct-object, direct-JSON, persistent local IPC and loopback HTTP/JSON paths:

```
node experiments/deterministic-policy/transport-benchmark.mjs transport-results.json
```

It reports actual request latency P50/P95/P99, throughput and CPU time at concurrency one and four. It uses synthetic authentication, no TLS and no real application/database work. Native ABI, gRPC, queues and cross-host security remain unmeasured. Results do not justify removing required service boundaries. All listeners close in `finally`.
