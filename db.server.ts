import { PrismaClient } from '@prisma/client';
import { getCurrentHub } from '@sentry/node';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const { faker } = require('@faker-js/faker');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

let db: PrismaClient;

let delay = 0;

declare global {
  let __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
  db.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  db = global.__db;
}

db.$use(async (params, next) => {
  const { model, action, runInTransaction, args } = params;
  const description = [model, action].filter(Boolean).join('.');
  const data = {
    model,
    action,
    runInTransaction,
    args
  };

  const scope = getCurrentHub().getScope();
  const parentSpan = scope?.getSpan();
  const span = parentSpan?.startChild({
    op: 'db',
    description,
    data
  });

  // optional but nice
  scope?.addBreadcrumb({
    category: 'db',
    message: description,
    data
  });

  await new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, delay);
  });

  const result = await next(params);
  span?.finish();

  return result;
});

const app = express();

Sentry.init({
  dsn: 'https://a1f7a55793034f9bac487c4317f23f9a@o1161094.ingest.sentry.io/6256625',

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

app.get('/show-error', () => {
  throw new Error('😭 My first Sentry error!');
});

app.get('/seed', async (_, res) => {
  const randomName = faker.name.findName();

  await db.user.create({
    data: {
      name: randomName
    }
  });

  res.json({ ok: true });
});

app.get('/users', async (req, res) => {
  delay = parseInt((req.query.delay as string) || '0', 10);

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true
    }
  });

  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  delay = parseInt((req.query.delay as string) || '0', 10);
  const id = req.params.id;

  const users = await db.user.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      createdAt: true
    }
  });
  res.json(users);
});

app.use(morgan('tiny'));

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
