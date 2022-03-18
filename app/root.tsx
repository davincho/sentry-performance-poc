import React from 'react';

import {
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'remix';

import SentryLink from '~/components/SentryLink';
import StyledLink from '~/components/StyledLink';
import styles from '~/output.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader: LoaderFunction = async ({ context }) => {
  return {
    'sentry-trace': context['sentry-trace']
  };
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: 'New Remix App',
    'sentry-trace': data['sentry-trace']
  };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="container m-auto mt-11">
          <div className="text-right">
            <SentryLink />
          </div>
          <div className="my-4">
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/pagea">PageA</StyledLink>
            <StyledLink to="/pageb">PageB</StyledLink>
          </div>

          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  );
}
