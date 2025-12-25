# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in GroundUp, please report it by:

1. **DO NOT** create a public GitHub issue
2. Email the maintainers (contact info in GitHub profile)
3. Include detailed steps to reproduce the vulnerability
4. Allow reasonable time for a fix before public disclosure

## Scope

This is a static documentation site with no backend, authentication, or user data storage. Security concerns are limited to:

- XSS vulnerabilities in the PWA
- Malicious content injection
- Service worker security
- External dependency vulnerabilities

## Supported Versions

We maintain the latest version only. Updates are pushed to the `main` branch.

## Security Best Practices

When contributing:
- Sanitize any user input (search queries, etc.)
- Use Content Security Policy headers
- Avoid inline scripts
- Keep dependencies updated
- Review external CDN usage

## Responsible Disclosure

We commit to:
- Acknowledging receipt of vulnerability reports within 48 hours
- Providing a fix timeline within 7 days
- Crediting reporters (unless anonymity is requested)
- Coordinating public disclosure timing
