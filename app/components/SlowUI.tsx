import { useEffect, Profiler, useState } from 'react';

import * as Sentry from '@sentry/react';
import { useFetcher } from 'remix';

function mySlowFunction(baseNumber: number) {
  let result = 0;
  for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }

  return result;
}

const SlowBit = () => {
  /* useEffect(() => {
    mySlowFunction(10);
  }, []);*/

  useState(() => mySlowFunction(10));

  return null;
};

const SlowUI = () => {
  const fetcher = useFetcher();

  /* const [span] = useState(() => {
    return Sentry.getCurrentHub().getScope()?.getTransaction()?.startChild({
      description: 'slowUI - profiler',
      op: 'mount'
    });
  });*/

  useEffect(() => {
    fetcher.load('/users');
  }, []);

  return (
    <Profiler
      id="slowUI"
      onRender={(id, phase, duration) => {
        if (phase === 'mount') {
          console.log(duration);
          // span?.finish();
        }
      }}
    >
      <div className="flex flex-wrap mt-3">
        <SlowBit />
        {new Array(100).fill(1).map((_, index) => (
          <div
            key={index}
            className="border mr-2 mb-2 border-gray-100 shadow rounded-md p-4 min-w-fit"
          >
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Profiler>
  );
};

export default SlowUI;
