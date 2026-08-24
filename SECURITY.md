# Security policy

## Supported source

The `main` branch is the supported public source for Authority Engine.

## Data and secrets

- Do not commit API tokens, deployment credentials, private datasets or unredacted operational records.
- `.env*` files are ignored by default; `.env.example` documents only configuration names and must never contain secrets.
- Public portfolio evidence must remain anonymised where described as anonymised.
- Synthetic demonstrations must remain clearly labelled as synthetic and must not be mixed with operational evidence in a way that changes their meaning.

## Browser-facing integrations

Authority Engine is a public frontend. Values compiled into `VITE_*` variables are browser-visible and must never be treated as secrets. The contact form uses a public Formspree form identifier; privileged credentials must not be added to client code.

## Reporting a vulnerability

Use GitHub's private security-advisory channel for this repository. Do not publish credentials, personal data, private operational evidence or exploitable details in a public issue.
