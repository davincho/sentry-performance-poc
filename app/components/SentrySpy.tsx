import { useEffect, useState } from 'react';

import * as Sentry from '@sentry/react';

import SentryLink from './SentryLink';

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
    <SentryLink traceId={currentTraceId}>
      Current Sentry Trace: {currentTraceId} 👉🏼
    </SentryLink>
  );
};

export default SlowButton;
