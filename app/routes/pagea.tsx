import * as Sentry from '@sentry/react';
import { useSearchParams } from 'remix';

import Button from '~/components/Button';
import SlowUI from '~/components/SlowUI';

const SlowUIInstrumented = Sentry.withProfiler(SlowUI);

export default function PageA() {
  const [searchParams, setSearchParams] = useSearchParams();

  const part = searchParams.get('part') || 'fast';

  return (
    <div>
      <div className="flex justify-between">
        {part === 'fast' ? (
          <Button
            onClick={() => {
              setSearchParams({
                part: 'slow'
              });
            }}
          >
            Show slow 🐢
          </Button>
        ) : (
          <Button
            onClick={() => {
              setSearchParams({
                part: 'fast'
              });
            }}
          >
            Show fast 🐇
          </Button>
        )}

        <div className="animate-bounce rounded-xl bg-blue-100 h-10 w-10" />
      </div>
      {part === 'fast' ? (
        <div className="flex rounded-md items-center justify-center bg-slate-100 h-14 mt-4">
          <h1 className="text-xl">No dashboard</h1>
        </div>
      ) : (
        <SlowUIInstrumented />
      )}
    </div>
  );
}
