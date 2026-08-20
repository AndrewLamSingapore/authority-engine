# Production domain and security remediation

This change aligns Authority Engine with the canonical production deployment at `https://authority-engine-app.vercel.app`.

## Changes
- Canonical, Open Graph and Twitter URLs point to the production domain.
- Social preview image URLs are absolute and use the production domain.
- Legacy Vercel hostnames redirect permanently to the production domain.
- Adds HSTS and Content-Security-Policy headers.
- Retains `X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`.
- Adds a restrictive `Permissions-Policy`.
- Removes obsolete `X-XSS-Protection`.

## Verification after deployment
- Confirm the production site and `/demo` and `/locked-demo` render without CSP console errors.
- Confirm response headers include HSTS and CSP.
- Confirm canonical/OG/Twitter metadata references `authority-engine-app.vercel.app`.
- Confirm legacy domains redirect to the production domain.
