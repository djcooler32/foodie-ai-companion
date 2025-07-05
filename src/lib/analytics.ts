import posthog from 'posthog-js';
import * as Sentry from '@sentry/react';

export function initAnalytics() {
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
  const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
  const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

  if (sentryDsn) {
    Sentry.init({ dsn: sentryDsn, tracesSampleRate: 1.0 });
  }

  if (posthogKey) {
    posthog.init(posthogKey, { api_host: posthogHost });
  }
}

