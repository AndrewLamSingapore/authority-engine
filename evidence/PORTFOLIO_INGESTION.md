> Portfolio status: [STATUS.md](https://github.com/AndrewLamSingapore/orqevia/blob/main/STATUS.md) is the sole portfolio status reference. Each product owns its source, configuration, contracts and domain records. The [operational manifest](https://github.com/AndrewLamSingapore/orqevia/blob/main/governance/operational-manifest.json) provides dated ORQEVIA component and observation references; it does not establish deployment status.

# Portfolio evidence ingestion boundary

Authority Engine is the public PROVE layer, not the portfolio source of truth. It may ingest verified Portfolio Events only when the event has provenance and an evidence level appropriate to the public claim.

Ingestion must never automatically upgrade evidence maturity. E0/E1 hypotheses remain hypotheses or demonstrations; E2 means working prototype; real-world and repeated validation require their own evidence. Public publication remains a separate decision from event receipt.

Recommended accepted families include `prime.review.completed`, `velyqua.experiment.completed`, `game.simulation.completed`, and `portal.experiment.completed`. Raw private memory, protected observations and credentials are prohibited from public evidence ingestion.

## Executable flow

`POST /api/portfolio-evidence` validates the canonical contract, rejects credential-bearing payloads, redacts private identifiers, and idempotently creates a Sanity `portfolioEvidenceCandidate`. E0/E1 records are quarantined. E2+ records require provenance and enter `pending_review`.

Reviewers use authenticated `GET` and `PATCH /api/portfolio-evidence`. Approval means only `approved_for_draft`. A separately authenticated `POST /api/portfolio-publication` can then create a Sanity draft. No endpoint publishes that draft; publication remains an explicit editorial action in Sanity Studio.
