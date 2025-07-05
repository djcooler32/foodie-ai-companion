# Security and Privacy

This project collects anonymous usage analytics and error reports to improve performance.
Voice input is processed locally in the browser and is not stored.
When configured, Sentry will capture runtime errors and PostHog will collect basic usage events.
The `VITE_APP_BASE_URL` environment variable can optionally be set to specify the deployment domain without exposing it in source control.

## Compliance

- Follows the principle of data minimization; no personal data is persisted.
- Users should provide consent before enabling analytics.
- Data collected is subject to GDPR/CCPA regulations.
- Environment variables are used to configure external services so credentials are not stored in the repository.
- A strict Content Security Policy and referrer policy are configured in
  `index.html` to mitigate common web vulnerabilities.


