> Portfolio status: [STATUS.md](https://github.com/AndrewLamSingapore/orqevia/blob/main/STATUS.md) is the sole portfolio status reference. Each product owns its source, configuration, contracts and domain records. The [operational manifest](https://github.com/AndrewLamSingapore/orqevia/blob/main/governance/operational-manifest.json) provides dated ORQEVIA component and observation references; it does not establish deployment status.

# Verified portfolio evidence ingestion

Staged runtime design: validate Portfolio Event v1 -> reject protected/private payloads -> enforce event-family allowlist -> enforce minimum evidence maturity per public claim -> preserve provenance -> deduplicate event_id -> create reviewable evidence candidate -> explicit publication decision.

Implementation modules to land after repository privacy change: event validator, privacy/redaction gate, evidence maturity policy, idempotent candidate store, review API/UI, publication adapter, tests for downgrade/no-upgrade and protected-data rejection. Receipt of an event never publishes it.
