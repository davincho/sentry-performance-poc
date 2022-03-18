import * as serverBuild from '@remix-run/dev/server-build';
import { createRequestHandler } from '@remix-run/express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const app = express();

Sentry.init({
  dsn: 'https://411d55a608bf41db985c04dac2c27d39@o1161094.ingest.sentry.io/6254167',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ]
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(compression());
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization', 'sentry-trace']
  })
);

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('😭 My first Sentry error!');
});

// Remix fingerprints its assets so we can cache forever.
app.use(
  '/build',
  express.static('public/build', { immutable: true, maxAge: '1y' })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public/build', { maxAge: '1h' }));

app.use(morgan('tiny'));

app.all(
  '*',
  createRequestHandler({
    build: serverBuild,
    mode: process.env.NODE_ENV,
    getLoadContext: () => {
      return {
        'sentry-trace': Sentry.getCurrentHub()
          .getScope()
          .getSpan()
          .toTraceparent()
      };
    }
  })
);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
