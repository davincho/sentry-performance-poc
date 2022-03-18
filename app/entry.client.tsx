import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';

Sentry.init({
  debug: true,
  dsn: 'https://737659f894eb40b489331ac7cbbaa41c@o1161094.ingest.sentry.io/6246156',
  integrations: [new BrowserTracing({})],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
});

// export default Sentry.withProfiler(RemixBrowser);

// hydrate(<RemixBrowser />, document);
hydrate(<RemixBrowser />, document);
