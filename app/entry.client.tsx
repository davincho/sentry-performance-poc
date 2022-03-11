import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
    dsn: "https://737659f894eb40b489331ac7cbbaa41c@o1161094.ingest.sentry.io/6246156",
    integrations: [new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history)
    })],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  

hydrate(<RemixBrowser />, document);
