> Portfolio status: [STATUS.md](https://github.com/AndrewLamSingapore/orqevia/blob/main/STATUS.md) is the sole portfolio status reference. Each product owns its source, configuration, contracts and domain records. The [operational manifest](https://github.com/AndrewLamSingapore/orqevia/blob/main/governance/operational-manifest.json) provides dated ORQEVIA component and observation references; it does not establish deployment status.

# Contributing

This repository is a public evidence surface. Changes should make the work easier to inspect without upgrading claims beyond the evidence.

## Quality gate

```bash
npm ci
npm run lint
npm run build
```

## Public-claim standard

Keep these categories distinct:

- anonymised operational evidence;
- synthetic or AI-assisted demonstrations;
- implemented software;
- experiments and hypotheses;
- validated outcomes.

A polished interface is not evidence. Do not describe synthetic records as operating history or a prototype as validated production capability.

## Frontend changes

Preserve keyboard access, visible focus states, semantic headings, responsive layouts and reduced-motion support. Prefer direct imports and avoid unnecessary client work or dependencies.

## Pull requests

State what changed, why it improves the evidence surface, how it was verified and what remains uncertain.
