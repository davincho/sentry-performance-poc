import React from 'react';

import * as Sentry from '@sentry/react';
import { useFetcher } from 'remix';

import Canvas from '~/components/Canvas';
import SentryExample from '~/components/SentryExample';

export default function PageB() {
  const fetcher = useFetcher();

  React.useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.type === 'done') {
      Sentry.getCurrentHub().getScope()?.getTransaction()?.finish();
    }
  }, [fetcher.state, fetcher.type]);

  const currentId = '70d64fdf-1fb1-432a-97cc-4c361d2e630e';

  return (
    <div>
      <SentryExample
        samples={[
          {
            label: 'Manual fetch',
            traceId: 'efc5232bb6be422b80b9eca7dbd42fe7'
          }
        ]}
      />
      <Canvas>
        <button
          className="bg-blue-200 p-2 rounded-lg hover:bg-blue-300 block flex-auto"
          onClick={() => {
            const url = `/users/${currentId}?delay=1000`;

            const transaction = Sentry.startTransaction({
              name: 'network-request'
            });

            Sentry.getCurrentHub().configureScope(scope =>
              scope.setSpan(transaction)
            );

            const span = transaction.startChild({
              data: { url },
              op: 'fetch-user'
            });

            fetcher.load(url);

            span.setStatus('ok');
            span.finish();
          }}
        >
          Fetch user
        </button>
      </Canvas>
    </div>
  );
}
