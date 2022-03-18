import { useEffect, useState } from 'react';

import * as Sentry from '@sentry/react';

const SlowButton = () => {
  const [currentTraceId, setCurrentTraceId] = useState<string>('');

  useEffect(() => {
    const getTraceId = () => {
      const tid = Sentry.getCurrentHub().getScope()?.getTransaction()?.traceId;

      if (tid) {
        setCurrentTraceId(tid);
      }
    };

    const interval = setInterval(getTraceId, 1000);

    getTraceId();

    return () => {
      clearInterval(interval);
    };
  }, [setCurrentTraceId]);

  return (
    <a
      className="text-xs"
      target="_blank"
      href={`https://sentry.io/organizations/adverity-trial/performance/trace/${currentTraceId}/?`}
      rel="noreferrer"
    >
      👉🏼 Sentry Trace: {currentTraceId}
    </a>
  );
};

export default SlowButton;
