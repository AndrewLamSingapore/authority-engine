# Portfolio evidence ingestion boundary

Authority Engine is the public PROVE layer, not the portfolio source of truth. It may ingest verified Portfolio Events only when the event has provenance and an evidence level appropriate to the public claim.

Ingestion must never automatically upgrade evidence maturity. E0/E1 hypotheses remain hypotheses or demonstrations; E2 means working prototype; real-world and repeated validation require their own evidence. Public publication remains a separate decision from event receipt.

Recommended accepted families include `prime.review.completed`, `velyqua.experiment.completed`, `game.simulation.completed`, and `portal.experiment.completed`. Raw private memory, protected observations and credentials are prohibited from public evidence ingestion.