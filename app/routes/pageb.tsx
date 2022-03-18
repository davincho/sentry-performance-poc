import React from 'react';

import { Link, LoaderFunction, json, useLoaderData } from 'remix';

export default function PageB() {
  const fetcher = useFetcher();

  React.useEffect(() => {
    fetcher.load('/users');
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <input
          className="block flex-auto"
          type="text"
          defaultValue={currentId}
          readOnly
        />
        <button
          className="bg-blue-200 p-2 rounded-lg hover:bg-blue-300 block flex-auto ml-3"
          onClick={() => {
            const url = `/users/${currentId}`;

            const transaction = new IdleTransaction(
              {
                name: 'fetch-user',
                sampled: true
              },
              Sentry.getCurrentHub(),
              10000
            );

            transaction.initSpanRecorder();

            // const transaction = Sentry.getCurrentHub().startTransaction({
            //   name: "fetch-user",
            // });

            const span = transaction.startChild({ op: url });

            fetcher.load(url);

            span.finish(); // Remember that only finished spans will be sent with the transaction
          }}
        >
          Fetch user
        </button>
      </div>
      <Link to="/">Back</Link>
    </div>
  );
}
