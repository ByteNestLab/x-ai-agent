# Security Policy

## Keep secrets out of Git

Never commit API keys, cookies, OAuth secrets, access tokens, or X session tokens. Use environment variables shown in `.env.example` and a secret manager in production.

## Reporting a vulnerability

Please do not disclose sensitive details in a public issue. Use GitHub's private vulnerability reporting for this repository, or contact the maintainers through the repository owner's private contact channel with a minimal reproduction and the affected version.

## Scope

This project does not bypass CAPTCHA, rate limits, anti-detection systems, credential controls, or unauthorized account access. Reports involving accidental secret leakage or unsafe defaults are especially important.
